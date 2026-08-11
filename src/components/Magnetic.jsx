import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({ children, className = "", strength = 0.35, as = "div", ...rest }) {
  const ref = useRef(null);
  const springOpts = { stiffness: 200, damping: 15, mass: 0.3 };
  const x = useSpring(0, springOpts);
  const y = useSpring(0, springOpts);
  const MotionTag = motion[as] || motion.div;

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
