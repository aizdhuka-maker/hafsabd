import { useRef, useState } from "react";

const ROTS = ["-3deg", "2deg", "-1deg", "3deg", "-2deg", "1.5deg"];
const FRAME_COUNT = 6;

export default function Gallery() {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(FRAME_COUNT).fill(null));
  const [captions, setCaptions] = useState(Array(FRAME_COUNT).fill(""));
  const [active, setActive] = useState<number | null>(null);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function handleFile(i: number, files: FileList | null) {
    if (!files || !files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setPhotos((prev) => prev.map((p, idx) => idx === i ? src : p));
    };
    reader.readAsDataURL(files[0]);
  }

  return (
    <section id="gallery" className="section bg-cream">
      <div className="section-inner">
        <div className="sec-badge">📸 Photo Memories</div>
        <h2 className="sec-title">Our Memories</h2>
        <p className="sec-sub">A polaroid wall of beautiful moments — click each frame to add a photo</p>
        <div className="choc-divider" />

        {/* Fairy light string */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, overflowX: "auto", paddingBottom: 4 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} style={{ fontSize: i % 3 === 0 ? "1rem" : "0.6rem", color: i % 2 === 0 ? "var(--gold)" : "var(--caramel)", opacity: 0.8, flexShrink: 0 }}>
              {i % 3 === 0 ? "💡" : "·"}
            </span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 28 }}>
          {Array.from({ length: FRAME_COUNT }).map((_, i) => (
            <div
              key={i}
              className="polaroid"
              style={{ "--rot": ROTS[i] } as React.CSSProperties}
              onClick={() => refs.current[i]?.click()}
            >
              <div className="polaroid-photo">
                {photos[i] ? (
                  <img src={photos[i]!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <span style={{ fontSize: "2rem", opacity: 0.5 }}>📷</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--choc-light)", fontWeight: 300 }}>Tap to add photo</span>
                  </>
                )}
              </div>
              <input
                ref={(el) => { refs.current[i] = el; }}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFile(i, e.target.files)}
                onClick={(e) => e.stopPropagation()}
              />
              <input
                className="polaroid-caption"
                value={captions[i]}
                onChange={(e) => setCaptions((prev) => prev.map((c, idx) => idx === i ? e.target.value : c))}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>

        {/* Light string bottom */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32, overflowX: "auto", paddingBottom: 4 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} style={{ fontSize: i % 3 === 0 ? "1rem" : "0.6rem", color: i % 4 === 0 ? "var(--blush)" : "var(--gold)", opacity: 0.8, flexShrink: 0 }}>
              {i % 3 === 0 ? "💡" : "·"}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
