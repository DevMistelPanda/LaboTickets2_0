// Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

type ScanResult = {
  status: "success" | "fail";
  html: string;
};

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [popupHtml, setPopupHtml] = useState<string | null>(null);
  const [popupColor, setPopupColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Start/stop camera and scan loop
  const stopScanner = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const startScanner = () => {
    stopScanner();
    setError("");
    setCode("");
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        video.srcObject = stream;
        video.setAttribute("playsinline", "true");
        video.play();
        const scan = () => {
          if (video.readyState === 4) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qr = jsQR(img.data, img.width, img.height);
            if (qr) {
              setCode(qr.data);
              stopScanner();
              return;
            }
          }
          frameRef.current = requestAnimationFrame(scan);
        };
        scan();
      })
      .catch(() => setError("Kamera nicht verfügbar"));
  };

  useEffect(() => {
    startScanner();
    return stopScanner;
    // eslint-disable-next-line
  }, []);

  // Submit code to backend /scanner endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPopupHtml(null);
    setPopupColor(null);

    const ticketCode = code.trim();
    if (!ticketCode) {
      setError("Bitte Ticket-Code eingeben oder scannen");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: ticketCode }),
      });

      // Always expect JSON
      const data = await res.json();
      setPopupHtml(data.html);
      setPopupColor(data.color || null);
      setLoading(false);
      stopScanner();
    } catch (err) {
      setError("Fehler beim Prüfen des Tickets.");
      setLoading(false);
    }
  };

  // Close popup and restart scanner
  const handleClosePopup = () => {
    setPopupHtml(null);
    setPopupColor(null);
    setCode("");
    setError("");
    startScanner();
  };

  return (
    <>
      {/* POPUP HTML from backend */}
      {popupHtml && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div
            className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center space-y-4 relative border-4 ${
              popupColor === "green"
                ? "border-green-500"
                : popupColor === "red"
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Schließen"
            >
              &times;
            </button>
            <div
              dangerouslySetInnerHTML={{ __html: popupHtml }}
              style={{ minWidth: 300 }}
            />
            <button
              onClick={handleClosePopup}
              className="w-full bg-party-purple text-white py-3 rounded-xl font-semibold hover:bg-purple-700 mt-4 transition"
            >
              Nächster
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
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
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-7 flex flex-col items-center"
          >
            <h2 className="text-3xl font-extrabold text-party-purple mb-2 text-center">
              Ticket Scannen
            </h2>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <input
              type="text"
              placeholder="Ticket-Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-party-purple focus:outline-none text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-party-purple text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Prüfe..." : "Prüfen"}
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/staff")}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Zurück
            </button>
            <div className="w-full flex flex-col items-center mt-2">
              <video ref={videoRef} className="hidden" />
              <canvas
                ref={canvasRef}
                className="w-full h-64 border border-gray-200 rounded-xl mt-2 bg-gray-100"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}