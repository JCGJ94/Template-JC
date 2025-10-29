export const Footer = () => (
  <footer className="bg-dark text-light py-4 mt-auto">
    <div className="container text-center d-flex flex-column gap-2">
      <p className="mb-0">
        Explora el código base y personalízalo para tus próximos proyectos. Cada sección está lista para que la adaptes a tu
        flujo de trabajo.
      </p>
      <small className="text-secondary">
        © {new Date().getFullYear()} JC DevTemplate · Crafted with dedicación por JC González.
      </small>
    </div>
  </footer>
);
