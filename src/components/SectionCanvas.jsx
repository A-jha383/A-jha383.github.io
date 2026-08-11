import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

/**
 * Lazily mounts a lightweight R3F canvas as a section's ambient background.
 * Only renders while the section is near the viewport, to keep concurrent
 * WebGL contexts low as the user scrolls through many sections.
 */
export default function SectionCanvas({ children, className = "", opacity = 0.32, camera }) {
  const wrapperRef = useRef(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = wrapperRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setActive(entry.isIntersecting));
      },
      { rootMargin: "250px 0px 250px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {active && (
        <Canvas
          camera={camera ?? { position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
