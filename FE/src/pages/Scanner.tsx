// Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function Scanner() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [klasse, setKlasse] = useState("");
  const [loadingClass, setLoadingClass] = useState(true);
  const [classError, setClassError] = useState("");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [popup, setPopup] = useState({
    visible: false,
    type: "",    // "accept" | "reject"
    color: "",   // "green" | "red" | "blue"
    nameShort: "",
    klasse: "",
    code: "",
    message: "",
  });

  // Kurz-Name aus "Vorname Nachname" => "Vo Na"
  const makeShortName = (fullName) =>
    fullName
      .trim()
      .split(" ")
      .map((w) => w.slice(0, 2))
      .join(" ");

  // 1) Klasse vom Backend holen
  useEffect(() => {
    fetch("/api/user/klasse")
      .then((res) => res.json())
      .then((data) => {
        setKlasse(data.klasse);
      })
      .catch((err) => {
        setClassError("Fehler beim Laden der Klasse");
      })
      .finally(() => {
        setLoadingClass(false);
      });
  }, []);

  // 2) QR-Scanner starten
  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId, stream;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((s) => {
        stream = s;
        video.srcObject = s;
        video.setAttribute("playsinline", "true");
        video.play();

        const scan = () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const qr = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (qr) {
              setCode(qr.data);
              cancelAnimationFrame(animationId);
              stream.getTracks().forEach((t) => t.stop());
              return;
            }
          }
          animationId = requestAnimationFrame(scan);
        };

        scan();
      })
      .catch(() => {
        setError("Kamera nicht verfügbar");
      });

    return () => {
      cancelAnimationFrame(animationId);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 3) Ticket-Code validieren
  const hexToDecimal = (hex) => parseInt(hex, 16);
  const validateTicketCode = (c) => {
    if (c.length !== 13) return false;
    const first4 = c.slice(0, 4);
    const last5 = c.slice(-5);
    return hexToDecimal(first4) + hexToDecimal(last5) === 468529;
  };

  // 4) Submit & Popup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPopup({
      visible: false,
      type: "",
      color: "",
      nameShort: "",
      klasse: "",
      code: "",
      message: "",
    });

    if (!code.trim()) {
      setError("Bitte Ticket-Code eingeben oder scannen");
      return;
    }
    if (!validateTicketCode(code.trim())) {
      setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: "Nicht gültig / schon auf dem Ball",
      });
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(code);
    } catch {
      parsed = null;
    }
    if (!parsed || !parsed.name || !parsed.klasse || !parsed.code) {
      setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: "Ungültiger QR-Inhalt",
      });
      return;
    }

    // --- 503-Errorhandling entfernt: nur eine einfache fetch-Logik ---
    const response = await fetch("/api/visitors/enter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.name,
        klasse: parsed.klasse,
        code: parsed.code,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: data.message || "Fehler beim Eintragen",
      });
      return;
    }

    // Erfolgreicher Eintrag
    const num = parseInt(parsed.klasse, 10);
    const color = num >= 9 ? "green" : "red";
    setPopup({
      visible: true,
      type: "accept",
      color,
      nameShort: makeShortName(parsed.name),
      klasse: parsed.klasse,
      code: parsed.code,
      message: "",
    });
  };

  const closePopup = () => {
    setPopup({
      visible: false,
      type: "",
      color: "",
      nameShort: "",
      klasse: "",
      code: "",
      message: "",
    });
    window.location.reload();
  };

  // 5) Klassendaten laden / Fehleranzeige
  if (loadingClass) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Lade Klassendaten…</p>
      </div>
    );
  }
  if (classError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{classError}</p>
      </div>
