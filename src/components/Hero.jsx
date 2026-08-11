import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";
import Icon from "./Icon";
import NeuralOrb from "./NeuralOrb";
import Counter from "./Counter";
import Magnetic from "./Magnetic";
import Marquee from "./Marquee";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t, data } = useLanguage();
  const { profile } = data;
  const marqueeItems = data.skills.flatMap((s) => s.items).slice(0, 14);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[640px] max-h-[640px] bg-lime-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-5 md:px-8 w-full relative z-10 flex-1 flex items-center pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center w-full">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8 font-mono-tag text-[11px] tracking-[0.14em] uppercase text-ink-dim">
              <span className="relative w-2 h-2 rounded-full bg-lime-400 pulse-ring" />
              {profile.badge}
            </div>

            <p className="text-ink-dim text-lg mb-1 font-serif-accent text-2xl">{t.hero.hello}</p>
            <h1 className="font-display font-semibold text-[15vw] leading-[0.92] sm:text-7xl md:text-8xl xl:text-[6.4rem] text-ink mb-5 -ml-0.5">
              {profile.name}
            </h1>

            <div className="h-9 md:h-11 flex items-center mb-6">
              <Typewriter words={profile.taglines} />
            </div>

            <p className="text-ink-dim text-base md:text-lg leading-relaxed max-w-xl">
              {profile.description}
            </p>

            <div className="flex items-center gap-7 md:gap-10 mt-8">
              {profile.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-ink">
                    <Counter to={m.value} />
                    {m.suffix}
                  </div>
                  <div className="text-[10.5px] md:text-xs text-ink-faint mt-1 uppercase tracking-wide font-mono-tag">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-9">
              <Magnetic as="a" href="#contact" data-cursor-hover strength={0.35}>
                <span
                  className="group inline-flex items-center gap-2 px-6 py-3.5 text-void font-semibold text-sm"
                  style={{ backgroundColor: "#d7ff3f" }}
                >
                  <Icon name="rocket" /> {t.hero.collaborate}
                </span>
              </Magnetic>
              <Magnetic as="a" href="#ai-expertise" data-cursor-hover strength={0.35}>
                <span className="inline-flex items-center gap-2 px-6 py-3.5 border border-line-strong text-ink text-sm font-medium hover:border-lime hover:text-lime transition-colors">
                  <Icon name="brain" /> {t.hero.expertise}
                </span>
              </Magnetic>
            </div>

            <div className="flex items-center gap-3 mt-9">
              {[
                { icon: "linkedin", href: profile.linkedin },
                { icon: "github", href: profile.github },
                { icon: "leetcode", href: profile.leetcode },
                { icon: "envelope", href: `mailto:${profile.email}` },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  data-cursor-hover
                  className="w-10 h-10 border border-line flex items-center justify-center text-ink-dim hover:text-void hover:border-lime transition-all"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d7ff3f")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 h-[360px] sm:h-[460px] lg:h-[560px] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <NeuralOrb className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-line py-4">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
