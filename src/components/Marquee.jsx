export default function Marquee({ items = [], className = "" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono-tag text-sm md:text-base px-6 flex items-center gap-6 text-ink-faint whitespace-nowrap"
          >
            {item}
            <span className="text-lime-400/60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
