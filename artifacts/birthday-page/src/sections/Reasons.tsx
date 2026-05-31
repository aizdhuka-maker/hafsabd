import { useState } from "react";

const TRUFFLE_COUNT = 9;

export default function Reasons() {
  const [opened, setOpened] = useState<boolean[]>(Array(TRUFFLE_COUNT).fill(false));
  const [texts, setTexts] = useState(Array(TRUFFLE_COUNT).fill(""));

  return (
    <section id="reasons" className="section bg-gold">
      <div className="section-inner">
        <div className="sec-badge">🍫 You Are Special</div>
        <h2 className="sec-title">Reasons You're Amazing</h2>
        <p className="sec-sub">Each chocolate truffle holds a reason — tap to unwrap and write</p>
        <div className="choc-divider" />

        <div style={{
          background: "linear-gradient(135deg, var(--choc-dark), var(--choc-mid))",
          border: "3px solid rgba(212,175,55,0.5)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 12px 48px rgba(61,26,10,0.3)",
        }}>
          <div style={{ textAlign: "center", fontFamily: "'Dancing Script',cursive", fontSize: "1.2rem", color: "var(--gold-light)", marginBottom: 24 }}>
            ✦ A Box of Sweet Reasons ✦
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
            {Array.from({ length: TRUFFLE_COUNT }).map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div
                  className={`truffle ${opened[i] ? "opened" : ""}`}
                  onClick={() => setOpened((prev) => prev.map((v, idx) => idx === i ? !v : v))}
                  title="Click to unwrap"
                >
                  {opened[i] ? "✍️" : ["🍫", "💝", "🌸", "✨", "💫", "🎀", "🌹", "💌", "⭐"][i]}
                </div>

                {opened[i] && (
                  <div style={{ width: 150 }} className="lock-reveal">
                    <textarea
                      className="edit-box"
                      value={texts[i]}
                      onChange={(e) => setTexts((prev) => prev.map((t, idx) => idx === i ? e.target.value : t))}
                      style={{
                        minHeight: 80,
                        fontSize: "0.85rem",
                        background: "rgba(255,252,245,0.95)",
                        border: "1.5px solid rgba(212,175,55,0.4)",
                      }}
                      autoFocus
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 20, color: "var(--caramel-light)", fontSize: "0.8rem" }}>
            🎀 {opened.filter(Boolean).length} of {TRUFFLE_COUNT} unwrapped 🎀
          </div>
        </div>
      </div>
    </section>
  );
}
