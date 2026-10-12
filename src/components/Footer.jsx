import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">
          <span className="footer-name">Gayathri Tulugu</span>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <span>B.Tech CSE · Lendi Institute of Engineering &amp; Technology</span>
        </p>
        <p className="footer-copy">© {year} Gayathri Tulugu. All rights reserved.</p>
        <a className="footer-top" href="#home">
          Back to top
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
