import "./App.css";
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <div>
      <Analytics />

      <svg
        className="hero-svg"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="55" fill="url(#paint0_radial)" />
        <path d="M60 30L75 90H45L60 30Z" fill="#fff" opacity="0.8" />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(60 60) scale(55)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff8a00" />
            <stop offset="1" stopColor="#e52e71" />
          </radialGradient>
        </defs>
      </svg>
      <h1>Witaj na nowej stronie!</h1>
      <div className="subtitle">
        To przykładowa, nowoczesna strona startowa z gradientem, grafiką SVG i
        stylowym przyciskiem.
        <br />
        Miłego dnia!
      </div>
      <button
        className="main-btn"
        onClick={() => window.open("https://github.com/LukasZaw", "_blank")}
      >
        Przejdź dalej
      </button>
    </div>
  );
}

export default App;
