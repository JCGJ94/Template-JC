import "../index.css";

const rawValue = import.meta.env.VITE_UI_LIBRARY ?? "bootstrap";
const uiLibrary = String(rawValue).toLowerCase();

const loadBootstrap = () => {
  import("bootstrap/dist/css/bootstrap.min.css");
  import("./bootstrap.css");
};

const loadTailwind = () => {
  import("./tailwind.css");
};

switch (uiLibrary) {
  case "tailwind":
    loadTailwind();
    break;
  case "both":
    loadBootstrap();
    loadTailwind();
    break;
  case "bootstrap":
  default:
    if (!{"bootstrap": true, both: true, tailwind: true}[uiLibrary]) {
      console.warn(
        `Unknown VITE_UI_LIBRARY value "${rawValue}". Falling back to Bootstrap styles.`,
      );
    }
    loadBootstrap();
    break;
}
