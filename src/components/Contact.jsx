import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Icon from "./Icon";
import InteractiveTerminal from "./InteractiveTerminal";
import SectionCanvas from "./SectionCanvas";
import { PerspectiveFloor } from "./scenes/AmbientScenes";
import { useLanguage } from "../i18n/LanguageContext";

function ContactRow({ icon, label, value, action, onAction, href, external, download }) {
  const content = (
    <>
      <span className="text-ink-faint w-5 flex-shrink-0">
        <Icon name={icon} />
      </span>
      <span className="text-ink-faint w-20 sm:w-24 flex-shrink-0">{label}</span>
      <span className="text-ink truncate">{value}</span>
      <span className="ml-auto pl-3 flex-shrink-0 text-[11px] uppercase tracking-wide border border-line px-2 py-0.5 group-hover:border-lime group-hover:text-signal transition-colors">
        {action}
      </span>
    </>
  );

  const className =
    "group w-full flex items-center gap-3 py-2 border-b border-line/60 last:border-0 hover:pl-1 transition-all duration-150 text-left";

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        download={download ? true : undefined}
        data-cursor-hover
        onClick={(e) => e.stopPropagation()}
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      data-cursor-hover
      className={className}
    >
      {content}
    </button>
  );
}

// Canonical command + localized/shorthand aliases -> canonical key
const ALIASES = {
  help: "help",
  "?": "help",
  hilfe: "help",
  whoami: "whoami",
  status: "status",
  "cat status.log": "status",
  contact: "contact",
  "contact --list": "contact",
  kontakt: "contact",
  "kontakt --liste": "contact",
  email: "email",
  "e-mail": "email",
  mail: "email",
  linkedin: "linkedin",
  github: "github",
  leetcode: "leetcode",
  resume: "resume",
  cv: "resume",
  lebenslauf: "resume",
  download: "resume",
  skills: "skills",
  kernkompetenzen: "skills",
  projects: "projects",
  projekte: "projects",
  experience: "experience",
  werdegang: "experience",
  clear: "clear",
  cls: "clear",
  löschen: "clear",
  ls: "ls",
};

export default function Contact() {
  const { t, data } = useLanguage();
  const { profile } = data;
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function openLink(url) {
    window.open(url, "_blank", "noreferrer");
  }

  const contactList = (
    <div>
      <ContactRow
        icon="envelope"
        label="email"
        value={profile.email}
        action={copied ? t.contact.copied : t.contact.copy}
        onAction={copyEmail}
      />
      <ContactRow icon="linkedin" label="linkedin" value="00-ayush-jha" action={t.contact.openLink} href={profile.linkedin} external />
      <ContactRow icon="github" label="github" value="A-jha383" action={t.contact.openLink} href={profile.github} external />
      <ContactRow icon="leetcode" label="leetcode" value="ayushj383" action={t.contact.openLink} href={profile.leetcode} external />
    </div>
  );

  const resumeOutput = (
    <div>
      <p className="mb-2">{t.contact.resumeOut}</p>
      <ContactRow icon="download" label="resume.pdf" value={profile.resume.split("/").pop()} action={t.contact.download} href={profile.resume} download />
    </div>
  );

  const helpOutput = (
    <div>
      <p className="text-ink-faint mb-2">{t.contact.helpIntro}</p>
      <div className="space-y-1">
        {t.contact.helpItems.map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-3">
            <span className="text-signal w-24 flex-shrink-0">{cmd}</span>
            <span className="text-ink-faint">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );

  function handleCommand(raw) {
    if (!raw) return null;
    const key = ALIASES[raw.toLowerCase()];

    switch (key) {
      case "help":
        return { output: helpOutput };
      case "whoami":
        return { output: <p>{t.contact.whoamiOut}</p> };
      case "status":
        return { output: <p>{t.contact.statusOut}</p> };
      case "contact":
        return { output: contactList };
      case "email":
        copyEmail();
        return {
          output: (
            <p>
              {profile.email} — {t.contact.copied}
            </p>
          ),
        };
      case "linkedin":
        openLink(profile.linkedin);
        return { output: <p>{t.contact.opening} LinkedIn…</p> };
      case "github":
        openLink(profile.github);
        return { output: <p>{t.contact.opening} GitHub…</p> };
      case "leetcode":
        openLink(profile.leetcode);
        return { output: <p>{t.contact.opening} LeetCode…</p> };
      case "resume":
        return { output: resumeOutput };
      case "skills": {
        const list = data.skills.flatMap((s) => s.items).slice(0, 12).join(", ");
        return {
          output: (
            <div>
              <p className="text-ink-faint mb-1">{t.contact.skillsIntro}</p>
              <p>{list}…</p>
            </div>
          ),
        };
      }
      case "projects": {
        const list = data.projects.map((p) => p.title);
        return {
          output: (
            <div>
              <p className="text-ink-faint mb-1">{t.contact.projectsIntro}</p>
              <ul className="list-none space-y-1">
                {list.map((title) => (
                  <li key={title}>— {title}</li>
                ))}
              </ul>
            </div>
          ),
        };
      }
      case "experience":
        return { output: <p>{t.contact.experienceSummary}</p> };
      case "clear":
        return { clear: true };
      case "ls":
        return {
          output: (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
              {["about.md", "experience.log", "ai-expertise/", "projects/", "skills.json", "certifications.log", "contact.sh"].map((f) => (
                <span key={f} className="text-ink-dim">
                  {f}
                </span>
              ))}
            </div>
          ),
        };
      default:
        if (raw.toLowerCase().startsWith("sudo")) {
          return { output: <p>{t.contact.sudoJoke}</p> };
        }
        if (raw.toLowerCase().startsWith("echo ")) {
          return { output: <p>{raw.slice(5)}</p> };
        }
        return {
          output: (
            <p>
              {t.contact.notFoundPrefix} <span className="text-ink">{raw}</span> — {t.contact.notFoundHint}
            </p>
          ),
        };
    }
  }

  return (
    <section id="contact" className="relative section-pad bg-void-soft">
      <SectionCanvas opacity={0.32} camera={{ position: [0, 0.6, 8], fov: 50 }}>
        <PerspectiveFloor />
      </SectionCanvas>
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8">
        <SectionHeader id="contact" tag={t.contact.tag} title={t.contact.title} subtitle={t.contact.subtitle} />

        <Reveal>
          <InteractiveTerminal
            title={t.contact.terminalTitle}
            promptName={t.contact.terminalName}
            welcomeLine={t.contact.welcome}
            welcomeHint={t.contact.welcomeHint}
            placeholder={t.contact.inputPlaceholder}
            quickHint={t.contact.quickHint}
            quickCommands={["help", "contact", "resume", "skills", "clear"]}
            onCommand={handleCommand}
          />
        </Reveal>
      </div>
    </section>
  );
}
