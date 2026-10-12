import "./Skills.css";

const GROUPS = [
  { title: "Programming", note: "Core languages", items: ["C", "C++", "Python", "Java"] },
  { title: "Web & Mobile", note: "Interfaces", items: ["HTML", "CSS", "Flutter"] },
  { title: "Data & Core CS", note: "Foundations", items: ["DBMS", "MySQL", "Data Structures"] },
  { title: "Tools", note: "Everyday workflow", items: ["MATLAB", "Git & GitHub", "VS Code", "Cisco Packet Tracer"] },
];

function Skills() {
  return (
    <section id="skills" className="section skills" style={{ "--ax": "85%", "--ay": "15%", "--bx": "10%", "--by": "85%" }}>
      <div className="section-inner reveal">
        <div className="section-heading centered">
          <p className="section-label">Skills</p>
          <h2>Tools I use to turn ideas into solutions.</h2>
          <p>My current foundation across programming, web, databases, and core computer science.</p>
        </div>

        <div className="skills-grid">
          {GROUPS.map((g) => (
            <article className="skills-card glass" key={g.title}>
              <header>
                <h3>{g.title}</h3>
                <span>{g.note}</span>
              </header>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
