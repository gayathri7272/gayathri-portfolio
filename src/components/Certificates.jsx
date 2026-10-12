import "./Certificates.css";

const CERTIFICATES = [
  { issuer: "NPTEL · Silver", title: "Joy of Computing using Python" },
  { issuer: "AICTE", title: "Cybersecurity Virtual Internship" },
  { issuer: "AWS", title: "Data Engineering" },
  { issuer: "Google", title: "Android Developer" },
  { issuer: "Prompt Engineering", title: "Prompt Engineering for AI" },
  { issuer: "Fortinet", title: "Network Security Associate" },
  { issuer: "Career readiness", title: "Employability / Job Ready Skills" },
];

function Certificates() {
  return (
    <section id="certificates" className="section certificates" style={{ "--ax": "90%", "--ay": "20%", "--bx": "8%", "--by": "75%" }}>
      <div className="section-inner reveal">
        <div className="section-heading centered">
          <p className="section-label">Certifications</p>
          <h2>Learning beyond the classroom.</h2>
          <p>Credentials that reflect curiosity, consistency, and a willingness to explore new technology.</p>
        </div>

        <ul className="cert-grid">
          {CERTIFICATES.map((c) => (
            <li className="cert-card glass" key={c.title}>
              <span className="cert-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2l2.2 7.3L22 12l-7.8 2.7L12 22l-2.2-7.3L2 12l7.8-2.7L12 2z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <p className="cert-issuer">{c.issuer}</p>
                <h3>{c.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Certificates;
