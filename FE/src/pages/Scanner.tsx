// Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function Scanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const frameRef = useRef(null);

  const [klasse, setKlasse] = useState("");
  const [loadingClass, setLoadingClass] = useState(true);
  const [classError, setClassError] = useState("");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // popup.type: "confirm" | "accept" | "reject"
  const [popup, setPopup] = useState({
    visible: false,
    type: "",
    color: "",
    name: "",
    nameShort: "",
    klasse: "",
    code: "",
    message: "",
  });

  // Helper: "Vorname Nachname" → "Vo Na"
  const makeShortName = (fullName) =>
    fullName
      .trim()
      .split(" ")
      .map((w) => w.slice(0, 2))
      .join(" ");

  // 1) Klasse vom Backend laden
  useEffect(() => {
    fetch("/api/user/klasse")
      .then((res) => res.json())
      .then((data) => setKlasse(data.klasse))
      .catch(() => setClassError("Fehler beim Laden der Klasse"))
      .finally(() => setLoadingClass(false));
  }, []);

  // 2) Scanner starten / neu starten
  const startScanner = () => {
    // Cleanup alter Instanzen
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }

    setError("");
    setCode("");

    const constraints = { video: { facingMode: "environment" } };
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        streamRef.current = stream;
        video.srcObject = stream;
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
              cancelAnimationFrame(frameRef.current);
              streamRef.current.getTracks().forEach((t) => t.stop());
              return;
            }
          }
          frameRef.current = requestAnimationFrame(scan);
        };

        scan();
      })
      .catch(() => setError("Kamera nicht verfügbar"));
  };

  // Scanner beim Mount starten
  useEffect(() => {
    startScanner();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // 3) Validierung
  const hexToDecimal = (hex) => parseInt(hex, 16);
  const validateTicketCode = (c) => {
    if (c.length !== 13) return false;
    const first4 = c.slice(0, 4);
    const last5 = c.slice(-5);
    return hexToDecimal(first4) + hexToDecimal(last5) === 468529;
  };

  // 4a) Beim Klicken auf "Prüfen": vorläufig validieren und Confirm-Popup öffnen
  const handleCheck = (e) => {
    e.preventDefault();
    setError("");
    setPopup({ visible: false, type: "", message: "" });

    if (!code.trim()) {
      setError("Bitte Ticket-Code eingeben oder scannen");
      return;
    }
    if (!validateTicketCode(code.trim())) {
      return setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: "Nicht gültig / schon auf dem Ball",
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(code);
    } catch {
      return setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: "Ungültiger QR-Inhalt",
      });
    }

    if (!parsed.name || !parsed.klasse || !parsed.code) {
      return setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: "Ungültiger QR-Inhalt",
      });
    }

    // Confirm-Popup anzeigen
    setPopup({
      visible: true,
      type: "confirm",
      color: "gray",
      name: parsed.name,
      nameShort: makeShortName(parsed.name),
      klasse: parsed.klasse,
      code: parsed.code,
      message: "",
    });
  };

  // 4b) Nach Bestätigung: tatsächlicher API-Call
  const handleConfirm = async () => {
    const { name, klasse, code } = popup;

    try {
      const res = await fetch("/api/visitors/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, klasse, code }),
      });

      // 503 ignorieren und Scanner neu starten
      if (res.status === 503) {
        setPopup({ visible: false, type: "" });
        startScanner();
        return;
      }

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setPopup({
          visible: true,
          type: "reject",
          color: "blue",
          message: payload.message || "Fehler beim Eintragen",
        });
        return;
      }

      // Erfolg
      const num = parseInt(klasse, 10);
      const color = num >= 9 ? "green" : "red";
      setPopup({
        visible: true,
        type: "accept",
        color,
        nameShort: makeShortName(name),
        klasse,
        code,
        message: "",
      });
    } catch {
      setPopup({
        visible: true,
        type: "reject",
        color: "blue",
        message: "Netzwerkfehler – bitte erneut versuchen",
      });
    }
  };

  // Popup schließen & Scanner neu starten
  const closePopup = () => {
    setPopup({ visible: false, type: "" });
    startScanner();
  };

  // 5) Loading & Error States für Klassendaten
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
    );
  }

  return (
    <>
      {/* FULLSCREEN POPUP */}
      {popup.visible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div
            className={`bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center space-y-4
              ${
                popup.type === "accept"
                  ? popup.color === "green"
                    ? "border-2 border-green-600"
                    : "border-2 border-red-600"
                  : popup.type === "reject"
                  ? "border-2 border-blue-600"
                  : "border-2 border-gray-600"
              }`}
          >
            {popup.type === "confirm" && (
              <>
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Bitte bestätigen
                </h3>
                <p className="text-gray-800">
                  Name: <span className="font-semibold">{popup.nameShort}</span>
                </p>
                <p className="text-gray-800">
                  Klasse: <span className="font-semibold">{popup.klasse}</span>
                </p>
                <p className="text-gray-800">
                  Code: <span className="font-mono">{popup.code}</span>
                </p>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Bestätigen
                  </button>
                  <button
                    onClick={closePopup}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Abbrechen
                  </button>
                </div>
              </>
            )}

            {popup.type === "accept" && (
              <>
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    popup.color === "green"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  Einlass erlaubt
                </h3>
                <p className="text-gray-800">
                  Klasse: <span className="font-semibold">{popup.klasse}</span>
                </p>
                <p className="text-gray-800">
                  Code: <span className="font-mono">{popup.code}</span>
                </p>
                <p className="text-gray-800">
                  Name: <span className="font-semibold">{popup.nameShort}</span>
                </p>
                <button
                  onClick={closePopup}
                  className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition mt-4"
                >
                  Nächster
                </button>
              </>
            )}

            {popup.type === "reject" && (
              <>
                <h3 className="text-xl font-bold text-blue-700">
                  {popup.message}
                </h3>
                <button
                  onClick={closePopup}
                  className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition mt-4"
                >
                  Nächster
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/170085684/de/foto/hers-und-seine-masken-auf-schwarzem-hintergrund.jpg')",
            filter: "brightness(0.6)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <form
            id="scanner"
            onSubmit={handleCheck}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Ticket Scanning
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <input
              id="code"
              name="code"
              type="text"
              placeholder="Ticket-Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Prüfen
            </button>

            <button
              type="button"
              onClick={() => (window.location.href = "/staff")}
              className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Zurück
            </button>

            <video ref={videoRef} className="hidden" />
            <canvas
              ref={canvasRef}
              className="w-full h-80 border border-gray-300 rounded-lg mt-4"
            />
          </form>
        </div>
      </div>
    </>
  );
}
