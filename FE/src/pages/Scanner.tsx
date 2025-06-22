// Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function Scanner() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Starte QR-Scanner und stoppe ihn beim Unmount
  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
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
            const result = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (result) {
              setCode(result.data);
              cancelAnimationFrame(animationId);
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
      const tracks = (video.srcObject as MediaStream)?.getTracks();
      tracks?.forEach((t) => t.stop());
    };
  }, []);

  // Hilfsfunktionen zur Validierung
  const hexToDecimal = (hex: string) => parseInt(hex, 16);
  const validateTicketCode = (c: string) => {
    if (c.length !== 13) return false;
    const first4 = c.slice(0, 4);
    const last5 = c.slice(-5);
    return hexToDecimal(first4) + hexToDecimal(last5) === 468529;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Bitte Ticket-Code eingeben oder scannen");
      return;
    }
    if (!validateTicketCode(code.trim())) {
      setError("Der Ticket-Code ist nicht valide");
      return;
    }

    // Alles valid: hier keine Backend-Logik mehr
    alert(`Ticket-Code gültig: ${code}`);
  };

  return (
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

          {/* Verstecktes Video, sichtbare Canvas */}
          <video ref={videoRef} className="hidden" />
          <canvas
            ref={canvasRef}
            className="w-full h-80 border border-gray-300 rounded-lg mt-4"
          />
        </form>
      </div>
    </div>
  );
}
