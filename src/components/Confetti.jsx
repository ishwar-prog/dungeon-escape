import { useMemo } from "react";

export default function Confetti({ fire }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1.2,
        color: ["#FFB800", "#F4C542", "#E8543E", "#5FAD65", "#8B5CF6", "#F5E6C8"][
          i % 6
        ],
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 8,
        shape: i % 3 === 0 ? "50%" : "3px",
      })),
    [fire]
  );
  if (!fire) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape,
            border: "2px solid #1A1023",
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
