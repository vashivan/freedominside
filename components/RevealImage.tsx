import type { ReactNode, CSSProperties } from "react";
import Reveal from "./Reveal";

type RevealImageProps = {
  className?: string;
  style?: CSSProperties;
  /** The image itself — goes inside `.clip`, which crops the reveal-scale animation. */
  children: ReactNode;
  /**
   * Tape strips, stickers, captions, price tags, etc. Rendered as siblings of
   * `.clip` (not inside it), so they're free to sit outside the photo's edges
   * instead of being cropped by `.clip`'s `overflow: hidden`.
   */
  overlay?: ReactNode;
};

/**
 * Standard "photo card" used across the hero, gallery, drop, craft and
 * article sections: a rotated/positioned outer element (className carries
 * that layout), a `.rise-img` reveal state, and an inner `.clip` mask that
 * only the image scales out of on reveal. Anything passed as `overlay`
 * stays outside that mask so it can overhang the photo (tape, stickers,
 * captions with negative offsets, etc).
 */
export default function RevealImage({ className = "", style, children, overlay }: RevealImageProps) {
  return (
    <Reveal className={`rise-img ${className}`} style={style}>
      <div className="clip">{children}</div>
      {overlay}
    </Reveal>
  );
}
