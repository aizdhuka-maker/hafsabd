import { useEffect, useRef, useState } from "react";

function getCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 5, 23);
  if (now >= target) target = new Date(year + 1, 5, 23);
  const diff = target.getTime() - now.getTime();
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const CANDLE_COUNT = 7;
const COLORS = ["#f472b6","#fbbf24","#34d399","#60a5fa","#a78bfa","#fb923c","#f87171"];

export default function Hero() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [blown, setBlown] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false));
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);
  const [allBlown, setAllBlown] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  function blowCandle(i: number) {
    const next = blown.map((v, idx) => (idx === i ? true : v));
    setBlown(next);
    if (next.every(Boolean)) {
      setAllBlown(true);
      launchConfetti();
    }
  }

  function launchConfetti() {
    const particles = Array.from({ length: 60 }, (_, k) => ({
      id: idRef.current++,
      x: 20 + Math.random() * 60,
      color: COLORS[k % COLORS.length],
      delay: Math.random() * 0.8,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 3500);
  }

  function resetCandles() {
    setBlown(Array(CANDLE_COUNT).fill(false));
    setAllBlown(false);
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="home" className="section bg-pink" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      {/* Confetti */}
      {confetti.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            top: "20%",
            width: 10,
            height: 10,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="section-inner" style={{ textAlign: "center", width: "100%" }}>
        {/* Sparkles */}
        <div style={{ fontSize: "1.1rem", color: "var(--gold)", letterSpacing: "0.6rem", marginBottom: 12, opacity: 0.7 }}>
          ✦ ✦ ✦ ✦ ✦
        </div>

        <div className="sec-badge">✨ June 23 ✨</div>
        <h1 className="sec-title" style={{ textAlign: "center", fontSize: "clamp(2.6rem, 8vw, 4.5rem)", color: "var(--choc-dark)" }}>
          Happy Birthday
        </h1>
        <p className="sec-sub" style={{ textAlign: "center" }}>
          {allBlown ? "🎉 Make a wish! 🎉" : "Click the candles to blow them out!"}
        </p>

        {/* Cake */}
        <div style={{ position: "relative", display: "inline-block", margin: "24px 0" }}>
          {/* Candles row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 0, position: "relative", zIndex: 2 }}>
            {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onClick={() => blowCandle(i)}>
                {/* Flame */}
                <div style={{
                  width: 14, height: blown[i] ? 0 : 22,
                  background: "linear-gradient(to bottom, #fff7aa, #fbbf24, #f97316)",
                  borderRadius: "50% 50% 30% 30%",
                  boxShadow: blown[i] ? "none" : "0 0 8px 4px rgba(251,191,36,0.5)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  marginBottom: -2,
                }} className={blown[i] ? "" : "candle-flame"} />
                {/* Wick */}
                <div style={{ width: 2, height: 6, background: "#333", marginBottom: -1 }} />
                {/* Candle stick */}
                <div style={{
                  width: 10, height: 36,
                  background: `linear-gradient(to bottom, ${COLORS[i]}, ${COLORS[i]}cc)`,
                  borderRadius: "3px 3px 0 0",
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)",
                }} />
              </div>
            ))}
          </div>

          {/* Cake body */}
          <div style={{
            background: "linear-gradient(to bottom, #e8709a, #c0396b)",
            width: "clamp(200px, 60vw, 360px)",
            height: 60,
            borderRadius: "8px 8px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Swirls */}
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "1rem", letterSpacing: "1rem" }}>🌸 🌸 🌸</div>
          </div>
          <div style={{
            background: "linear-gradient(to bottom, #f2a0b8, #e8709a)",
            width: "clamp(200px, 60vw, 360px)",
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", letterSpacing: "0.8rem" }}>♥ ♥ ♥ ♥</div>
          </div>
          <div style={{
            background: "linear-gradient(to bottom, #c0396b, #8B1A40)",
            width: "clamp(200px, 60vw, 360px)",
            height: 80,
            borderRadius: "0 0 12px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem", letterSpacing: "1.2rem" }}>✦ ✦ ✦</div>
          </div>

          {/* Plate */}
          <div style={{
            background: "linear-gradient(135deg, var(--cream-dark), var(--caramel-light))",
            height: 14,
            width: "110%",
            marginLeft: "-5%",
            borderRadius: "0 0 50% 50%",
            boxShadow: "0 4px 12px rgba(61,26,10,0.2)",
          }} />
        </div>

        {allBlown && (
          <button className="gold-btn" onClick={resetCandles} style={{ margin: "8px auto 0", display: "block" }}>
            🕯 Relight Candles
          </button>
        )}

        {/* Countdown */}
        <div style={{
          display: "inline-flex",
          gap: 8,
          background: "white",
          borderRadius: 18,
          padding: "24px 36px",
          boxShadow: "0 8px 40px rgba(61,26,10,0.12)",
          margin: "32px auto 0",
          border: "1.5px solid var(--brown-border)",
        }}>
          {[["Days", pad(countdown.days)], ["Hours", pad(countdown.hours)], ["Mins", pad(countdown.minutes)], ["Secs", pad(countdown.seconds)]].map(([label, val], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 600, color: "var(--rose)", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--choc-light)", marginTop: 6 }}>{label}</div>
              </div>
              {i < 3 && <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", color: "var(--pink)", opacity: 0.5, paddingBottom: 18 }}>:</div>}
            </div>
          ))}
        </div>

        <p style={{ marginTop: 24, color: "var(--choc-light)", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
          ✦ scroll down to explore ✦
        </p>
      </div>
    </section>
  );
}
