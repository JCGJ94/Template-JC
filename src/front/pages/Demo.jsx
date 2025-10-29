import { useState } from "react";
import { Link } from "react-router-dom";

const palette = ["#f97316", "#22d3ee", "#a855f7", "#84cc16", "#facc15"];

export const Demo = () => {
  const [colorIndex, setColorIndex] = useState(0);

  const handleCycle = () => {
    setColorIndex((index) => (index + 1) % palette.length);
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "640px" }}>
        <div className="card-body text-center d-grid gap-4">
          <h2 className="fw-semibold">Texto interactivo</h2>
          <p className="mb-0 text-muted">
            Haz clic en el texto o en el botón para alternar rápidamente entre los colores de la paleta.
          </p>
          <p
            className="fs-3 fw-bold"
            style={{ color: palette[colorIndex], cursor: "pointer" }}
            onClick={handleCycle}
          >
            JC DevTemplate
          </p>
          <button type="button" className="btn btn-dark mx-auto" onClick={handleCycle}>
            Cambiar color
          </button>
          <Link to="/" className="btn btn-outline-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
