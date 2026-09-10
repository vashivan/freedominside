"use client";

import { useState } from "react";

export default function PlayButton({ play, playing }: { play: string; playing: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="play-btn" onClick={() => setIsPlaying(true)}>
      <span>{isPlaying ? playing : play}</span>
    </div>
  );
}
