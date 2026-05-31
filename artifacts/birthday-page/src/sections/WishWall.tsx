import { useRef, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  text: string;
  size: number;
}

export default function WishWall() {
  const [stars, setStars] = useState<Star[]>([]);
  const [draft, setDraft] = useState("");
  const idRef = useRef(0);

  function addWish() {
    if (!draft.trim()) return;
    setStars((prev) => [
      ...prev,
      {
        id: idRef.current++,
        x: 5 + Math.random() * 85,
        y: 5 + Math.random() * 85,
        text: draft.trim(),
        size: 0.8 + Math.random() * 0.6,
      },
    ]);
    setDraft("");
  }

  return (
    <section id="wishwall" className="section bg-dark">
      <div className="section-inner">
        <div className="sec-badge">🕯 Wish Wall</div>
        <h2 className="sec-title">Birthday Wish Wall</h2>
        <p className="sec-sub">Write a wish and place a glowing star in the night sky</p>
        <div className="choc-divider" />

        {/* Starry sky canvas */}
        <div style={{
          position: "relative",
          background: "radial-gradient(ellipse at center, #1a0a30 0%, #0A0418 100%)",
          borderRadius: 20,
          height: 300,
          marginBottom: 28,
          border: "1.5px solid rgba(212,175,55,0.2)",
          overflow: "hidden",
        }}>
          {/* Background fixed stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`bg-${i}`}
              className="wish-star"
              style={{
                left: `${Math.random() * 98}%`,
                top: `${Math.random() * 98}%`,
                color: "white",
                fontSize: `${0.3 + Math.random() * 0.4}rem`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            >·</div>
          ))}

          {/* User wish stars */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="wish-star"
              title={star.text}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                color: "var(--gold-light)",
                fontSize: `${star.size}rem`,
                cursor: "help",
                animationDelay: `${Math.random() * 2}s`,
                zIndex: 2,
              }}
            >
              ★
            </div>
          ))}

          {stars.length === 0 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Dancing Script',cursive", fontSize: "1.1rem" }}>
                Your wishes will light up the sky ✦
              </p>
            </div>
          )}

          {/* Moon */}
          <div style={{ position: "absolute", top: 16, right: 24, fontSize: "2.2rem", opacity: 0.8 }}>🌙</div>
        </div>

        {/* Wish input */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addWish()}
            style={{
              flex: 1,
              minWidth: 200,
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(212,175,55,0.3)",
              borderRadius: 12,
              padding: "12px 16px",
              color: "white",
              fontFamily: "'Lato',sans-serif",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
          <button className="gold-btn" onClick={addWish} style={{ flexShrink: 0 }}>
            ★ Place Star
          </button>
        </div>

        <p style={{ marginTop: 12, color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>
          {stars.length} wish{stars.length !== 1 ? "es" : ""} in the sky · hover a star to read its wish
        </p>
      </div>
    </section>
  );
}
