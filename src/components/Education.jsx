import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { KnowledgeOrbits } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

export default function Education() {
  const { t, data } = useLanguage();

  return (
    <section id="education" className="relative section-pad bg-void-soft">
      <SectionCanvas opacity={0.3} camera={{ position: [0, 0, 8], fov: 45 }}>
        <KnowledgeOrbits />
      </SectionCanvas>
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8">
        <SectionHeader id="education" tag={t.education.tag} title={t.education.title} />

        <div className="space-y-4">
          {data.education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08} y={20}>
              <div className="panel bracket p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-14 h-14 border flex items-center justify-center text-2xl text-signal flex-shrink-0" style={{ borderColor: "rgba(215,255,63,0.3)" }}>
                  <Icon name={e.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{e.title}</h3>
                  <h4 className="text-ink-dim text-sm mt-0.5">{e.org}</h4>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-ink-faint font-mono-tag">
                    <span className="flex items-center gap-1.5">
                      <Icon name="pin" /> {e.location}
                    </span>
                    <span>{e.date}</span>
                  </div>
                  <p className="text-signal text-sm font-medium mt-2">{e.grade}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
