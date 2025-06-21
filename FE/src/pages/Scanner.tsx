// Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr"; // Du kannst es mit npm installieren: npm install jsqr
//import "./scanner.css";

export default function Scanner() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const constraints = { video: { facingMode: "environment" } };
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();

      const scan = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setCode(code.data);
          }
        }
        animationId = requestAnimationFrame(scan);
      };

      scan();
    });

    return () => {
      cancelAnimationFrame(animationId);
      const tracks = video.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sende code an deinen Server, z.B. via fetch
    console.log("Gesendeter Code:", code);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} id="scanner">
        <h1>Ticket Scanning</h1>
        <div className="input-control">
          <label htmlFor="code">Ticket Code</label>
          <input
            id="code"
            name="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <input type="submit" value="submit" />
      </form>

      <div id="container">
        <video ref={videoRef} style={{ display: "none" }} />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
