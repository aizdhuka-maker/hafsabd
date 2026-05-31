import { useEffect, useRef, useState } from "react";

function getCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 5, 23);
  if (now >= target) target = new Date(year + 1, 5, 23);
  const diff = target.getTime() - now.getTime();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit">
      <div className="countdown-number">{String(value).padStart(2, "0")}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

interface BoxState {
  text: string;
  images: string[];
}

function MessageBox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: BoxState;
  onChange: (val: BoxState) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        onChange({ ...value, images: [...value.images, src] });
      };
      reader.readAsDataURL(file);
    });
  }

  function removeImage(idx: number) {
    const imgs = value.images.filter((_, i) => i !== idx);
    onChange({ ...value, images: imgs });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="box-group">
      <label className="box-label">{label}</label>

      <textarea
        className="message-box"
        value={value.text}
        onChange={(e) => onChange({ ...value, text: e.target.value })}
      />

      {value.images.length > 0 && (
        <div className="image-grid">
          {value.images.map((src, i) => (
            <div key={i} className="image-thumb-wrap">
              <img src={src} className="image-thumb" alt="" />
              <button className="image-remove" onClick={() => removeImage(i)}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div
        className="upload-area"
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <span className="upload-icon">🖼</span>
        <span className="upload-text">Click or drag to add photos</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}

const HEARTS = [
  { top: "6%", left: "4%", animationDelay: "0s", fontSize: "1.2rem", opacity: 0.35 },
  { top: "12%", right: "6%", animationDelay: "1.5s", fontSize: "0.9rem", opacity: 0.3 },
  { top: "38%", left: "2%", animationDelay: "3s", fontSize: "1.4rem", opacity: 0.28 },
  { top: "58%", right: "3%", animationDelay: "0.8s", fontSize: "1rem", opacity: 0.35 },
  { top: "78%", left: "6%", animationDelay: "2.2s", fontSize: "0.8rem", opacity: 0.3 },
  { top: "72%", right: "9%", animationDelay: "4s", fontSize: "1.3rem", opacity: 0.28 },
  { top: "22%", left: "14%", animationDelay: "1s", fontSize: "0.65rem", opacity: 0.22 },
  { top: "48%", right: "14%", animationDelay: "2.8s", fontSize: "1.1rem", opacity: 0.28 },
];

const EMPTY_BOX: BoxState = { text: "", images: [] };

export default function App() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [boxes, setBoxes] = useState<BoxState[]>([
    { ...EMPTY_BOX },
    { ...EMPTY_BOX },
    { ...EMPTY_BOX },
  ]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  function updateBox(i: number, val: BoxState) {
    setBoxes((prev) => prev.map((b, idx) => (idx === i ? val : b)));
  }

  const LABELS = ["A message for you", "My wishes for you", "What I love about you"];

  return (
    <div className="page">
      {HEARTS.map((h, i) => (
        <div key={i} className="floating-heart" style={h as React.CSSProperties}>♥</div>
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
          {LABELS.map((label, i) => (
            <MessageBox
              key={i}
              label={label}
              value={boxes[i]}
              onChange={(val) => updateBox(i, val)}
            />
          ))}
        </div>

        <div className="footer">made with ♥</div>
      </div>
    </div>
  );
}
