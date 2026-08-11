import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ui } from "./ui";
import { content } from "../data/content";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem("ayushjha-lang");
    if (stored === "en" || stored === "de") return stored;
    const nav = window.navigator.language || "en";
    if (nav.toLowerCase().startsWith("de")) return "de";
  } catch {
    /* ignore */
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("ayushjha-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (l) => setLangState(l),
      toggleLang: () => setLangState((l) => (l === "en" ? "de" : "en")),
      t: ui[lang],
      data: content[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
