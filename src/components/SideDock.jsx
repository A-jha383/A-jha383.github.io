import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navOrder } from "../data/content";
import { useLanguage } from "../i18n/LanguageContext";
import LangToggle from "./LangToggle";
import Icon from "./Icon";
import Magnetic from "./Magnetic";

export default function SideDock() {
  const { t, data } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navOrder.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Slim top bar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-void/75 border-b border-line" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-[4.5rem]">
          <a href="#home" data-cursor-hover className="font-display text-sm md:text-base font-semibold uppercase tracking-[0.18em] flex items-center gap-1.5">
            <span className="text-ink">Ayush</span>
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
            <span className="text-ink">Jha</span>
          </a>

          <div className="hidden md:flex items-center gap-5">
            <LangToggle />
            <Magnetic as="a" href={data.profile.resume} download data-cursor-hover strength={0.4}>
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-line-strong text-xs font-mono-tag uppercase tracking-wide text-ink hover:border-lime hover:text-lime transition-colors">
                <Icon name="download" /> {t.hero.resume}
              </span>
            </Magnetic>
          </div>

          <button
            className="md:hidden text-ink text-xl w-10 h-10 flex items-center justify-center border border-line"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            data-cursor-hover
          >
            <span className="relative block w-4 h-3">
              <span
                className={`absolute left-0 top-0 w-4 h-[1.5px] bg-current transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] w-4 h-[1.5px] bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] w-4 h-[1.5px] bg-current transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-b border-line bg-void/95 backdrop-blur-xl"
            >
              <div className="flex flex-col px-5 py-4 gap-1">
                {navOrder.map((id, i) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`px-1 py-3 flex items-center gap-3 text-sm font-medium border-b border-line/60 last:border-0 ${
                      active === id ? "text-lime" : "text-ink-dim"
                    }`}
                  >
                    <span className="font-mono-tag text-[10px] text-ink-faint">{String(i).padStart(2, "0")}</span>
                    {t.nav[id]}
                  </a>
                ))}
                <div className="flex items-center justify-between pt-3">
                  <LangToggle />
                  <a href={data.profile.resume} download className="text-xs font-mono-tag text-ink-dim flex items-center gap-2">
                    <Icon name="download" /> {t.hero.resume}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Vertical numbered dock — desktop only */}
      <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-0">
        <div className="absolute right-[7px] top-0 bottom-0 w-px side-dock-line" />
        {navOrder.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            data-cursor-hover
            className="group relative flex items-center justify-end gap-3 py-2.5"
          >
            <span
              className={`pointer-events-none whitespace-nowrap font-mono-tag text-[11px] tracking-wide uppercase px-2.5 py-1 border bg-void/80 transition-all duration-200 ${
                active === id
                  ? "opacity-100 translate-x-0 text-signal"
                  : "opacity-0 translate-x-2 border-line text-ink-dim group-hover:opacity-100 group-hover:translate-x-0"
              }`}
              style={active === id ? { borderColor: "rgba(215,255,63,0.6)" } : undefined}
            >
              {t.nav[id]}
            </span>
            <span
              className={`relative z-10 w-[15px] h-[15px] rounded-full border flex items-center justify-center transition-all duration-200 ${
                active === id ? "border-lime bg-lime scale-100" : "border-line-strong bg-void scale-90 group-hover:border-lime group-hover:scale-100"
              }`}
              style={active === id ? { borderColor: "#d7ff3f", backgroundColor: "#d7ff3f" } : undefined}
            />
          </a>
        ))}
      </nav>
    </>
  );
}
