import "./About.css";

const POINTS = [
  {
    n: "01",
    title: "Software Development",
    text: "Learning by building projects with programming, web technologies, and databases.",
  },
  {
    n: "02",
    title: "AI & Data",
    text: "Exploring artificial intelligence, data workflows, and problem-solving with code.",
  },
  {
    n: "03",
    title: "Continuous Learning",
    text: "Growing through projects, internships, certifications, and hands-on practice.",
  },
];

function About() {
  return (
    <section id="about" className="section about" style={{ "--ax": "8%", "--ay": "30%", "--bx": "95%", "--by": "70%" }}>
      <div className="section-inner about-grid reveal">
        <div className="about-intro">
          <div className="section-heading">
            <p className="section-label">About me</p>
            <h2>Building skills today, creating impact tomorrow.</h2>
          </div>
          <p className="about-lead">
            I&rsquo;m Gayathri Tulugu, a Computer Science &amp; Engineering student who enjoys turning ideas into
            practical software experiences.
          </p>
        </div>

        <div className="about-points">
          {POINTS.map((p) => (
            <article className="about-card glass" key={p.n}>
              <span className="about-num">{p.n}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
