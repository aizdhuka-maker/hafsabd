import { useEffect, useState } from "react";

function getCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 5, 23); // June 23 (month is 0-indexed)
  if (now >= target) {
    target = new Date(year + 1, 5, 23);
  }
  const diff = target.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit">
      <div className="countdown-number">{String(value).padStart(2, "0")}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

function FloatingHeart({ style }: { style: React.CSSProperties }) {
  return <div className="floating-heart" style={style}>♥</div>;
}

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [boxes, setBoxes] = useState({ box1: "", box2: "", box3: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hearts = [
    { top: "8%", left: "5%", animationDelay: "0s", fontSize: "1.2rem", opacity: 0.4 },
    { top: "15%", right: "8%", animationDelay: "1.5s", fontSize: "0.9rem", opacity: 0.35 },
    { top: "40%", left: "2%", animationDelay: "3s", fontSize: "1.5rem", opacity: 0.3 },
    { top: "60%", right: "4%", animationDelay: "0.8s", fontSize: "1rem", opacity: 0.4 },
    { top: "80%", left: "7%", animationDelay: "2.2s", fontSize: "0.8rem", opacity: 0.35 },
    { top: "75%", right: "10%", animationDelay: "4s", fontSize: "1.3rem", opacity: 0.3 },
    { top: "25%", left: "15%", animationDelay: "1s", fontSize: "0.7rem", opacity: 0.25 },
    { top: "50%", right: "15%", animationDelay: "2.8s", fontSize: "1.1rem", opacity: 0.3 },
  ];

  return (
    <div className="page">
      {hearts.map((h, i) => (
        <FloatingHeart key={i} style={h as React.CSSProperties} />
      ))}

      <div className="container">
        <div className="top-decoration">✦ ♥ ✦</div>

        <h1 className="title">Happy Birthday</h1>
        <p className="subtitle">Counting down to the most special day</p>

        <div className="date-badge">June 23 ♥</div>

        <div className="countdown-wrapper">
          <CountdownUnit value={countdown.days} label="Days" />
          <div className="countdown-sep">:</div>
          <CountdownUnit value={countdown.hours} label="Hours" />
          <div className="countdown-sep">:</div>
          <CountdownUnit value={countdown.minutes} label="Minutes" />
          <div className="countdown-sep">:</div>
          <CountdownUnit value={countdown.seconds} label="Seconds" />
        </div>

        <div className="divider">✦ ✦ ✦</div>

        <div className="boxes-section">
          <div className="box-group">
            <label className="box-label">A message for you</label>
            <textarea
              className="message-box"
              value={boxes.box1}
              onChange={(e) => setBoxes({ ...boxes, box1: e.target.value })}
            />
          </div>

          <div className="box-group">
            <label className="box-label">My wishes for you</label>
            <textarea
              className="message-box"
              value={boxes.box2}
              onChange={(e) => setBoxes({ ...boxes, box2: e.target.value })}
            />
          </div>

          <div className="box-group">
            <label className="box-label">What I love about you</label>
            <textarea
              className="message-box"
              value={boxes.box3}
              onChange={(e) => setBoxes({ ...boxes, box3: e.target.value })}
            />
          </div>
        </div>

        <div className="footer">made with ♥</div>
      </div>
    </div>
  );
}
