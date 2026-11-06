"use client";

import { useEffect, useState } from "react";

type Props = {
  currentChord: string;
  isPlaying: boolean;
  tip?: string;
};

export default function DemoCharacter({ currentChord, isPlaying, tip }: Props) {
  const [pose, setPose] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setPose((p) => (p + 1) % 4), 600);
    return () => clearInterval(id);
  }, [isPlaying]);

  const armRotate = isPlaying ? (pose % 2 === 0 ? -12 : 8) : 0;
  const headTilt = isPlaying ? (pose % 2 === 0 ? 3 : -2) : 0;

  return (
    <div className="relative flex flex-col items-center justify-end h-64 w-full max-w-xs mx-auto">
      <div className="absolute bottom-0 w-40 h-8 bg-amber-400/20 blur-xl rounded-full" />
      <div
        className="relative transition-transform duration-500 ease-out"
        style={{ transform: `rotate(${headTilt}deg)` }}
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-300 shadow-lg relative">
          <div className="absolute top-5 left-3 w-2.5 h-2.5 rounded-full bg-slate-800" />
          <div className="absolute top-5 right-3 w-2.5 h-2.5 rounded-full bg-slate-800" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-2 border-b-2 border-slate-700 rounded-full" />
        </div>
        <div className="w-20 h-24 mx-auto mt-1 rounded-2xl bg-gradient-to-b from-indigo-600 to-indigo-800 border border-indigo-400/40 shadow-xl relative">
          <div className="absolute -right-6 top-6 w-14 h-10 rounded-full bg-amber-700/80 border border-amber-500/50 rotate-12" />
          <div className="absolute -right-3 top-8 w-8 h-3 bg-amber-900/60 rounded" />
        </div>
        <div
          className="absolute top-16 left-0 w-8 h-3 bg-amber-200 rounded-full origin-right transition-transform duration-300"
          style={{ transform: `rotate(${armRotate}deg)` }}
        />
        <div
          className="absolute top-16 right-0 w-8 h-3 bg-amber-200 rounded-full origin-left transition-transform duration-300"
          style={{ transform: `rotate(${-armRotate * 0.7}deg)` }}
        />
      </div>
      <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-300 font-mono text-lg font-bold tracking-widest shadow-lg">
        {currentChord || "—"}
      </div>
      {tip && (
        <div className="mt-3 max-w-[220px] text-center text-xs text-slate-300 bg-slate-800/70 px-3 py-2 rounded-xl border border-slate-600/50">
          {tip}
        </div>
      )}
    </div>
  );
}
