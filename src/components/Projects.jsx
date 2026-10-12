import "./Projects.css";

/*
  To add a button to a card, set `github` and/or `demo` to a URL.
  A button only renders when its link is present, so nothing points to a dead page.
*/
const PROJECTS = [
  {
    number: "01",
    title: "ZYRO",
    kind: "Team project",
    description:
      "A ride-booking platform inspired by Rapido, built as a cross-platform mobile app with Flutter.",
    role: "Worked on the Rider page and profile-related UI and development.",
    tags: ["Flutter", "Mobile App", "UI Development"],
    github: "",
    demo: "",
  },
  {
    number: "02",
    title: "NetSage AI",
    kind: "Cisco virtual internship",
    description:
      "A network troubleshooting project on a Cisco Packet Tracer topology, focused on finding and fixing connectivity and configuration issues.",
    role: "Configured the network and troubleshot connectivity and configuration problems.",
    tags: ["Cisco Packet Tracer", "Networking", "Troubleshooting"],
    github: "",
    demo: "",
  },
  {
    number: "03",
    title: "SilentSense",
    kind: "Concept · SIH-oriented",
    description:
      "An AI and IoT concept that uses sensor fusion to detect emergencies where an elderly person or someone living alone becomes unresponsive. It checks with the person first before alerting a trusted contact.",
    tags: ["AI", "IoT", "Sensor Fusion", "Emergency Detection"],
    github: "",
    demo: "",
  },
  {
    number: "04",
    title: "Voice-Based Attendance System",
    kind: "Team project",
    description:
      "An IoT attendance system using voice recognition on an ESP32, with Firebase to automate attendance records and timestamps.",
    tags: ["IoT", "ESP32", "Firebase", "Voice Recognition"],
    github: "",
    demo: "",
  },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  </svg>
);

function Projects() {
  return (
    <section id="work" className="section projects" style={{ "--ax": "15%", "--ay": "10%", "--bx": "88%", "--by": "55%" }}>
      <div className="section-inner reveal">
        <div className="section-heading centered">
          <p className="section-label">Projects</p>
          <h2>Things I&rsquo;ve been building.</h2>
          <p>Selected academic and personal work where technology meets real-world problem solving.</p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <article className="project-card glass" key={p.title}>
              <div className="project-top">
                <span className="project-num">{p.number}</span>
                <span className="project-kind">{p.kind}</span>
              </div>

              <h3>{p.title}</h3>
              <p className="project-desc">{p.description}</p>

              {p.role && (
                <p className="project-role">
                  <strong>My role</strong>
                  {p.role}
                </p>
              )}

              <ul className="project-tags" aria-label={`${p.title} technologies`}>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              {(p.github || p.demo) && (
                <div className="project-links">
                  {p.github && (
                    <a className="btn btn-ghost btn-sm" href={p.github} target="_blank" rel="noreferrer">
                      <GithubIcon /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a className="btn btn-primary btn-sm" href={p.demo} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
