import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Full-screen background video for the home hero. Silent, loops, and never plays
// for visitors who have asked their device to reduce motion (they see the still poster).
export default function HeroVideo() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setSrc(window.matchMedia("(min-width: 768px)").matches ? "/video/hero-1080.mp4" : "/video/hero-720.mp4");
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [src]);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true));
    else { v.pause(); setPlaying(false); }
  }

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover"
        poster="/video/hero-poster.jpg"
        src={src || undefined}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {src && (
        <button
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute z-20 right-5 sm:right-8 lg:right-[max(3rem,calc((100vw-1400px)/2+3rem))] bottom-14 sm:bottom-16 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      )}
    </>
  );
}
