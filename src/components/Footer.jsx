import Icon from "./Icon";
import LangToggle from "./LangToggle";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t, data } = useLanguage();
  const { profile } = data;

  return (
    <footer className="relative border-t border-line py-10">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 flex flex-col items-center text-center gap-5">
        <div className="font-display text-sm font-semibold uppercase tracking-[0.18em] flex items-center gap-1.5">
          <span className="text-ink">Ayush</span>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
          <span className="text-ink">Jha</span>
        </div>
        <p className="text-ink-faint text-sm">{t.footer.tagline}</p>
        <div className="flex items-center justify-center gap-4">
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
              className="text-ink-faint hover:text-signal transition-colors"
            >
              <Icon name={s.icon} />
            </a>
          ))}
        </div>
        <LangToggle />
        <p className="text-ink-faint text-xs font-mono-tag">
          &copy; {new Date().getFullYear()} Ayush Jha. {t.footer.crafted}
        </p>
      </div>
    </footer>
  );
}
