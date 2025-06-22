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

  // Helper: aus "Vorname Nachname" => "Vo Na"
  const makeShortName = (fullName) =>
    fullName
      .trim()
      .split(" ")
      .map((w) => w.slice(0, 2))
      .join(" ");

  // 1) Klasse vom Backend holen
  useEffect(() => {
    fetch("/api/user/klasse")
      .then((res) => {
        if (!res.ok) throw new Error("503");
        return res.json();
      })
      .then((data) => {
        setKlasse(data.klasse);
      })
      .catch(() => {
        setClassError("Service momentan nicht verfügbar (503)");
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
  const handleSubmit = (e) => {
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
        nameShort: "",
        klasse: "",
        code: "",
        message: "",
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
        nameShort: "",
        klasse: "",
        code: "",
      });
      return;
    }

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
    // neu scan starten
    window.location.reload();
  };

  // 5) Klassendaten Laden/Error
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
                  : "border-2 border-blue-600"
              }
            `}
          >
            {popup.type === "accept" ? (
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
              </>
            ) : (
              <h3 className="text-xl font-bold text-blue-700">
                {popup.message}
              </h3>
            )}
            <button
              onClick={closePopup}
              className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Nächster
            </button>
          </div>
        </div>
      )}

      {/* PAGE LAYOUT */}
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/170085684/de/foto/hers-und-seine-masken-auf-schwarzem-hintergrund.jpg?s=612x612&w=0&k=20&c=qgktvJ3waDrNskuj2bwIamOQEpN0H0kDXQnQ5_-vJYs=')",
            filter: "brightness(0.6)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <form
            id="scanner"
            onSubmit={handleSubmit}
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
