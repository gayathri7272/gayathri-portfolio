import { useMemo } from "react";
import "./Sparkles.css";

/*
  Lightweight "lavender dust".
  - A small, fixed number of spans (no particle library, nothing created at runtime).
  - Pure CSS animation on opacity/transform only (GPU friendly).
  - Positions come from a seeded generator, so they are identical on every render.
  - Sits behind the page content, so it can never cover text or the character.
  - Disabled/static under prefers-reduced-motion (see Sparkles.css).
*/

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const KINDS = ["star", "star", "thin", "dot", "dot", "dot"];

export default function Sparkles({ count = 26, seed = 7 }) {
  const items = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => {
      const kind = KINDS[Math.floor(rand() * KINDS.length)];
      const size = kind === "dot" ? 3 + rand() * 3 : 9 + rand() * 11;
      return {
        id: i,
        kind,
        x: (4 + rand() * 92).toFixed(1),
        y: (3 + rand() * 94).toFixed(1),
        size: size.toFixed(1),
        delay: (rand() * 7).toFixed(2),
        dur: (3.4 + rand() * 4.6).toFixed(2),
        drift: rand() > 0.55,
      };
    });
  }, [count, seed]);

  return (
    <div className="sparkles" aria-hidden="true">
      {items.map((s) => (
        <span
          key={s.id}
          className={`sp sp--${s.kind}${s.drift ? " sp--drift" : ""}`}
          style={{
            "--x": `${s.x}%`,
            "--y": `${s.y}%`,
            "--s": `${s.size}px`,
            "--delay": `${s.delay}s`,
            "--dur": `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
