"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const places = ["Skydeck", "Millennium Park"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const seek = useRef<((position: number) => void) | undefined>(undefined);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let frame = 0;
    let disposeScene: (() => void) | undefined;
    const paint = () => {
      frame = 0;
      if (disposed || preference.matches) return;
      const range = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = Math.max(
        0,
        Math.min(1, -element.getBoundingClientRect().top / range),
      );
      seek.current?.(progress);
    };
    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const init = async () => {
      const { createIntro } = await import("@/animation/intro");
      if (disposed) return;
      const scene = createIntro((values) => {
        element.style.setProperty("--slide", String(values.slide));
        setActive(values.slide >= 0.5 ? 1 : 0);
      });
      seek.current = scene.seek;
      disposeScene = scene.dispose;
      scene.seek(0);
      requestPaint();
    };
    void init();
    const onPreferenceChange = () => {
      if (preference.matches) seek.current?.(0);
      else requestPaint();
    };
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      disposeScene?.();
      seek.current = undefined;
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  function selectSlide(index: number) {
    const element = root.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      seek.current?.(index);
      return;
    }
    const top = window.scrollY + element.getBoundingClientRect().top;
    window.scrollTo({
      top:
        top + (element.offsetHeight - window.innerHeight) * (index ? 0.86 : 0),
      behavior: "smooth",
    });
  }

  return (
    <section
      ref={root}
      className="hero"
      id="top"
      data-active-place={places[active]}
      aria-label="Perllynn perspectives in Chicago"
      aria-roledescription="carousel"
    >
      <div
        className="hero-stage"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            selectSlide(event.key === "ArrowRight" ? 1 : 0);
          }
        }}
        onPointerDown={(event) => {
          gesture.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          if (
            Math.abs(dx) > 55 &&
            Math.abs(dx) > Math.abs(event.clientY - start.y)
          )
            selectSlide(dx > 0 ? 1 : 0);
        }}
      >
        <div
          className="hero-slide hero-first"
          role="group"
          aria-roledescription="slide"
          aria-label="Skydeck"
          aria-hidden={active !== 0}
          inert={active !== 0}
        >
          <Image
            src="/brand/chicago-skydeck.jpg"
            fill
            priority
            sizes="100vw"
            alt="A glass Skydeck balcony high above Chicago, with the city stretching to the horizon"
            className="hero-image skydeck-image"
          />
          <div className="hero-image-shade" />
          <div className="hero-copy">
            <p className="eyebrow">Independent thinking. Unbiased advice.</p>
            <h1>
              Independent minds.
              <br />
              <em>Clearer decisions.</em>
            </h1>
            <p className="hero-description">
              A network of independent experts.
              <br />
              One focus: what makes sense for you.
            </p>
            <a className="button button-outline" href="#contact">
              Start a conversation <span aria-hidden="true">+</span>
            </a>
          </div>
        </div>
        <div
          className="hero-slide hero-second"
          role="group"
          aria-roledescription="slide"
          aria-label="Millennium Park"
          aria-hidden={active !== 1}
          inert={active !== 1}
        >
          <Image
            src="/brand/chicago-cloud-gate.jpg"
            fill
            priority
            sizes="100vw"
            alt="Cloud Gate reflecting Chicago’s skyline and visitors in Millennium Park"
            className="hero-image cloud-gate-image"
          />
          <div className="hero-image-shade" />
          <div className="hero-copy">
            <p className="eyebrow">A clear view of what matters.</p>
            <h2 className="hero-title">
              Your interests.
              <br />
              <em>Our only agenda.</em>
            </h2>
            <p className="hero-description">
              Specialized expertise. A global perspective.
              <br />
              Advice shaped around your unique situation.
            </p>
            <a className="button button-outline" href="#contact">
              Start a conversation <span aria-hidden="true">+</span>
            </a>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#perspective" className="scroll-cue">
            <span className="scroll-line" /> Scroll to discover
          </a>
          <div
            className="carousel-controls"
            role="group"
            aria-label="Choose a Chicago view"
          >
            {places.map((place, index) => (
              <button
                key={place}
                type="button"
                aria-pressed={active === index}
                onClick={() => selectSlide(index)}
              >
                {place}
              </button>
            ))}
          </div>
          <span className="hero-location">Chicago, Illinois · Est. 2022</span>
        </div>
      </div>
    </section>
  );
}
