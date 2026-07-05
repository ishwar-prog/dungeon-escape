import { useMemo } from "react";

export function Torch({ side }) {
  return (
    <div className={`torch torch-${side}`} aria-hidden="true">
      <div className="torch-flame">
        <div className="flame-core" />
        <div className="flame-glow" />
      </div>
      <div className="torch-stick" />
    </div>
  );
}

export function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 2 + Math.random() * 3,
      })),
    []
  );
  return (
    <div className="particle-field" aria-hidden="true">
      {dots.map((d) => (
        <div
          key={d.id}
          className="particle-dot"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
