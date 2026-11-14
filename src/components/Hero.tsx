"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let frame = 0;
    let disposeScene: (() => void) | undefined;
    let seek: ((position: number) => void) | undefined;
    const paint = () => {
      frame = 0;
      if (disposed) return;
      const progress = Math.max(
        0,
        Math.min(
          1,
          -element.getBoundingClientRect().top /
            Math.max(1, element.offsetHeight - window.innerHeight),
        ),
      );
      seek?.(preference.matches ? 0 : progress);
    };
    const requestPaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const init = async () => {
      const { createIntro } = await import("@/animation/intro");
      if (disposed) return;
      const scene = createIntro((values) => {
        element.style.setProperty(
          "--first-opacity",
          String(values.firstOpacity),
        );
        element.style.setProperty("--first-y", `${values.firstY}px`);
        element.style.setProperty(
          "--second-opacity",
          String(values.secondOpacity),
        );
        element.style.setProperty("--second-y", `${values.secondY}px`);
        element.style.setProperty("--image-scale", String(values.imageScale));
        element.style.setProperty("--progress", String(values.progress));
        element.dataset.chapter = values.secondOpacity > 0.5 ? "2" : "1";
      });
      seek = scene.seek;
      disposeScene = scene.dispose;
      requestPaint();
    };
    void init();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);
    preference.addEventListener("change", requestPaint);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      disposeScene?.();
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      preference.removeEventListener("change", requestPaint);
    };
  }, []);
  return (
    <section
      className="hero"
      ref={root}
      id="top"
      data-chapter="1"
      aria-label="An introduction to Perllynn"
    >
      <div className="hero-stage">
        <div className="hero-image-frame">
          <Image
            src="/brand/chicago-river.jpg"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 50vw"
            alt="Chicago River framed by the city’s distinctive architecture"
            className="hero-image"
          />
          <div className="hero-image-shade" />
        </div>
        <div className="hero-copy hero-first">
          <p className="eyebrow">
            <span className="status-dot" /> Independent thinking. Unbiased
            advice.
          </p>
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
        <div className="hero-copy hero-second" aria-hidden="true">
          <p className="eyebrow">A clear view of what matters.</p>
          <div className="hero-title">
            Your interests.
            <br />
            <em>Our only agenda.</em>
          </div>
          <p className="hero-description">
            Specialized expertise. A global perspective.
            <br />
            Advice shaped around your unique situation.
          </p>
        </div>
        <div className="hero-bottom">
          <a href="#perspective" className="scroll-cue">
            <span className="scroll-line" /> Scroll to discover
          </a>
          <span className="hero-location">Chicago, Illinois · Est. 2022</span>
        </div>
      </div>
    </section>
  );
}
