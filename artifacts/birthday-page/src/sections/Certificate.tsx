import { useState } from "react";

export default function Certificate() {
  const [fields, setFields] = useState({
    name: "",
    bestie: "",
    since: "",
    reason: "",
    signature: "",
  });

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
  }

  return (
    <section id="certificate" className="section bg-cream">
      <div className="section-inner" style={{ textAlign: "center" }}>
        <div className="sec-badge">🎀 Friendship Certificate</div>
        <h2 className="sec-title">Official Certificate</h2>
        <p className="sec-sub">A formal declaration of the world's most beautiful friendship</p>
        <div className="choc-divider" />

        <div className="certificate" style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Corner decorations */}
          {[
            { top: 10, left: 10 },
            { top: 10, right: 10 },
            { bottom: 10, left: 10 },
            { bottom: 10, right: 10 },
          ].map((pos, i) => (
            <div key={i} className="certificate-corner" style={pos}>
              {["🌸", "✦", "🌺", "✦"][i]}
            </div>
          ))}

          {/* Chocolate border swirl */}
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.4rem", color: "var(--gold)", marginBottom: 12, opacity: 0.7 }}>
            ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
          </div>

          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.85rem", letterSpacing: "0.25em", color: "var(--caramel)", textTransform: "uppercase", marginBottom: 8 }}>
            Certificate of
          </div>
          <div style={{ fontFamily: "'Dancing Script',cursive", fontSize: "clamp(2rem,6vw,3rem)", color: "var(--choc-dark)", fontWeight: 700, marginBottom: 24 }}>
            Eternal Friendship
          </div>

          <div style={{ fontFamily: "'Lato',sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "var(--choc-mid)", marginBottom: 20 }}>
            This certificate hereby declares that
          </div>

          <input
            className="cert-field"
            value={fields.name}
            onChange={set("name")}
            style={{ fontSize: "1.8rem" }}
          />

          <div style={{ fontFamily: "'Lato',sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "var(--choc-mid)", margin: "16px 0 8px" }}>
            is the most wonderful best friend of
          </div>

          <input
            className="cert-field"
            value={fields.bestie}
            onChange={set("bestie")}
            style={{ fontSize: "1.4rem" }}
          />

          <div style={{ fontFamily: "'Lato',sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "var(--choc-mid)", margin: "16px 0 8px" }}>
            since
          </div>

          <input
            className="cert-field"
            value={fields.since}
            onChange={set("since")}
            style={{ fontSize: "1.1rem", width: 160 }}
          />

          <div style={{ margin: "24px 0 10px", fontFamily: "'Lato',sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "var(--choc-mid)" }}>
            because she is:
          </div>
          <textarea
            className="edit-box"
            value={fields.reason}
            onChange={set("reason")}
            style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", minHeight: 70, border: "1.5px dashed var(--brown-border)" }}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 28, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <input
                className="cert-field"
                value={fields.signature}
                onChange={set("signature")}
                style={{ fontSize: "1.2rem", fontStyle: "italic", width: 180 }}
              />
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--caramel)", textTransform: "uppercase", marginTop: 6 }}>
                Signature
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Dancing Script',cursive", fontSize: "1.8rem", color: "var(--rose)" }}>
                June 23
              </div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", color: "var(--caramel)", textTransform: "uppercase", marginTop: 6 }}>
                Birthday
              </div>
            </div>
          </div>

          <div style={{ fontSize: "0.75rem", letterSpacing: "0.4rem", color: "var(--gold)", marginTop: 20, opacity: 0.7 }}>
            ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
          </div>

          {/* Seal */}
          <div style={{ marginTop: 4, fontSize: "2.5rem" }}>🎀</div>
        </div>
      </div>
    </section>
  );
}
