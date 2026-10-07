"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  { name: "Calzado", image: "/demo-images/calzado.jpg", alt: "Zapatilla clara sobre un fondo cálido", slug: "calzado" },
  { name: "Ropa", image: "/demo-images/ropa-beige.jpg", alt: "Conjunto de ropa en tonos neutros", slug: "ropa" },
  { name: "Accesorios", image: "/demo-images/accesorios.jpg", alt: "Bolso y accesorios sobre una superficie clara", slug: "accesorios" },
  { name: "Bisutería", image: "/demo-images/bisuteria.jpg", alt: "Aretes dorados sobre fondo claro", slug: "bisutería" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 12.5 12 4M5 4h7v7" />
    </svg>
  );
}

export function CatalogHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="catalog-hero" aria-label="Escaparate de categorías">
      <nav
        className="category-showcase"
        aria-label="Explora las categorías de Novedades"
        style={{
          "--showcase-columns": categories
            .map((_, index) => (index === activeIndex ? "1.72fr" : "0.76fr"))
            .join(" "),
        } as React.CSSProperties}
      >
        {categories.map((category, index) => (
          <a
            aria-current={activeIndex === index ? "true" : undefined}
            className={`category-showcase__panel${activeIndex === index ? " is-active" : ""}`}
            href={`/?categoria=${encodeURIComponent(category.slug)}#catalogo`}
            key={category.name}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <Image
              alt={category.alt}
              className="category-showcase__image"
              fill
              priority={index === 0}
              sizes="(max-width: 760px) 88vw, (max-width: 980px) 50vw, 50vw"
              src={category.image}
            />
            <span className="category-showcase__wash" aria-hidden="true" />
            <span className="category-showcase__index">0{index + 1}</span>
            <span className="category-showcase__label">
              <strong>{category.name}</strong>
              <span className="category-showcase__link">Ver categoría <ArrowIcon /></span>
            </span>
          </a>
        ))}
      </nav>

      <div className="category-showcase__progress" aria-live="polite" aria-atomic="true">
        <span>0{activeIndex + 1}</span><i aria-hidden="true" /><span>04</span>
      </div>
    </section>
  );
}
