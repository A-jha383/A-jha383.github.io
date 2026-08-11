import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Tilt({ children, className = "", maxTilt = 10, glare = true, scale = 1.02 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue("50%");
  const gy = useMotionValue("50%");
  const s = useMotionValue(1);

  const springOpts = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(rx, springOpts);
  const rotateY = useSpring(ry, springOpts);
  const glareX = useSpring(gx, springOpts);
  const glareY = useSpring(gy, springOpts);
  const pressScale = useSpring(s, springOpts);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * maxTilt);
    rx.set((0.5 - py) * 2 * maxTilt);
    gx.set(`${px * 100}%`);
    gy.set(`${py * 100}%`);
  }

  function handleEnter() {
    s.set(scale);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
    s.set(1);
  }

  return (
    <div style={{ perspective: 1400 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          scale: pressScale,
          transformStyle: "preserve-3d",
          "--gx": glareX,
          "--gy": glareY,
        }}
        className="relative tilt-surface"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="tilt-glare pointer-events-none absolute inset-0"
            style={{ transform: "translateZ(1px)" }}
          />
        )}
      </motion.div>
    </div>
  );
}
