"use client";

import { useEffect, useRef } from "react";

const ZOOM_SELECTOR = ".rise-img, .fs-item, .craft-media, .shop-media, .film";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // re-scan for hoverable media on every mount (each page is a fresh DOM)
    const els = Array.from(document.querySelectorAll<HTMLElement>(ZOOM_SELECTOR));
    const onEnter = () => cursor.classList.add("big");
    const onLeave = () => cursor.classList.remove("big");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div id="cursor" ref={ref}>
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="17" fill="none" stroke="#ece3cc" strokeWidth="2" />
        <line x1="20" y1="2" x2="20" y2="12" stroke="#ece3cc" strokeWidth="2" />
        <line x1="20" y1="28" x2="20" y2="38" stroke="#ece3cc" strokeWidth="2" />
        <line x1="2" y1="20" x2="12" y2="20" stroke="#ece3cc" strokeWidth="2" />
        <line x1="28" y1="20" x2="38" y2="20" stroke="#ece3cc" strokeWidth="2" />
      </svg>
    </div>
  );
}
