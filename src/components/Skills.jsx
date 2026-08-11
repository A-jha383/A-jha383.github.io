import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { SkillKnot } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

export default function Skills() {
  const { t, data } = useLanguage();

  return (
    <section id="skills" className="relative section-pad">
      <SectionCanvas opacity={0.26} camera={{ position: [0, 0, 8], fov: 45 }}>
        <SkillKnot />
      </SectionCanvas>
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8">
        <SectionHeader id="skills" tag={t.skills.tag} title={t.skills.title} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.skills.map((cat, i) => (
            <Reveal
              key={cat.title}
              delay={(i % 3) * 0.06}
              y={24}
              className={cat.featured ? "lg:col-span-2" : ""}
            >
              <div className={`panel bracket p-6 h-full relative overflow-hidden ${cat.featured ? "bg-panel-2" : ""}`}>
                {cat.featured && (
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-lime-500/[0.08] rounded-full blur-2xl" />
                )}
                <div className="flex items-center gap-3 mb-4 relative">
                  <div className="w-10 h-10 border flex items-center justify-center text-signal" style={{ borderColor: "rgba(215,255,63,0.3)" }}>
                    <Icon name={cat.icon} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 relative">
                  {cat.items.map((s) => (
                    <span key={s} className={`pill ${cat.featured ? "pill-ai" : ""}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
