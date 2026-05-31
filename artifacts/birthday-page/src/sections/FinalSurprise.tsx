import { useRef, useState } from "react";
import { useRef as useRef2 } from "react";

const COLORS = ["#f472b6","#fbbf24","#34d399","#60a5fa","#a78bfa","#fb923c","#f87171","#e8709a","#d4af37"];

export default function FinalSurprise() {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);
  const [letter, setLetter] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  function openBox() {
    if (opened) return;
    setOpened(true);
    const particles = Array.from({ length: 80 }, (_, k) => ({
      id: idRef.current++,
      x: 15 + Math.random() * 70,
      color: COLORS[k % COLORS.length],
      delay: Math.random() * 0.8,
      size: 8 + Math.random() * 8,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 4000);
  }

  return (
    <section id="final" className="section bg-pink" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      {/* Confetti */}
      {confetti.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            top: "15%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}

      <div className="section-inner" style={{ textAlign: "center", width: "100%" }}>
        <div className="sec-badge">🎁 Final Surprise</div>
        <h2 className="sec-title" style={{ textAlign: "center" }}>For You, My Dear</h2>
        <p className="sec-sub" style={{ textAlign: "center" }}>
          {opened ? "A heart full of love, just for you ♥" : "Tap the heart to open your surprise"}
        </p>
        <div className="choc-divider" />

        {!opened ? (
          <div style={{ margin: "32px 0" }}>
            <div
              className="heart-box"
              onClick={openBox}
              style={{ fontSize: "clamp(5rem, 18vw, 9rem)", display: "inline-block" }}
            >
              🎁
            </div>
            <p style={{ marginTop: 16, color: "var(--choc-light)", fontFamily: "'Dancing Script',cursive", fontSize: "1.1rem" }}>
              tap to unwrap ♥
            </p>
          </div>
        ) : (
          <div className="lock-reveal" style={{ transformOrigin: "top", maxWidth: 620, margin: "0 auto" }}>
            {/* Fireworks emojis */}
            <div style={{ fontSize: "2rem", letterSpacing: "0.5rem", margin: "0 0 24px", animation: "heartPulse 1s ease-in-out" }}>
              🎆 🎇 ✨ 🎆 🎇
            </div>

            {/* Photo upload */}
            <div className="choc-card" style={{ marginBottom: 20, textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.05rem", color: "var(--choc-dark)", marginBottom: 14 }}>
                Our Photo Together
              </div>
              <div
                className="upload-zone"
                onClick={() => photoRef.current?.click()}
                style={{
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: 12,
                }}
              >
                {photo ? (
                  <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <span style={{ fontSize: "3rem", opacity: 0.4 }}>📸</span>
                    <span className="upload-zone-label">Add a special photo</span>
                  </>
                )}
              </div>
              <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = (ev) => setPhoto(ev.target?.result as string);
                r.readAsDataURL(f);
              }} />
            </div>

            {/* Final letter */}
            <div className="choc-card" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: "1.6rem" }}>💌</span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.15rem", color: "var(--choc-dark)" }}>
                  A Letter From the Heart
                </div>
              </div>
              <textarea
                className="edit-box"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
                style={{ minHeight: 180 }}
              />
            </div>

            {/* Final message */}
            <div style={{
              background: "linear-gradient(135deg, var(--choc-dark), var(--choc-mid))",
              color: "var(--gold-light)",
              borderRadius: 18,
              padding: "28px 24px",
              fontFamily: "'Dancing Script',cursive",
              fontSize: "1.4rem",
              border: "2px solid rgba(212,175,55,0.4)",
            }}>
              ♥ Happy Birthday, Beautiful ♥
              <div style={{ marginTop: 8, fontSize: "0.9rem", color: "var(--caramel-light)", fontFamily: "'Lato',sans-serif", fontWeight: 300 }}>
                June 23 · The most special day of the year
              </div>
            </div>

            <div style={{ marginTop: 24, fontSize: "2rem", letterSpacing: "0.8rem" }}>
              🌸 💝 🌸 💝 🌸
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
