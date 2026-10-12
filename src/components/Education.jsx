import "./Education.css";

const EDUCATION = [
  {
    year: "2024 – 2028",
    title: "B.Tech — Computer Science & Engineering",
    place: "Lendi Institute of Engineering and Technology",
    text: "Currently pursuing my B.Tech (3rd year) while strengthening programming, data structures, databases, web technologies, and emerging AI skills.",
    current: true,
  },
  {
    year: "2024",
    title: "XII — PCM",
    place: "Sri Chaitanya Junior College, Srikakulam",
    text: "Higher Secondary Education with a strong foundation in mathematics and science.",
  },
  {
    year: "2022",
    title: "SSC — 10th Class",
    place: "Secondary School Education",
    text: "Completed secondary education and built the academic foundation for engineering studies.",
  },
];

function Education() {
  return (
    <section id="education" className="section education" style={{ "--ax": "50%", "--ay": "0%", "--bx": "92%", "--by": "90%" }}>
      <div className="section-inner reveal">
        <div className="section-heading centered">
          <p className="section-label">Education</p>
          <h2>A journey of learning and growth.</h2>
        </div>

        <ol className="edu-timeline">
          {EDUCATION.map((item) => (
            <li className={`edu-item${item.current ? " is-current" : ""}`} key={item.year}>
              <span className="edu-node" aria-hidden="true" />
              <article className="edu-card glass">
                <p className="edu-year">
                  {item.year}
                  {item.current && <span className="pill">Currently pursuing</span>}
                </p>
                <h3>{item.title}</h3>
                <p className="edu-place">{item.place}</p>
                <p className="edu-text">{item.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Education;
