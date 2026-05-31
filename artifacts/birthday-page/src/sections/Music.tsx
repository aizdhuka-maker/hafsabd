import { useRef, useState } from "react";

export default function Music() {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ id: number; x: number; y: number; icon: string }[]>([]);
  const qrRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  function handleQr(files: FileList | null) {
    if (!files || !files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => setQrImage(e.target?.result as string);
    reader.readAsDataURL(files[0]);
  }

  function addNote() {
    const icons = ["♩", "♪", "♫", "♬", "🎵", "🎶"];
    const note = {
      id: idRef.current++,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      icon: icons[Math.floor(Math.random() * icons.length)],
    };
    setNotes((prev) => [...prev.slice(-14), note]);
  }

  return (
    <section id="music" className="section bg-cream">
      <div className="section-inner">
        <div className="sec-badge">🎵 Music Corner</div>
        <h2 className="sec-title">Her Playlist</h2>
        <p className="sec-sub">Upload a QR code linking to her favourite songs or playlist</p>
        <div className="choc-divider" />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", alignItems: "flex-start" }}>
          {/* Jukebox */}
          <div className="jukebox" style={{ width: "clamp(260px, 45%, 360px)", position: "relative" }}>
            {/* Floating music notes */}
            {notes.map((n) => (
              <div
                key={n.id}
                className="music-note"
                style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${Math.random() * 2}s`, color: "var(--gold-light)" }}
              >
                {n.icon}
              </div>
            ))}

            {/* Speaker grille top */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              {[1,2,3].map((k) => (
                <div key={k} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(212,175,55,0.6)" }} />
              ))}
            </div>

            <div style={{ textAlign: "center", fontFamily: "'Dancing Script',cursive", fontSize: "1.5rem", color: "var(--gold-light)", marginBottom: 16 }}>
              🎶 Music Box 🎶
            </div>

            {/* Screen */}
            <div style={{
              background: "rgba(0,0,0,0.4)",
              border: "2px solid rgba(212,175,55,0.4)",
              borderRadius: 12,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              overflow: "hidden",
            }}>
              <div style={{ color: "var(--gold-light)", fontFamily: "'Dancing Script',cursive", fontSize: "1.1rem", animation: "marquee 8s linear infinite", whiteSpace: "nowrap" }}>
                ♪ ♪ ♪ &nbsp;&nbsp;&nbsp; now playing her favourites &nbsp;&nbsp;&nbsp; ♪ ♪ ♪
              </div>
            </div>

            {/* Buttons row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
              {["⏮", "⏸", "⏭"].map((b, k) => (
                <div key={k} style={{
                  width: 40, height: 40,
                  borderRadius: "50%",
                  background: "rgba(212,175,55,0.2)",
                  border: "1.5px solid rgba(212,175,55,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}>
                  {b}
                </div>
              ))}
            </div>

            <button className="gold-btn" onClick={addNote} style={{ margin: "16px auto 0", display: "block", fontSize: "0.75rem" }}>
              🎵 Add Note
            </button>
          </div>

          {/* QR code upload */}
          <div style={{ width: "clamp(220px, 40%, 300px)" }}>
            <div style={{
              background: "white",
              border: "2px solid var(--brown-border)",
              borderRadius: 18,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(61,26,10,0.08)",
            }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", color: "var(--choc-dark)", marginBottom: 16 }}>
                Scan for Playlist
              </div>

              <div
                className="upload-zone"
                onClick={() => qrRef.current?.click()}
                style={{ width: 180, height: 180, margin: "0 auto 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }}
              >
                {qrImage ? (
                  <img src={qrImage} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <>
                    <div style={{ fontSize: "3rem", marginBottom: 8, opacity: 0.4 }}>▦</div>
                    <span className="upload-zone-label">Upload QR code</span>
                  </>
                )}
              </div>
              <input ref={qrRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleQr(e.target.files)} />

              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
                {["🎵", "🎶", "🎵"].map((n, k) => <span key={k} style={{ fontSize: "1.1rem" }}>{n}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(100%); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
