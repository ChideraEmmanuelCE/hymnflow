"use client";

type Props = {
  chord: string;
  shape?: string;
  size?: "sm" | "md" | "lg";
};

const FINGER_MAP: Record<string, number[]> = {
  "320003": [3, 2, 0, 0, 0, 3],
  x32010: [0, 3, 2, 0, 1, 0],
  xx0232: [0, 0, 0, 2, 3, 2],
  "133211": [1, 3, 3, 2, 1, 1],
  x02220: [0, 0, 2, 2, 2, 0],
};

export default function ChordDiagram({ chord, shape, size = "md" }: Props) {
  const frets = shape
    ? shape.split("").map((c) => (c === "x" || c === "X" ? -1 : parseInt(c, 10) || 0))
    : FINGER_MAP[shape || ""] || [0, 0, 0, 0, 0, 0];

  const dims = {
    sm: { w: 56, h: 72, stringGap: 8, fretH: 10 },
    md: { w: 80, h: 100, stringGap: 12, fretH: 14 },
    lg: { w: 110, h: 140, stringGap: 16, fretH: 18 },
  }[size];

  const strings = 6;
  const startX = 10;
  const startY = 18;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-sm font-bold tracking-wide text-amber-200">{chord}</span>
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        className="drop-shadow-sm"
      >
        <rect
          x={startX - 2}
          y={startY - 3}
          width={(strings - 1) * dims.stringGap + 4}
          height={4}
          fill="#e2e8f0"
          rx={1}
        />
        {[1, 2, 3, 4].map((f) => (
          <line
            key={f}
            x1={startX}
            y1={startY + f * dims.fretH}
            x2={startX + (strings - 1) * dims.stringGap}
            y2={startY + f * dims.fretH}
            stroke="#64748b"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: strings }).map((_, i) => (
          <line
            key={i}
            x1={startX + i * dims.stringGap}
            y1={startY}
            x2={startX + i * dims.stringGap}
            y2={startY + 4 * dims.fretH}
            stroke="#94a3b8"
            strokeWidth={1.2}
          />
        ))}
        {frets.map((fret, i) => {
          const x = startX + i * dims.stringGap;
          if (fret === -1) {
            return (
              <text
                key={i}
                x={x}
                y={startY - 8}
                textAnchor="middle"
                fontSize={10}
                fill="#f87171"
                fontWeight="bold"
              >
                ×
              </text>
            );
          }
          if (fret === 0) {
            return (
              <circle
                key={i}
                cx={x}
                cy={startY - 8}
                r={4}
                fill="none"
                stroke="#a3e635"
                strokeWidth={1.5}
              />
            );
          }
          return (
            <circle
              key={i}
              cx={x}
              cy={startY + (fret - 0.5) * dims.fretH}
              r={5.5}
              fill="#fbbf24"
              stroke="#78350f"
              strokeWidth={1}
            />
          );
        })}
      </svg>
    </div>
  );
}
