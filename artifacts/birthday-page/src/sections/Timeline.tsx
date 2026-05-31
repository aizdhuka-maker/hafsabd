import { useState } from "react";

interface Milestone {
  id: number;
  label: string;
  text: string;
}

export default function Timeline() {
  const [items, setItems] = useState<Milestone[]>([
    { id: 1, label: "", text: "" },
    { id: 2, label: "", text: "" },
    { id: 3, label: "", text: "" },
  ]);
  const [nextId, setNextId] = useState(4);

  function addItem() {
    setItems((prev) => [...prev, { id: nextId, label: "", text: "" }]);
    setNextId((n) => n + 1);
  }

  function update(id: number, field: "label" | "text", val: string) {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, [field]: val } : it));
  }

  function remove(id: number) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <section id="timeline" className="section bg-choc">
      <div className="section-inner">
        <div className="sec-badge">🍫 Our Journey</div>
        <h2 className="sec-title">Memory Timeline</h2>
        <p className="sec-sub">A winding river of moments — add your milestones and memories</p>
        <div className="choc-divider" />

        <div style={{ display: "flex", gap: 24 }}>
          {/* River */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0 }}>
            <div style={{ width: 4, height: 24, background: "linear-gradient(to bottom, transparent, var(--caramel))", borderRadius: 2 }} />
            {items.map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: i % 2 === 0 ? "var(--gold)" : "var(--blush)",
                  border: "3px solid rgba(255,255,255,0.4)",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "rgba(212,175,55,0.6)" : "rgba(242,160,184,0.6)"}`,
                  flexShrink: 0,
                }} />
                <div style={{ width: 4, flex: 1, minHeight: 80, background: "linear-gradient(to bottom, var(--caramel), var(--choc-light))", borderRadius: 2 }} />
              </div>
            ))}
            <div style={{ width: 4, height: 24, background: "linear-gradient(to bottom, var(--caramel), transparent)", borderRadius: 2 }} />
          </div>

          {/* Items */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            {items.map((item, i) => (
              <div key={item.id} className="choc-card" style={{ background: "rgba(255,248,240,0.97)", borderColor: "rgba(212,175,55,0.3)", marginTop: i === 0 ? 24 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <input
                    value={item.label}
                    onChange={(e) => update(item.id, "label", e.target.value)}
                    style={{
                      border: "none",
                      borderBottom: "1.5px dashed var(--brown-border)",
                      background: "transparent",
                      outline: "none",
                      fontFamily: "'Dancing Script',cursive",
                      fontSize: "1.1rem",
                      color: "var(--choc-dark)",
                      flex: 1,
                      marginRight: 12,
                    }}
                  />
                  <button
                    onClick={() => remove(item.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--caramel)", fontSize: "0.9rem", opacity: 0.6, flexShrink: 0 }}
                  >✕</button>
                </div>
                <textarea
                  className="edit-box"
                  value={item.text}
                  onChange={(e) => update(item.id, "text", e.target.value)}
                  style={{ minHeight: 75 }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button className="gold-btn" onClick={addItem}>
            + Add Milestone
          </button>
        </div>
      </div>
    </section>
  );
}
