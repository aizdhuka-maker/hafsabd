import { useState } from "react";

const LOCKS = [
  { icon: "🔒", color: "#6B2D0E", label: "Secret #1" },
  { icon: "🔐", color: "#4A1A08", label: "Secret #2" },
  { icon: "🔒", color: "#8B1A40", label: "Secret #3" },
  { icon: "🔐", color: "#3D1A0A", label: "Secret #4" },
  { icon: "🔒", color: "#5C2D0D", label: "Secret #5" },
];

export default function Locks() {
  const [opened, setOpened] = useState<boolean[]>(Array(LOCKS.length).fill(false));
  const [texts, setTexts] = useState(Array(LOCKS.length).fill(""));

  function toggle(i: number) {
    setOpened((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <section id="locks" className="section bg-choc2">
      <div className="section-inner">
        <div className="sec-badge">🔐 Secret Messages</div>
        <h2 className="sec-title">Secret Locks</h2>
        <p className="sec-sub">Click each lock to unlock a hidden message just for you</p>
        <div className="choc-divider" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {LOCKS.map((lock, i) => (
            <div key={i} className="choc-card lock-card" style={{ background: "rgba(255,248,240,0.97)", borderColor: "rgba(212,175,55,0.3)" }}>
              <div
                onClick={() => toggle(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  userSelect: "none",
                  padding: "4px 0",
                }}
              >
                <div style={{
                  fontSize: "2.2rem",
                  background: `radial-gradient(circle at 35% 35%, ${lock.color}cc, ${lock.color})`,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(212,175,55,0.4)",
                  transition: "transform 0.3s",
                  transform: opened[i] ? "rotate(20deg)" : "none",
                  flexShrink: 0,
                }}>
                  {opened[i] ? "🔓" : lock.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.05rem", color: "var(--choc-dark)" }}>
                    {lock.label}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--caramel)", letterSpacing: "0.08em" }}>
                    {opened[i] ? "✦ unlocked ✦" : "tap to unlock"}
                  </div>
                </div>
              </div>

              {opened[i] && (
                <div className="lock-reveal" style={{ marginTop: 16, transformOrigin: "top" }}>
                  <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg, transparent, var(--caramel), transparent)", marginBottom: 14, opacity: 0.5 }} />
                  <textarea
                    className="edit-box"
                    value={texts[i]}
                    onChange={(e) => setTexts((prev) => prev.map((t, idx) => idx === i ? e.target.value : t))}
                    style={{ minHeight: 100, border: "1.5px dashed rgba(107,45,14,0.2)" }}
                    autoFocus
                  />
                  <div style={{ textAlign: "right", marginTop: 6, fontSize: "1rem" }}>🌸 💌 ✨</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
