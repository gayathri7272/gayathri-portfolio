import "./Contact.css";

const EMAIL = "gayathritulugu10@gmail.com";

const LINKS = [
  {
    label: "Email",
    value: EMAIL.replace("@", "@\u200b"), // allow a clean line break after the @
    href: `mailto:${EMAIL}`,
    external: false,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    value: "gayathri-tulugu",
    href: "https://www.linkedin.com/in/gayathri-tulugu/",
    external: true,
    icon: (
      <path
        fill="currentColor"
        d="M5.2 8.6H2.4V21h2.8V8.6ZM3.8 3a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM21.6 14c0-3.3-1.8-5.6-4.6-5.6-1.4 0-2.5.7-3.1 1.6V8.6h-2.7V21h2.8v-6.5c0-1.7.8-2.7 2.2-2.7s1.9 1 1.9 2.7V21h2.8l-.1-7Z"
      />
    ),
  },
  {
    label: "GitHub",
    value: "gayathri-tulugu",
    href: "https://github.com/gayathri7272",
    external: true,
    icon: (
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    ),
  },
];

function Contact() {
  return (
    <section id="contact" className="section contact" style={{ "--ax": "50%", "--ay": "40%", "--bx": "50%", "--by": "100%" }}>
      <div className="section-inner reveal">
        <div className="contact-panel glass">
          <p className="section-label">Contact</p>
          <h2>Let&rsquo;s build something meaningful.</h2>
          <p className="contact-text">
            I&rsquo;m open to internships, learning opportunities, technical collaborations, and interesting
            software projects.
          </p>

          <div className="contact-cta">
            <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
              Say hello
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="btn btn-ghost" href="/resume/Gayathri_Tulugu_Resume.pdf" target="_blank" rel="noreferrer">
              View Resume
            </a>
          </div>

          <ul className="contact-links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={`${l.label}: ${l.value}`}
                >
                  <span className="contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      {l.icon}
                    </svg>
                  </span>
                  <span className="contact-meta">
                    <span>{l.label}</span>
                    <strong>{l.value}</strong>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="contact-note">Thank you for visiting my portfolio.</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
