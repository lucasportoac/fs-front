import { Link } from "react-router-dom";
import logoPW from "../assets/porto_watches_favicon.ico";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-area">
        <img
          src={logoPW}
          alt="Porto Watches"
          className="logo-img"
        />

        <span className="logo-text">
          Porto Watches
        </span>
      </div>

      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/quem-somos">Quem Somos</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/contato">Contato</Link>
      </nav>
    </header>
  );
}