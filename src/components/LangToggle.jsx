import { useLanguage } from "../i18n/LanguageContext";

export default function LangToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line p-0.5 font-mono-tag text-[11px] tracking-wide ${className}`}
      role="group"
      aria-label="Language"
    >
      {["en", "de"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          data-cursor-hover
          className={`px-2.5 py-1 rounded-full uppercase transition-colors ${
            lang === l ? "bg-lime text-void font-semibold" : "text-ink-dim hover:text-ink"
          }`}
          style={lang === l ? { backgroundColor: "#d7ff3f", color: "#030303" } : undefined}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
