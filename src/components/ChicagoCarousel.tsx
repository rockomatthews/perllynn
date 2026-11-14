"use client";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";

const views = [
  {
    name: "Skydeck",
    image: "/brand/chicago-skydeck.jpg",
    alt: "A glass Skydeck balcony above Chicago, with the city stretching to the horizon",
    title: "Rooted here.",
    emphasis: "Thinking beyond.",
  },
  {
    name: "Millennium Park",
    image: "/brand/chicago-cloud-gate.jpg",
    alt: "Cloud Gate reflecting the Chicago skyline and visitors in Millennium Park",
    title: "A new perspective.",
    emphasis: "Same clear focus.",
  },
];

export default function ChicagoCarousel() {
  const [active, setActive] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  return (
    <section
      className="chicago-carousel"
      id="chicago"
      aria-label="Our home in Chicago"
      aria-roledescription="carousel"
      data-active-place={views[active].name}
      style={{ "--active": active } as CSSProperties}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          setActive(event.key === "ArrowRight" ? 1 : 0);
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
          setActive(dx > 0 ? 1 : 0);
      }}
    >
      {views.map((view, index) => (
        <div
          className="chicago-slide"
          key={view.name}
          role="group"
          aria-roledescription="slide"
          aria-label={view.name}
          aria-hidden={active !== index}
          inert={active !== index}
        >
          <Image
            src={view.image}
            fill
            sizes="100vw"
            loading="eager"
            alt={view.alt}
            className="chicago-image"
          />
          <div className="chicago-shade" />
          <div className="chicago-copy">
            <p className="eyebrow">Based in Chicago. Connected worldwide.</p>
            <h2>
              {view.title}
              <br />
              <em>{view.emphasis}</em>
            </h2>
          </div>
        </div>
      ))}
      <div className="chicago-bottom">
        <span>Chicago, Illinois</span>
        <div
          className="carousel-controls"
          role="group"
          aria-label="Choose a Chicago view"
        >
          {views.map((view, index) => (
            <button
              key={view.name}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
