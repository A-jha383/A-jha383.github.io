import { useEffect, useRef, useState } from "react";

function useTypedLine(text, speed = 22) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped("");
    if (!text) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return typed;
}

export default function InteractiveTerminal({
  title,
  promptName,
  welcomeLine,
  welcomeHint,
  placeholder,
  quickHint,
  quickCommands = [],
  onCommand,
}) {
  const [log, setLog] = useState([]);
  const [value, setValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histPointer, setHistPointer] = useState(-1);
  const [bootDone, setBootDone] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const typedWelcome = useTypedLine(welcomeLine, 18);

  useEffect(() => {
    if (typedWelcome === welcomeLine && welcomeLine) {
      const t = setTimeout(() => setBootDone(true), 200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [typedWelcome, welcomeLine]);

  // Scroll only the terminal's own output area — never the page. Using
  // scrollTop directly (instead of scrollIntoView) avoids the browser
  // bubbling the scroll request up to the document when the inner panel
  // isn't yet overflowing (e.g. during the boot-typing animation), which
  // was previously yanking the whole page down to the Contact section.
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, typedWelcome]);

  function focusInput() {
    inputRef.current?.focus();
  }

  function runCommand(raw) {
    const trimmed = raw.trim();
    setLog((l) => [...l, { type: "input", text: raw }]);
    if (trimmed) {
      setCmdHistory((h) => [...h, raw]);
    }
    setHistPointer(-1);

    const result = onCommand ? onCommand(trimmed) : null;
    if (result?.clear) {
      setLog([]);
      return;
    }
    if (result?.output) {
      setLog((l) => [...l, { type: "output", node: result.output }]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    runCommand(value);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const nextPointer = histPointer === -1 ? cmdHistory.length - 1 : Math.max(0, histPointer - 1);
      setHistPointer(nextPointer);
      setValue(cmdHistory[nextPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histPointer === -1) return;
      const nextPointer = histPointer + 1;
      if (nextPointer >= cmdHistory.length) {
        setHistPointer(-1);
        setValue("");
      } else {
        setHistPointer(nextPointer);
        setValue(cmdHistory[nextPointer]);
      }
    }
  }

  function runQuick(cmd) {
    runCommand(cmd);
    focusInput();
  }

  return (
    <div className="panel bracket overflow-hidden" onClick={focusInput}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c72]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffb454]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#6fb7ff]/70" />
        <span className="ml-2 font-mono-tag text-[11px] text-ink-faint">{title}</span>
      </div>

      <div className="p-5 md:p-7 font-mono-tag text-[13px] md:text-[14px] leading-relaxed">
        <div ref={scrollAreaRef} className="max-h-[360px] overflow-y-auto pr-1">
          <div className="mb-4">
            <p className="text-ink-dim">
              {typedWelcome}
              {typedWelcome.length < (welcomeLine?.length ?? 0) && (
                <span className="inline-block w-[7px] h-[1em] bg-lime-400 ml-0.5 align-middle animate-pulse" />
              )}
            </p>
            {bootDone && welcomeHint && <p className="text-ink-faint mt-1">{welcomeHint}</p>}
          </div>

          {bootDone &&
            log.map((entry, i) =>
              entry.type === "input" ? (
                <div key={i} className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-signal">{promptName}</span>
                  <span className="text-ink-faint">$</span>
                  <span className="text-ink">{entry.text || " "}</span>
                </div>
              ) : (
                <div key={i} className="mt-2 pl-0 sm:pl-4 text-ink-dim">
                  {entry.node}
                </div>
              )
            )}

          {bootDone && (
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-signal">{promptName}</span>
              <span className="text-ink-faint">$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="flex-1 min-w-[80px] bg-transparent outline-none text-ink placeholder:text-ink-faint caret-lime-400"
                aria-label="terminal command input"
              />
            </form>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {bootDone && quickCommands.length > 0 && (
        <div className="px-5 md:px-7 pb-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="text-ink-faint text-[11px] font-mono-tag uppercase tracking-wide mr-1">
            {quickHint}
          </span>
          {quickCommands.map((c) => (
            <button
              key={c}
              type="button"
              data-cursor-hover
              onClick={(e) => {
                e.stopPropagation();
                runQuick(c);
              }}
              className="pill hover:border-lime hover:text-signal transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
