"use client";

import { useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import Link from "next/link";

const categories = ["Calzado", "Ropa", "Accesorios", "Bisutería"];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 12.5 12 4M5 4h7v7" />
    </svg>
  );
}

export function SiteHeader(props: ComponentProps<"header"> = {}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchToggleRef = useRef<HTMLButtonElement>(null);
  const wasSearchOpenRef = useRef(false);

  useLayoutEffect(() => {
    if (searchOpen) {
      wasSearchOpenRef.current = true;
      searchInputRef.current?.focus();
    } else if (wasSearchOpenRef.current) {
      wasSearchOpenRef.current = false;
      searchToggleRef.current?.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header {...props} className="site-header">
      <div className="header-ribbon" aria-label="Categorías del catálogo">
        <div className="header-ribbon__inner">
          <span>CALZADO</span>
          <span className="ribbon-dot" aria-hidden="true" />
          <span>ROPA</span>
          <span className="ribbon-dot" aria-hidden="true" />
          <span>ACCESORIOS</span>
          <span className="ribbon-dot" aria-hidden="true" />
          <span>BISUTERÍA</span>
        </div>
      </div>

      <div className="header-main">
        <div className="header-main__inner">
          <Link className="brand" href="/" aria-label="Novedades, inicio">
            <span className="brand-mark" aria-hidden="true">N</span>
            <span className="brand-name">Novedades<span className="brand-period">.</span></span>
          </Link>

          <nav className="desktop-nav" aria-label="Categorías">
            {categories.map((category) => (
              <Link key={category} href={`/?categoria=${encodeURIComponent(category.toLowerCase())}#catalogo`}>
                {category}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              aria-label={searchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
              aria-expanded={searchOpen}
              className={`icon-button search-toggle${searchOpen ? " is-active" : ""}`}
              ref={searchToggleRef}
              onClick={() => {
                setMenuOpen(false);
                const nextOpen = !searchOpen;
                setSearchOpen(nextOpen);
                if (nextOpen) window.setTimeout(() => searchInputRef.current?.focus(), 60);
              }}
              type="button"
            >
              <SearchIcon />
              <span className="search-toggle__label">Buscar</span>
            </button>
            <button
              aria-controls="mobile-category-menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="icon-button mobile-menu-toggle"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen((open) => !open);
              }}
              type="button"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        <section
          className={`search-panel${searchOpen ? " is-open" : ""}`}
          aria-label="Buscar en el catálogo"
          aria-hidden={!searchOpen}
          inert={!searchOpen}
        >
          <div className="search-panel__top">
            <Link className="search-panel__brand" href="/" aria-label="Novedades, inicio">
              <span className="brand-mark" aria-hidden="true">N</span>
              <span className="brand-name">Novedades<span className="brand-period">.</span></span>
            </Link>
            <form className="search-field" action="/" method="get">
              <SearchIcon />
              <input
                aria-label="Buscar productos"
                name="busqueda"
                placeholder="Busca calzado, ropa y más"
                ref={searchInputRef}
                type="search"
              />
              <kbd>ENTER</kbd>
            </form>
            <button className="search-panel__cancel" onClick={() => setSearchOpen(false)} type="button">
              Cancelar
            </button>
          </div>
          <div className="search-panel__content">
            <p>Explora por categoría</p>
            <nav aria-label="Categorías sugeridas">
              {categories.map((category) => (
                <Link
                  href={`/?categoria=${encodeURIComponent(category.toLowerCase())}#catalogo`}
                  key={category}
                  onClick={() => setSearchOpen(false)}
                >
                  {category}<ArrowIcon />
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </div>

      <div
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        id="mobile-category-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Categorías del catálogo">
          {categories.map((category, index) => (
            <Link
              href={`/?categoria=${encodeURIComponent(category.toLowerCase())}#catalogo`}
              key={category}
              onClick={closeMenu}
            >
              <span className="mobile-nav__index">0{index + 1}</span>
              <span>{category}</span>
              <span className="mobile-nav__arrow"><ArrowIcon /></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
