"use client";

import { useEffect, useState, type AnimationEvent } from "react";
import { CatalogHero } from "@/components/catalog-hero";
import { MarisolPortrait } from "@/components/marisol-portrait";
import { SiteHeader } from "@/components/site-header";

export function CatalogEntry() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => {
        setIntroVisible(false);
      });
    }
  }, []);

  function finishIntro(event: AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && event.animationName === "portrait-intro") {
      setIntroVisible(false);
    }
  }

  return (
    <>
      {introVisible && (
        <div className="intro-screen" role="region" aria-label="Presentación de Novedades">
          <div className="intro-screen__topline" aria-hidden="true">
            <span>NOVEDADES</span>
            <span>CATÁLOGO</span>
          </div>

          <button className="intro-skip" onClick={() => setIntroVisible(false)} type="button">
            Omitir presentación
          </button>

          <div className="intro-center">
            <div className="intro-portrait" onAnimationEnd={finishIntro} aria-hidden="true">
              <MarisolPortrait />
            </div>
            <p className="intro-wordmark">Novedades<span>.</span></p>
          </div>

          <div className="intro-screen__bottomline" aria-hidden="true">
            <span>CALZADO</span><i />
            <span>ROPA</span><i />
            <span>ACCESORIOS</span><i />
            <span>BISUTERÍA</span>
          </div>
        </div>
      )}

      <SiteHeader aria-hidden={introVisible} inert={introVisible} />
      {!introVisible && (
        <main>
          <CatalogHero />
        </main>
      )}
    </>
  );
}
