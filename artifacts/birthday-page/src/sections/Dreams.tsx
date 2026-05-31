import { useState } from "react";

const DREAM_CARDS = [
  { icon: "🌟", label: "Dreams" },
  { icon: "🎯", label: "Goals" },
  { icon: "🌈", label: "Hopes" },
  { icon: "💫", label: "Wishes" },
];

export default function Dreams() {
  const [texts, setTexts] = useState(Array(DREAM_CARDS.length).fill(""));

  return (
    <section id="dreams" className="section bg-dark">
      {/* Stars background */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="wish-star"
          style={{
            left: `${Math.random() * 95}%`,
            top: `${Math.random() * 95}%`,
            animationDelay: `${Math.random() * 3}s`,
            fontSize: `${0.6 + Math.random() * 0.8}rem`,
            color: i % 3 === 0 ? "var(--gold-light)" : i % 3 === 1 ? "var(--blush)" : "white",
          }}
        >
          {["✦", "★", "✧", "✩"][i % 4]}
        </div>
      ))}

      <div className="section-inner">
        <div className="sec-badge">🌠 Future Dreams</div>
        <h2 className="sec-title">Dreams & Future</h2>
        <p className="sec-sub" style={{ color: "var(--cream-dark)" }}>
          A dreamy path of stars — write your dreams, goals, and hopes for the journey ahead
        </p>
        <div className="choc-divider" />

        {/* Glowing path */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {["🌸", "✦", "🌟", "✦", "🌺", "✦", "💫", "✦", "🌸"].map((s, i) => (
            <span key={i} style={{ fontSize: i % 2 === 0 ? "1.3rem" : "0.8rem", opacity: i % 2 === 0 ? 0.9 : 0.4, color: "var(--gold-light)" }}>{s}</span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {DREAM_CARDS.map((card, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(212,175,55,0.25)",
              borderRadius: 16,
              padding: 24,
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: "1.8rem" }}>{card.icon}</span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "var(--gold-light)", fontStyle: "italic" }}>
                  {card.label}
                </div>
              </div>

              <textarea
                className="edit-box"
                value={texts[i]}
                onChange={(e) => setTexts((prev) => prev.map((t, idx) => idx === i ? e.target.value : t))}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(212,175,55,0.2)",
                  color: "var(--cream)",
                  minHeight: 110,
                }}
              />
            </div>
          ))}
        </div>

        {/* Horizon glow */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "radial-gradient(ellipse, rgba(212,175,55,0.3) 0%, transparent 70%)", padding: "20px 60px", borderRadius: "50%", fontSize: "1.5rem" }}>
            🌅
          </div>
        </div>
      </div>
    </section>
  );
}
