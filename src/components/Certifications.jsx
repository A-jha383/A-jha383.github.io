import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import SectionCanvas from "./SectionCanvas";
import { FloatingGems } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

export default function Certifications() {
  const { t, data } = useLanguage();

  return (
    <section id="certifications" className="relative section-pad">
      <SectionCanvas opacity={0.3} camera={{ position: [0, 0, 8], fov: 50 }}>
        <FloatingGems />
      </SectionCanvas>
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8">
        <SectionHeader id="certifications" tag={t.certifications.tag} title={t.certifications.title} />

        <Reveal className="mb-5">
          <h3 className="font-mono-tag text-xs tracking-[0.2em] uppercase text-ink-faint flex items-center gap-2">
            <Icon name="trophy" /> {t.certifications.awards}
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mb-16">
          {data.awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1} y={20}>
              <div className="panel bracket p-6 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 text-amber-400/15 text-6xl leading-none -mr-2 -mt-2">★</div>
                <div className="w-12 h-12 border border-amber-400/30 text-amber-400 flex items-center justify-center text-xl mb-4">
                  <Icon name="trophy" />
                </div>
                <h4 className="font-display text-base font-semibold text-ink">{a.title}</h4>
                <p className="text-signal text-xs font-mono-tag mt-1 mb-3">{a.company}</p>
                <p className="text-ink-dim text-sm leading-relaxed">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-5">
          <h3 className="font-mono-tag text-xs tracking-[0.2em] uppercase text-ink-faint flex items-center gap-2">
            <Icon name="certificate" /> {t.certifications.certs}
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08} y={20}>
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className={`group panel bracket p-6 flex items-center gap-4 h-full hover:bg-panel-2 transition-colors ${
                  c.highlight ? "" : ""
                }`}
              >
                <div className="w-12 h-12 border border-line flex items-center justify-center text-xl text-ink flex-shrink-0">
                  <Icon name={c.badge} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm font-semibold text-ink leading-snug">{c.title}</h4>
                  <p className="text-ink-faint text-xs mt-1 font-mono-tag">{c.issuer}</p>
                </div>
                <Icon name="external" className="text-ink-faint group-hover:text-signal transition-colors flex-shrink-0" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
