import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      className="navbar navbar-dark py-3"
      style={{
        background: 'linear-gradient(135deg, var(--color-header-footer) 0%, rgba(15, 23, 42, 0.98) 100%)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0">
          <img src="/jc-code-logo.png" alt="JC Dev logo" width="42" height="42" className="rounded-circle" />
          <span className="fw-semibold" style={{ color: 'var(--color-text-light)' }}>JC DevTemplate</span>
        </Link>
        <div className="d-flex gap-2 flex-wrap">
          <Link
            to="/demo"
            className="btn btn-sm px-3"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              color: 'var(--color-text-light)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.25)';
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
              e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            }}
          >
            Color Demo
          </Link>

        </div>
      </div>
    </nav>
  );
};
