"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import type { RootState } from "../store/store";
import { useAppContext } from "../context/AppContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();

  const pathname = usePathname();
  
  const darkMode = useSelector(
    (state: RootState) => state.theme.darkMode
  );

  const quantidadeCarrinho = useSelector(
    (state: RootState) => state.cart.produtos.length
  );

  const { usuario, logout } = useAppContext();

  return (
    <header className="header">
      <div className="logo-area">
        <Image
          src="/porto_watches_favicon.ico"
          alt="Porto Watches"
          width={56}
          height={56}
          priority
        />

        <div>
          <div className="logo-text">
            Porto Watches
          </div>

          {usuario && (
            <p className="usuario-logado">
              Olá, {usuario.email}
            </p>
          )}
        </div>
      </div>

      <nav className="menu">
        <Link
          href="/"
          className={pathname === "/" ? "menu-link active" : "menu-link"}
        >
          Home
        </Link>

        <Link
          href="/produtos"
          className={
            pathname === "/produtos"
              ? "menu-link active"
              : "menu-link"
          }
        >
          Produtos
        </Link>
      </nav>

      <div className="header-actions">
        <Link href="/carrinho" className="cart-link">
          🛒 Carrinho ({quantidadeCarrinho})
        </Link>

        {usuario ? (
          <button
            className="login-link"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="login-link"
          >
            Login
          </Link>
        )}

        <button
          className="theme-button"
          onClick={() => dispatch(toggleTheme())}
        >
          {darkMode ? "☀️ Claro" : "🌙 Escuro"}
        </button>
      </div>
    </header>
  );
}