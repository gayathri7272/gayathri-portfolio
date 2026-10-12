// InteractiveHero.jsx
// React + plain CSS. The frame/animation engine below is unchanged from the original;
// only the markup and styling around it were redesigned.
import { useEffect, useRef } from "react";
import "./InteractiveHero.css";

/* ------------------------------------------------------------------
   EDIT THIS BLOCK TO MATCH YOUR FRAMES (frames are transparent RGBA WebP)
   Frame indices are 0-based, in the order they were exported from the video.
------------------------------------------------------------------- */
export const HERO = {
  frameCount: 120,
  framePath: (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
  fps: 12, // playback speed of the sequences

  // Normal working state. start === end gives a still frame.
  // If end > start, that range ping-pongs slowly as a subtle idle loop.
  idle: { start: 0, end: 0 },
  idleFps: 6,

  // Looking left: plays start -> peak, holds, plays back peak -> start.
  left: { start: 15, peak: 25 },
  // Looking right: same idea.
  right: { start: 35, peak: 40 },
  // Greeting: notices visitor -> excited -> headset off -> around neck -> wave -> points down.
  greet: { start: 60, end: 119 },

  holdMs: [2000, 3000], // left/right hold, random within this range
  greetHoldMs: 4500, // how long she keeps pointing down before returning to work
  zones: [0.3, 0.7], // left < 30%, center 30-70%, right > 70% of hero width

  // Bubble text during greeting, keyed by progress through the greet range (0 to 1).
  greetMessages: [
    { at: 0, text: "Hey, it's you!" },
    { at: 0.35, text: "Hiiii!" },
    { at: 0.78, text: "Check out the portfolio" },
  ],
};

const ease = (t) => t * t * (3 - 2 * t);

export default function InteractiveHero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const msgRef = useRef(null);

  useEffect(() => {
    const C = HERO;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const msg = msgRef.current;
    const ctx = canvas.getContext("2d");
    const last = C.frameCount - 1;
    const imgs = new Array(C.frameCount);
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");

    // All animation state lives here, so React never re-renders during interaction.
    const s = {
      pos: C.idle.start, // float frame position currently shown
      mode: "idle", // idle | left | right | greet
      steps: [],
      t: 0,
      ghost: 0, // previous pose, faded out after a jump
      ghostMix: 1,
      dirty: true,
      zone: null,
      pending: null,
      msgIdx: -1,
      w: 0,
      h: 0,
      lastTime: performance.now(),
    };

    /* ---------- frame loading (idle first, then the rest, 6 at a time) ---------- */
    const order = [];
    const seen = new Set();
    const add = (a, b) => {
      for (let i = a; i <= b; i++) if (!seen.has(i) && i <= last) (seen.add(i), order.push(i));
    };
    add(C.idle.start, C.idle.end);
    add(C.greet.start, C.greet.end);
    add(C.left.start, C.left.peak);
    add(C.right.start, C.right.peak);
    add(0, last);
    let disposed = false;
    const worker = () => {
      const i = order.shift();
      if (i == null || disposed) return;
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        imgs[i] = im;
        s.dirty = true;
        worker();
      };
      im.onerror = worker;
      im.src = C.framePath(i);
    };
    for (let k = 0; k < 6; k++) worker();

    /* ---------- canvas drawing ---------- */
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      s.w = r.width;
      s.h = r.height;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.dirty = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const placeholder = (i) => {
      // Only shows when frames are missing, so the interaction can be tested without assets.
      const bw = Math.min(s.w * 0.7, s.h * 1.2);
      const bh = bw * 0.62;
      const x = (s.w - bw) / 2;
      const y = (s.h - bh) / 2;
      ctx.fillStyle = "rgba(185,154,245,0.10)";
      ctx.strokeStyle = "rgba(200,167,255,0.45)";
      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, 24);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(232,220,255,0.85)";
      ctx.font = "14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`No frame at ${C.framePath(i)}`, s.w / 2, s.h / 2 - 8);
      ctx.fillText(`frame ${i} · mode: ${s.mode}`, s.w / 2, s.h / 2 + 14);
    };

    const paint = (i, alpha) => {
      let j = i;
      while (j >= 0 && !imgs[j]) j--; // fall back to the nearest loaded earlier frame
      ctx.globalAlpha = alpha;
      if (j < 0) return placeholder(i);
      const im = imgs[j];
      const sc = Math.min(s.w / im.naturalWidth, s.h / im.naturalHeight); // "contain": never crops head or laptop
      const dw = im.naturalWidth * sc;
      const dh = im.naturalHeight * sc;
      ctx.drawImage(im, (s.w - dw) / 2, (s.h - dh) / 2, dw, dh);
    };

    // Cross-fades neighbouring frames by the fractional part of the position for smooth motion.
    const drawPose = (pose, alpha) => {
      const p = Math.max(0, Math.min(last, pose));
      const i = Math.floor(p);
      const f = p - i;
      paint(i, alpha);
      if (f > 0.02 && i < last) paint(i + 1, alpha * f);
    };

    const render = () => {
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, s.w, s.h);
      drawPose(s.pos, 1);
      if (s.ghostMix < 1) drawPose(s.ghost, 1 - ease(s.ghostMix));
      ctx.globalAlpha = 1;
      s.dirty = false;
    };

    /* ---------- message bubble (direct DOM, no state) ---------- */
    const setMsg = (text, side) => {
      if (!text) {
        msg.dataset.show = "0";
        return;
      }
      msg.textContent = text;
      msg.dataset.side = side;
      msg.dataset.show = "1";
      msg.classList.remove("pop");
      void msg.offsetWidth;
      msg.classList.add("pop");
    };

    /* ---------- sequencer ---------- */
    const idlePos = (t) => {
      const { start, end } = C.idle;
      const len = end - start;
      if (len <= 0) return start;
      const c = (t * C.idleFps) % (2 * len);
      return start + (c < len ? c : 2 * len - c);
    };

    const jump = (p) => {
      // Big change of pose: cross-fade from where she was to where she is going.
      s.ghost = s.pos;
      s.ghostMix = 0;
      s.pos = p;
      s.dirty = true;
    };

    const begin = (st) => {
      s.t = 0;
      if (st && st.k === "play" && Math.abs(st.from - s.pos) > 1.5) jump(st.from);
    };

    const start = (mode) => {
      s.mode = mode;
      s.t = 0;
      s.msgIdx = -1;
      if (mode === "greet") {
        const g = C.greet;
        s.steps = [
          { k: "play", from: g.start, to: g.end },
          { k: "hold", ms: C.greetHoldMs },
        ];
        s.msgIdx = 0;
        setMsg(C.greetMessages[0].text, "center");
      } else {
        const r = C[mode];
        const hold = C.holdMs[0] + Math.random() * (C.holdMs[1] - C.holdMs[0]);
        s.steps = [
          { k: "play", from: r.start, to: r.peak },
          { k: "hold", ms: hold },
          { k: "play", from: r.peak, to: r.start },
        ];
        setMsg(mode === "left" ? "Anyone here on the left?" : "Anyone here on the right?", mode);
      }
      begin(s.steps[0]);
    };

    const zoneMode = (z) => (z === "left" ? "left" : z === "right" ? "right" : z === "center" ? "greet" : null);

    const finish = () => {
      setMsg(null);
      s.steps = [];
      const pend = s.pending;
      s.pending = null;
      // If the cursor moved to a different zone during the greeting, react to it now.
      if (pend && zoneMode(s.zone) === pend) return start(pend);
      s.mode = "idle";
      s.t = 0;
      jump(idlePos(0));
    };

    const next = () => {
      s.steps.shift();
      s.t = 0;
      const n = s.steps[0];
      if (!n) return finish();
      begin(n);
      // left/right: hide the message as she starts returning to work
      if (s.mode !== "greet" && s.steps.length === 1) setMsg(null);
    };

    const trigger = (mode) => {
      if (mode === s.mode) return;
      if (s.mode === "greet") {
        s.pending = mode; // never interrupt the greeting
        return;
      }
      start(mode);
    };

    /* ---------- main rAF loop ---------- */
    let raf = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - s.lastTime) / 1000);
      s.lastTime = now;

      if (s.ghostMix < 1) {
        s.ghostMix = Math.min(1, s.ghostMix + dt / 0.32);
        s.dirty = true;
      }

      const st = s.steps[0];
      if (!st) {
        if (C.idle.end > C.idle.start) {
          s.t += dt;
          s.pos = idlePos(s.t);
          s.dirty = true;
        }
      } else if (st.k === "play") {
        const dir = Math.sign(st.to - st.from);
        s.pos += dir * C.fps * dt;
        const done = dir > 0 ? s.pos >= st.to : s.pos <= st.to;
        if (done) s.pos = st.to;
        s.dirty = true;

        if (s.mode === "greet") {
          const g = C.greet;
          const prog = (s.pos - g.start) / (g.end - g.start);
          for (let k = C.greetMessages.length - 1; k >= 0; k--) {
            if (prog >= C.greetMessages[k].at) {
              if (k !== s.msgIdx) {
                s.msgIdx = k;
                setMsg(C.greetMessages[k].text, "center");
              }
              break;
            }
          }
        }
        if (done) next();
      } else {
        s.t += dt * 1000;
        if (s.t >= st.ms) next();
      }

      if (s.dirty) render();
    };
    raf = requestAnimationFrame(tick);

    /* ---------- input: the cursor only selects a zone ---------- */
    const zoneOf = (x) => {
      const r = hero.getBoundingClientRect();
      const p = (x - r.left) / r.width;
      return p < C.zones[0] ? "left" : p > C.zones[1] ? "right" : "center";
    };
    const onMove = (e) => {
      if (mq.matches || e.pointerType === "touch") return;
      const z = zoneOf(e.clientX);
      if (z === s.zone) return; // only act when the zone changes (i.e. on enter)
      s.zone = z;
      trigger(zoneMode(z));
    };
    const onLeave = () => (s.zone = null);
    const onTap = () => {
      if (mq.matches && s.mode === "idle") start("greet");
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onTap);

    // Mobile: no side zones. Greet once shortly after load, tap the character to replay.
    const auto = mq.matches ? setTimeout(() => s.mode === "idle" && start("greet"), 1200) : 0;

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(auto);
      ro.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onTap);
    };
  }, []);

  return (
    <section id="home" className="ih" ref={heroRef} aria-label="Introduction">
      <div className="ih-bg" aria-hidden="true" />

      <div className="ih-note">
        <p className="ih-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M12 2l2.2 7.3L22 12l-7.8 2.7L12 22l-2.2-7.3L2 12l7.8-2.7L12 2z" fill="currentColor" />
          </svg>
          Computer Science &amp; Engineering
        </p>

        <h1 className="ih-title">
          <span className="ih-hi">Hi, I&apos;m</span>
          <span className="ih-name">Gayathri Tulugu</span>
        </h1>

        <p className="ih-meta">
          <span>B.Tech 3rd Year | Lendi Institute of Engineering &amp; Technology</span>
          <span className="ih-role">AI &amp; Software Developer</span>
        </p>

        <p className="ih-tagline">
          Turning Ideas into
          <br />
          <span>Real Solutions...</span>
        </p>

        <div className="ih-actions">
          <a className="btn btn-primary" href="#work">
            Explore My Work
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn-ghost" href="#contact">
            Let&apos;s Connect
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <p className="ih-hint">
          <svg className="ih-cursor" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M5 3l14 7.5-6 1.7-2.3 6.3L5 3z" fill="currentColor" />
          </svg>
          <span className="ih-hint-d">Move your cursor to interact</span>
          <span className="ih-hint-m">Tap her to say hi</span>
        </p>
      </div>

      <div className="ih-stage">
        <canvas
          ref={canvasRef}
          className="ih-canvas"
          role="img"
          aria-label="Animated illustration of Gayathri working at her laptop"
        />
        <div ref={msgRef} className="ih-msg" data-show="0" data-side="center" aria-live="polite" />

        <div className="ih-chip ih-chip--note" aria-hidden="true">
          Build
          <br />
          Learn
          <br />
          Grow
        </div>
        <ul className="ih-chip ih-chip--stack" aria-label="Core technologies">
          <li>C++</li>
          <li>Python</li>
          <li>Java</li>
          <li>Web Dev</li>
        </ul>
      </div>

      <a className="ih-cue" href="#about" aria-label="Scroll to About">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
