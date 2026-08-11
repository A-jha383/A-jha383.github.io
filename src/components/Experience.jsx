import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { TrajectoryStream } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

export default function Experience() {
  const { t, data } = useLanguage();

  return (
    <section id="experience" className="relative section-pad bg-void-soft">
      <SectionCanvas opacity={0.28} camera={{ position: [0, 0, 8], fov: 50 }}>
        <TrajectoryStream />
      </SectionCanvas>
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeader id="experience" tag={t.experience.tag} title={t.experience.title} />

        <div className="relative">
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ background: "linear-gradient(to bottom, rgba(215,255,63,0.4), var(--color-line) 20%, var(--color-line) 85%, transparent)" }} />

          {data.experience.map((item, i) => {
            const leftSide = i % 2 === 0;
            return (
              <Reveal
                key={item.title + item.date}
                y={20}
                className="relative mb-10 md:mb-14 md:grid md:grid-cols-2 md:gap-10"
              >
                <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 top-1.5 w-8 h-8 border bg-void flex items-center justify-center text-signal z-10" style={{ borderColor: "rgba(215,255,63,0.5)" }}>
                  <Icon name={item.icon} className="text-xs" />
                </div>

                <div className={`pl-14 md:pl-0 ${leftSide ? "md:col-start-1 md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"}`}>
                  <div className="panel bracket p-6 hover:border-line-strong transition-colors">
                    <span className="font-mono-tag text-[11px] text-signal tracking-wide">{item.date}</span>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-ink mt-2">{item.title}</h3>
                    <h4 className="text-ink-dim text-sm mt-0.5">{item.org}</h4>
                    <p className={`text-ink-faint text-xs mt-1 flex items-center gap-1.5 ${leftSide ? "md:justify-end" : ""}`}>
                      <Icon name="pin" /> {item.location}
                    </p>

                    {item.points.length > 0 && (
                      <ul className={`mt-4 space-y-2 text-left ${leftSide ? "md:text-right" : ""}`}>
                        {item.points.map((pt, idx) => (
                          <li key={idx} className="text-ink-dim text-[13px] md:text-sm leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.tags.length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 mt-4 ${leftSide ? "md:justify-end" : ""}`}>
                        {item.tags.map((tag) => (
                          <span key={tag} className="pill pill-ai">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
