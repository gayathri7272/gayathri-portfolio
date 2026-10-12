import { useCallback, useEffect, useRef, useState } from "react";
import "./Navbar.css";

// id values match the <section id="…"> in each component (Projects uses "work").
const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "work", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function TulipMark() {
  return (
    <svg className="navbar-mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <defs>
        <linearGradient id="tulipGrad" x1="8" y1="2" x2="25" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8DCFF" />
          <stop offset="1" stopColor="#A77DE8" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.2c-4 1.5-6.4 5-6.4 8.9 0 3.6 2.5 6.1 6.4 6.1s6.4-2.5 6.4-6.1c0-3.9-2.4-7.4-6.4-8.9Z"
        fill="url(#tulipGrad)"
      />
      <path d="M16 3.2c-1.6 2.4-2.3 5-2.3 8.2M16 3.2c1.6 2.4 2.3 5 2.3 8.2" stroke="#180C2B" strokeOpacity=".3" strokeWidth=".9" strokeLinecap="round" fill="none" />
      <path
        d="M16 18.2v10.2M16 24c-2.4 0-4.2-1.2-5.2-3.1M16 25.6c2.3 0 4-1.1 5-2.8"
        stroke="#C8A7FF"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Scroll progress, scrolled state and active section — one rAF-throttled listener.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? Math.min(1, scrollTop / pageHeight) : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));

      setScrolled(scrollTop > 12);

      let current = "home";
      document.querySelectorAll("section[id]").forEach((section) => {
        if (section.getBoundingClientRect().top <= 140) current = section.id;
      });
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Close the mobile menu with Escape, an outside click, or when the viewport grows.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`navbar${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
    >
      <div className="navbar-bar">
        <a className="navbar-logo" href="#home" onClick={close} aria-label="Gayathri — home">
          <TulipMark />
          <span>Gayathri</span>
        </a>

        <nav id="primary-nav" className="navbar-links" aria-label="Main navigation">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : undefined}
              aria-current={activeSection === id ? "true" : undefined}
              onClick={close}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
