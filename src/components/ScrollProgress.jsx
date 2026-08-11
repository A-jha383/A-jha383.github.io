import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70]"
      style={{ scaleX, background: "linear-gradient(90deg, #d7ff3f, #6fb7ff 55%, #ff5c72)" }}
    />
  );
}
