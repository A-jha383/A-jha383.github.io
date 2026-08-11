import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { IdentityCore } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

export default function About() {
  const { t, data } = useLanguage();
  const { about, profile } = data;

  return (
    <section id="about" className="relative section-pad">
      <SectionCanvas opacity={0.3} camera={{ position: [0, 0, 7], fov: 45 }}>
        <IdentityCore />
      </SectionCanvas>
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8">
        <SectionHeader id="about" tag={t.about.tag} title={t.about.title} />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7" y={20}>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">
              {about.heading}
            </h3>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-dim leading-relaxed mb-4 text-[15px] md:text-base">
                {p}
              </p>
            ))}

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {about.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 text-sm text-ink">
                  <span className="w-5 h-5 border text-signal flex items-center justify-center flex-shrink-0" style={{ borderColor: "rgba(215,255,63,0.4)" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {h}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.15} y={20}>
            <div className="relative">
              <div className="panel bracket p-1.5 mb-6">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top grayscale-[30%] contrast-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 font-mono-tag text-[10px] uppercase tracking-widest text-lime-400 bg-void/70 px-2 py-1">
                    Paderborn, DE
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {about.stats.map((s) => (
                  <div key={s.label} className="panel bracket p-5 text-center">
                    <Icon name={s.icon} className="text-2xl text-signal mx-auto mb-2" />
                    <div className="font-display text-xl font-bold text-ink">{s.value}</div>
                    <div className="text-xs text-ink-faint mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
