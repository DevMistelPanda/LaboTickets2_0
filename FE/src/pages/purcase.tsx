// PurchaseForm.jsx
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import "./purchase.css";

export default function PurchaseForm() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [name, setName] = useState("");
  const [klasse, setKlasse] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {
    if (!scannerVisible) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
            if (qrCode) {
              setCode(qrCode.data);
              stopScanner();
            }
          }
          requestAnimationFrame(tick);
        };

        tick();
      });

    return () => stopScanner();
  }, [scannerVisible]);

  const stopScanner = () => {
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    setScannerVisible(false);
  };

  const hexToDecimal = (hex) => parseInt(hex, 16);

  const validateTicketCode = (code) => {
    const first4 = code.substring(0, 4);
    const last5 = code.substring(code.length - 5);
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
    } else if (!/^(5[abcd]|6[abcd]|7[abcd]|8[abcd]|9[abcd]|10[abcd]|11[abcd]|12|13)$/i.test(klasse)) {
      newErrors.klasse = "Diese Klasse existiert nicht :P";
    }

    if (!code.trim()) {
      newErrors.code = "Bitte Ticket-Code eingeben";
    } else if (code.length !== 13 || !validateTicketCode(code)) {
      newErrors.code = "Der Ticket-Code ist nicht valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulardaten:", { name, klasse, code });
      // Hier könntest du z. B. fetch('/purchase', {...}) machen
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} id="ausgabe">
        <h1>Ticket Ausgabe</h1>

        <div className="input-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="error">{errors.name}</div>
        </div>

        <div className="input-control">
          <input
            id="klasse"
            name="klasse"
            type="text"
            placeholder="Klasse"
            value={klasse}
            onChange={(e) => setKlasse(e.target.value)}
          />
          <div className="error">{errors.klasse}</div>
        </div>

        <div className="input-control">
          <input
            id="code"
            name="code"
            type="text"
            placeholder="Scannen oder eingeben"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="error">{errors.code}</div>
        </div>

        <div id="container">
          <input
            type="button"
            id="btn-scan-qr"
            value="QR Code Scanner"
            onClick={() => setScannerVisible(true)}
          />
          {scannerVisible && (
            <>
              <video ref={videoRef} style={{ display: "none" }} />
              <canvas ref={canvasRef} style={{height:"350px", width:"350px" }} />
            </>
          )}
        </div>

        <input type="submit" value="submit" />
        <input type="button" value="Zurück" onClick={() => (window.location = "./staff")} />
      </form>
    </div>
  );
}
