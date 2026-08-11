import Reveal from "./Reveal";
import { navOrder } from "../data/content";

export default function SectionHeader({ id, tag, title, subtitle, align = "left" }) {
  const index = navOrder.indexOf(id);
  const isCenter = align === "center";

  return (
    <Reveal className={`mb-14 md:mb-20 ${isCenter ? "text-center" : ""}`}>
      <div className={`flex items-center gap-4 mb-5 ${isCenter ? "justify-center" : ""}`}>
        <span className="index-tag">
          {index >= 0 && <span className="index-num">/{String(index).padStart(2, "0")}</span>}
          {tag}
        </span>
        {!isCenter && <span className="h-px flex-1 max-w-[120px] bg-line" style={{ background: "var(--color-line)" }} />}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-semibold text-ink leading-[1.05] max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-ink-dim max-w-xl mt-5 text-[15px] md:text-base ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
