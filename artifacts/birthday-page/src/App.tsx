import Hero from "./sections/Hero";
import Wishes from "./sections/Wishes";
import Gallery from "./sections/Gallery";
import Dreams from "./sections/Dreams";
import Locks from "./sections/Locks";
import Music from "./sections/Music";
import Reasons from "./sections/Reasons";
import WishWall from "./sections/WishWall";
import Blessings from "./sections/Blessings";
import Certificate from "./sections/Certificate";
import Timeline from "./sections/Timeline";
import FinalSurprise from "./sections/FinalSurprise";

const NAV = [
  { href: "#home",        label: "🎂 Home" },
  { href: "#wishes",      label: "💌 Wishes" },
  { href: "#gallery",     label: "📸 Gallery" },
  { href: "#dreams",      label: "🌟 Dreams" },
  { href: "#locks",       label: "🔐 Secrets" },
  { href: "#music",       label: "🎵 Music" },
  { href: "#reasons",     label: "🍫 Reasons" },
  { href: "#wishwall",    label: "⭐ Wish Wall" },
  { href: "#timeline",    label: "🎀 Timeline" },
  { href: "#blessings",   label: "🌸 Blessings" },
  { href: "#certificate", label: "📜 Certificate" },
  { href: "#final",       label: "🎁 Surprise" },
];

const PETALS = [
  { icon: "🌸", left: "8%",  dur: "6s",  delay: "0s"   },
  { icon: "🌺", left: "22%", dur: "8s",  delay: "1.5s" },
  { icon: "🌼", left: "38%", dur: "7s",  delay: "3s"   },
  { icon: "🌹", left: "55%", dur: "9s",  delay: "0.8s" },
  { icon: "🌸", left: "70%", dur: "6.5s",delay: "2.2s" },
  { icon: "🌺", left: "85%", dur: "8.5s",delay: "4s"   },
];

export default function App() {
  return (
    <div style={{ position: "relative" }}>
      {/* Floating petals (fixed layer) */}
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay }}
        >
          {p.icon}
        </div>
      ))}

      {/* Sticky nav */}
      <nav className="site-nav">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
        ))}
      </nav>

      {/* Sections */}
      <Hero />
      <Wishes />
      <Gallery />
      <Dreams />
      <Locks />
      <Music />
      <Reasons />
      <WishWall />
      <Timeline />
      <Blessings />
      <Certificate />
      <FinalSurprise />

      {/* Footer */}
      <div style={{
        background: "var(--choc-dark)",
        color: "var(--caramel-light)",
        textAlign: "center",
        padding: "28px 16px",
        fontFamily: "'Dancing Script', cursive",
        fontSize: "1.1rem",
        borderTop: "2px solid rgba(212,175,55,0.3)",
      }}>
        made with ♥ just for you · June 23
      </div>
    </div>
  );
}
