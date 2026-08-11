import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { NeuralMatrix } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

// Bento span pattern for a less uniform, more editorial grid
const spanPattern = [
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
];

export default function AIExpertise() {
  const { t, data } = useLanguage();

  return (
    <section id="ai-expertise" className="relative section-pad">
      <SectionCanvas opacity={0.28} camera={{ position: [0, 0, 8], fov: 50 }}>
        <NeuralMatrix />
      </SectionCanvas>
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8">
        <SectionHeader id="ai-expertise" tag={t.aiExpertise.tag} title={t.aiExpertise.title} subtitle={t.aiExpertise.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:grid-flow-dense">
          {data.aiExpertise.map((card, i) => (
            <Reveal key={card.title} delay={(i % 3) * 0.06} y={24} className={spanPattern[i % spanPattern.length]}>
              <div className="group panel bracket p-6 h-full hover:bg-panel-2 transition-colors duration-300 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 flex items-center justify-center text-xl border text-signal" style={{ borderColor: "rgba(215,255,63,0.3)" }}>
                    <Icon name={card.icon} />
                  </div>
                  <span className="font-mono-tag text-[10px] text-ink-faint">/{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">{card.title}</h3>
                <p className="text-ink-dim text-[13.5px] leading-relaxed mb-4 flex-1">{card.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tech.map((tItem) => (
                    <span key={tItem} className="pill">
                      {tItem}
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
