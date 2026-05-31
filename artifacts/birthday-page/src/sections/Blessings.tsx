import { useState } from "react";

const PETAL_COUNT = 5;

export default function Blessings() {
  const [texts, setTexts] = useState(Array(PETAL_COUNT).fill(""));

  return (
    <section id="blessings" className="section bg-pink">
      {/* Garden decorations */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, overflow: "hidden", pointerEvents: "none" }}>
        {["🌸", "🌺", "🌼", "🌷", "🌹", "🌸", "🌼", "🌺", "🌷", "🌸", "🌹", "🌼"].map((f, i) => (
          <span key={i} style={{ position: "absolute", bottom: 0, left: `${i * 9}%`, fontSize: "1.5rem" }}>{f}</span>
        ))}
      </div>

      <div className="section-inner">
        <div className="sec-badge">🌸 Dua & Blessings</div>
        <h2 className="sec-title">Blessings Garden</h2>
        <p className="sec-sub">A peaceful garden of prayers, blessings, and good wishes — write them on the petals</p>
        <div className="choc-divider" />

        {/* Lanterns row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
          {["🏮", "🪔", "🏮", "🪔", "🏮"].map((l, i) => (
            <div key={i} className="lantern" style={{ animationDelay: `${i * 0.4}s` }}>
              <div style={{ width: 2, height: 20, background: "var(--brown-border)", margin: "0 auto" }} />
              <span style={{ fontSize: "2rem" }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Petal cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {Array.from({ length: PETAL_COUNT }).map((_, i) => {
            const colors = [
              { bg: "#fff0f7", border: "#f2a0b8" },
              { bg: "#fff8f0", border: "#e8b084" },
              { bg: "#f0fff8", border: "#a0d4b8" },
              { bg: "#f8f0ff", border: "#c4a0e8" },
              { bg: "#fff0f0", border: "#e8a0a0" },
            ];
            const c = colors[i % colors.length];
            return (
              <div key={i} style={{
                width: "clamp(200px, 40%, 280px)",
                background: c.bg,
                border: `2px solid ${c.border}`,
                borderRadius: "60% 40% 60% 40% / 40% 60% 40% 60%",
                padding: "28px 24px",
                position: "relative",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              }}>
                <div style={{ textAlign: "center", fontSize: "1.6rem", marginBottom: 12 }}>
                  {["🌸", "🌺", "🌼", "🌷", "🌹"][i]}
                </div>
                <textarea
                  className="edit-box"
                  value={texts[i]}
                  onChange={(e) => setTexts((prev) => prev.map((t, idx) => idx === i ? e.target.value : t))}
                  style={{
                    minHeight: 100,
                    background: "rgba(255,255,255,0.7)",
                    border: `1.5px solid ${c.border}`,
                    borderRadius: 10,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Garden path */}
        <div style={{ textAlign: "center", marginTop: 36, fontSize: "1.4rem", letterSpacing: "0.8rem" }}>
          🌿🌸🌿🌺🌿🌼🌿
        </div>
      </div>
    </section>
  );
}
