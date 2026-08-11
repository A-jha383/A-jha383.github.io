import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { DriftingShards } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

export default function Projects() {
  const { t, data } = useLanguage();

  return (
    <section id="projects" className="relative section-pad bg-void-soft">
      <SectionCanvas opacity={0.3} camera={{ position: [0, 0, 8], fov: 50 }}>
        <DriftingShards />
      </SectionCanvas>
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8">
        <SectionHeader id="projects" tag={t.projects.tag} title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid md:grid-cols-2 gap-4">
          {data.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} y={24}>
              <div className="panel bracket p-7 h-full hover:bg-panel-2 transition-colors duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 flex items-center justify-center text-lg border text-signal" style={{ borderColor: "rgba(215,255,63,0.3)" }}>
                    <Icon name={p.icon} />
                  </div>
                  <span className="pill pill-ai flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-2.5">{p.title}</h3>
                <p className="text-ink-dim text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((tItem) => (
                    <span key={tItem} className="pill">
                      {tItem}
                    </span>
                  ))}
                </div>
                <div className="flex items-start gap-2 text-[13px] text-signal border-t border-line pt-4">
                  <Icon name="chart" className="mt-0.5 flex-shrink-0" />
                  <span>{p.impact}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
