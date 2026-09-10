"use client";

import { useRef, type ReactNode } from "react";

export default function Filmstrip({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onDown = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = true;
    state.current.startX = e.pageX - el.offsetLeft;
    state.current.scrollLeft = el.scrollLeft;
    el.classList.add("dragging");
  };
  const onUp = () => {
    state.current.isDown = false;
    ref.current?.classList.remove("dragging");
  };
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = state.current.scrollLeft - (x - state.current.startX) * 1.4;
  };
  const onWheel = (e: React.WheelEvent) => {
    const el = ref.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <div
      ref={ref}
      className="filmstrip"
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onMouseMove={onMove}
      onWheel={onWheel}
    >
      {children}
    </div>
  );
}
