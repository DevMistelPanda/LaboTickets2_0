// PurchaseForm.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function PurchaseForm() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [name, setName] = useState("");
  const [klasse, setKlasse] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [scannerVisible, setScannerVisible] = useState(false);

  // confirmation overlay state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedName, setConfirmedName] = useState("");
  const [confirmedKlasse, setConfirmedKlasse] = useState("");
  const [confirmedCode, setConfirmedCode] = useState("");

  useEffect(() => {
    if (!scannerVisible) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();

        const tick = () => {
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
            const qr = jsQR(imageData.data, imageData.width, imageData.height);
            if (qr) {
              setCode(qr.data);
              stopScanner();
            }
          }
          animationId = requestAnimationFrame(tick);
        };
        tick();
      })
      .catch(() => {
        stopScanner();
      });

    return () => stopScanner();
  }, [scannerVisible]);

  const stopScanner = () => {
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach((t) => t.stop());
    setScannerVisible(false);
  };

  const hexToDecimal = (hex) => parseInt(hex, 16);
  const validateTicketCode = (c) => {
    if (c.length !== 13) return false;
    const first4 = c.slice(0, 4);
    const last5 = c.slice(-5);
    return hexToDecimal(first4) + hexToDecimal(last5) === 468529;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Bitte Namen eingeben";
    } else if (name.trim().split(" ").length < 2) {
      newErrors.name = "Bitte Vor- und Nachnamen eingeben";
    }

    if (!klasse.trim()) {
      newErrors.klasse = "Bitte Klasse eingeben";
    } else if (
      !/^(5[abcd]|6[abcd]|7[abcd]|8[abcd]|9[abcd]|10[abcd]|11[abcd]|12|13)$/i.test(
        klasse
      )
    ) {
      newErrors.klasse = "Diese Klasse existiert nicht :P";
    }

    if (!code.trim()) {
      newErrors.code = "Bitte Ticket-Code eingeben";
    } else if (!validateTicketCode(code.trim())) {
      newErrors.code = "Der Ticket-Code ist nicht valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // kurze Form des Namens: jeweils erste 2 Buchstaben
    const shortName = name
      .trim()
      .split(" ")
      .map((part) => part.slice(0, 2))
      .join(" ");

    // Backend-Request: Besucher in DB eintragen
    try {
      const response = await fetch("/api/visitors/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          klasse: klasse.trim(),
          code: code.trim()
        })
      });
      if (!response.ok) {
        const data = await response.json();
        setErrors({ code: data?.message || "Fehler beim Eintragen" });
        return;
      }
    } catch (err) {
      setErrors({ code: "Serverfehler beim Eintragen" });
      return;
    }

    setConfirmedName(shortName);
    setConfirmedKlasse(klasse.trim());
    setConfirmedCode(code.trim());
    setShowConfirmation(true);
  };

  return (
    <>
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full space-y-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              Verkauf erfolgreich!
            </h3>
            <p className="text-gray-800">
              Ticket verkauft an{" "}
              <span className="font-semibold">{confirmedName}</span>, Klasse{" "}
              <span className="font-semibold">{confirmedKlasse}</span>, Code{" "}
              <span className="font-mono">{confirmedCode}</span>
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-4 bg-party-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full h-screen">
        {/* Hintergrundbild */}
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
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-6"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Ticket Ausgabe
            </h2>

            {(errors.name || errors.klasse || errors.code) && (
              <div className="text-red-500 text-sm text-center">
                {errors.name || errors.klasse || errors.code}
              </div>
            )}

            <input
              type="text"
              placeholder="Vor- und Nachname"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Klasse"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={klasse}
              onChange={(e) => setKlasse(e.target.value)}
            />

            <input
              type="text"
              placeholder="Ticket-Code scannen oder eingeben"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setScannerVisible(true)}
              className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              QR Code Scanner
            </button>

            {scannerVisible && (
              <>
                <video ref={videoRef} className="hidden" />
                <canvas
                  ref={canvasRef}
                  className="w-full h-80 border border-gray-300 rounded-lg mt-4"
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Ausgeben
            </button>

            <button
              type="button"
              onClick={() => (window.location.href = "/staff")}
              className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Zurück
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
