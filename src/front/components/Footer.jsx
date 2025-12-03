export const Footer = () => (
  <footer
    className="text-light py-4 mt-auto"
    style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, var(--color-header-footer) 100%)',
      borderTop: '1px solid rgba(59, 130, 246, 0.1)',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}
  >
    <div className="container text-center d-flex flex-column gap-2">
      <p className="mb-0" style={{ color: 'rgba(248, 250, 252, 0.9)' }}>
        Explora el código base y personalízalo para tus próximos proyectos. Cada sección está lista para que la adaptes a tu
        flujo de trabajo.
      </p>
      <small style={{ color: 'rgba(148, 163, 184, 0.8)' }}>
        © {new Date().getFullYear()} JC DevTemplate · Crafted with dedicación por JC González.
      </small>
    </div>
  </footer>
);
