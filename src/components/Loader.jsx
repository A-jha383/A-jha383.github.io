import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export default function Loader({ visible }) {
  const { t } = useLanguage();
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              {[
                [60, 20, 20, 55],
                [60, 20, 100, 55],
                [20, 55, 40, 100],
                [100, 55, 80, 100],
                [20, 55, 100, 55],
                [40, 100, 80, 100],
              ].map(([x1, y1, x2, y2], i) => (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#loaderGrad)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1.2, delay: i * 0.12, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.4 }}
                />
              ))}
              <defs>
                <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d7ff3f" />
                  <stop offset="100%" stopColor="#6fb7ff" />
                </linearGradient>
              </defs>
              {[[60,20],[20,55],[100,55],[40,100],[80,100]].map(([cx,cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill={i % 2 === 0 ? "#d7ff3f" : "#6fb7ff"}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </svg>
          </div>
          <p className="mt-6 font-mono-tag text-xs tracking-[0.2em] text-ink-dim uppercase">
            {t.loader}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
