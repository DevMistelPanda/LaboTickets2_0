import { useEffect } from "react";

export default function TicketScanner() {
  useEffect(() => {
    // QR-Code Lib laden, wenn nötig
    const script = document.createElement("script");
    script.src = "./qr/qr2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier eigene POST-Logik einfügen
    const code = e.target.code.value;
    console.log("Ticket-Code:", code);
    // z.B. fetch('/scanner', { method: 'POST', body: ... })
  };

  return (
    <div className="container">
      <form id="scanner" onSubmit={handleSubmit}>
        <h1>Ticket Scanning</h1>
        <div className="input-control">
          <label htmlFor="code">Ticket Code</label>
          <input id="code" name="code" type="text" />
        </div>
        <input type="submit" value="submit" />
        <input
          type="button"
          value="Zurück"
          onClick={() => (window.location.href = "./staff")}
        />
      </form>

      <div id="container">
        <canvas hidden id="qr-canvas"></canvas>
      </div>
    </div>
  );
}
