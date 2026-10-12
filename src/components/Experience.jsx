import "./Experience.css";

const EXPERIENCES = [
  {
    title: "Cisco Virtual Internship",
    organization: "Cisco",
    status: "Ongoing",
    description:
      "Hands-on network configuration and troubleshooting using Cisco Packet Tracer topologies.",
  },
  {
    title: "Cyber Crime Awareness Campaign",
    organization: "Summer internship",
    description:
      "Worked on spreading cyber-crime awareness and promoting safe online practices.",
  },
  {
    title: "Cybersecurity Virtual Internship",
    organization: "AICTE",
    description:
      "Gained practical exposure to cybersecurity concepts, security practices, and foundational network protection.",
  },
  {
    title: "Data Engineering",
    organization: "AWS",
    description:
      "Explored data engineering concepts, data workflows, and technologies used for handling and processing data.",
  },
  {
    title: "Android Developer",
    organization: "EduSkills",
    description:
      "Built knowledge of Android development and mobile application concepts through hands-on learning.",
  },
];

function Experience() {
  return (
    <section id="experience" className="section experience" style={{ "--ax": "10%", "--ay": "25%", "--bx": "90%", "--by": "85%" }}>
      <div className="section-inner reveal">
        <div className="section-heading centered">
          <p className="section-label">Experience</p>
          <h2>Where learning became hands-on.</h2>
          <p>Internship and training experiences that helped me connect concepts with practical work.</p>
        </div>

        <div className="exp-list">
          {EXPERIENCES.map((e) => (
            <article className="exp-card glass" key={e.title}>
              <header>
                <span className="exp-org">{e.organization}</span>
                {e.status && <span className="pill exp-status">{e.status}</span>}
              </header>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
