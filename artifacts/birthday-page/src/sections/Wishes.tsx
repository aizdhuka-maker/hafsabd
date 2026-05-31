import { useState } from "react";

const CARDS = [
  { icon: "🌸", title: "Birthday Wish" },
  { icon: "💌", title: "A Letter" },
  { icon: "🍫", title: "Sweet Memory" },
  { icon: "✨", title: "From the Heart" },
];

export default function Wishes() {
  const [texts, setTexts] = useState(Array(CARDS.length).fill(""));

  return (
    <section id="wishes" className="section bg-choc">
      {/* Floating petals */}
      {["🌸", "🌺", "🌼", "🌹"].map((p, i) => (
        <div key={i} className="petal" style={{
          left: `${10 + i * 22}%`,
          animationDuration: `${5 + i * 1.5}s`,
          animationDelay: `${i * 1.2}s`,
          top: "-40px",
        }}>{p}</div>
      ))}

      <div className="section-inner">
        <div className="sec-badge">🍫 Birthday Wishes</div>
        <h2 className="sec-title">Write Your Wishes</h2>
        <p className="sec-sub">A scrapbook of heartfelt words — fill each card with your love</p>
        <div className="choc-divider" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {CARDS.map((card, i) => (
            <div key={i} className="choc-card" style={{ borderColor: "rgba(212,175,55,0.3)", background: "rgba(255,248,240,0.97)" }}>
              {/* Corner decorations */}
              <div style={{ position: "absolute", top: 12, right: 14, fontSize: "1.2rem", opacity: 0.5 }}>🌸</div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: "1.6rem" }}>{card.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.25rem", color: "var(--choc-dark)", fontWeight: 700 }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--caramel)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    — for you
                  </div>
                </div>
              </div>

              <textarea
                className="edit-box"
                value={texts[i]}
                onChange={(e) => setTexts((prev) => prev.map((t, idx) => idx === i ? e.target.value : t))}
                style={{ minHeight: 130, border: "1.5px dashed rgba(107,45,14,0.2)", background: "rgba(255,252,248,0.8)" }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: "0.8rem", color: "var(--caramel)", fontFamily: "'Dancing Script',cursive" }}>with love ♥</span>
                <div style={{ display: "flex", gap: 4 }}>{"🌸🌺🌼".split("").map((c, k) => <span key={k} style={{ fontSize: "0.9rem" }}>{c}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
