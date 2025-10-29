import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark py-3">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0">
          <img src="/jc-code-logo.png" alt="JC Dev logo" width="42" height="42" className="rounded-circle" />
          <span className="fw-semibold">JC DevTemplate</span>
        </Link>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/demo" className="btn btn-outline-light btn-sm px-3">
            Color Demo
          </Link>
          <a
            href="https://github.com/4GeeksAcademy/react-flask-hello"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-info btn-sm px-3"
          >
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
};
