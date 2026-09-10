"use client";

import { useEffect, useRef, useState, type ElementType, type ComponentPropsWithoutRef } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  rotate?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Wraps any element and fades/rises it into view the first time it
 * crosses into the viewport. Mirrors the old `.rise` / `.rise-img`
 * scroll-triggered reveal from the static site, but scoped per-component
 * instead of a single global querySelectorAll pass.
 */
export default function Reveal<T extends ElementType = "div">({
  as,
  className = "",
  rotate,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current as Element | null;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = rotate !== undefined ? { ["--r" as string]: `${rotate}deg` } : undefined;

  return (
    <Tag
      ref={ref}
      className={`${className}${inView ? " in" : ""}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
