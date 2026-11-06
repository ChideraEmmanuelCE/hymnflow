"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Hymn } from "@/data/hymns";
import ChordDiagram from "./ChordDiagram";
import DemoCharacter from "./DemoCharacter";

type Props = {
  hymn: Hymn;
};

export default function HymnPlayer({ hymn }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [activeInstrument, setActiveInstrument] = useState(0);
  const [showExplain, setShowExplain] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const msPerBeat = (60 / hymn.bpm) * 1000;

  const getCurrentChord = useCallback(() => {
    let chord = hymn.progression[0]?.chord || "G";
    for (const ev of hymn.progression) {
      if (ev.beat <= currentBeat) chord = ev.chord;
      else break;
    }
    return chord;
  }, [hymn.progression, currentBeat]);

  const getExplanation = useCallback(() => {
    return (
      hymn.beatExplanations.find(
        (e) => currentBeat >= e.beatRange[0] && currentBeat <= e.beatRange[1]
      )?.text || "Follow the chord changes and keep a steady pulse."
    );
  }, [hymn.beatExplanations, currentBeat]);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    startTimeRef.current = Date.now() - currentBeat * msPerBeat;
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const beat = Math.floor(elapsed / msPerBeat);
      if (beat >= hymn.totalBeats) {
        setIsPlaying(false);
        setCurrentBeat(0);
        return;
      }
      setCurrentBeat(beat);
    }, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, msPerBeat, hymn.totalBeats]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const reset = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  const progress = (currentBeat / hymn.totalBeats) * 100;
  const currentChord = getCurrentChord();
  const instrument = hymn.instruments[activeInstrument];
  const shape = instrument?.chordShapes?.[currentChord];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition">
            <span className="text-lg">♪</span>
            <span className="font-semibold tracking-tight">HymnFlow</span>
          </a>
          <div className="text-xs text-slate-400">
            {hymn.key} · {hymn.timeSignature} · {hymn.bpm} BPM
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{hymn.title}</h1>
            <p className="text-slate-400 mt-1">{hymn.author}</p>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-prose">{hymn.description}</p>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/60 p-4 shadow-xl">
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button onClick={reset} className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 transition text-sm" aria-label="Reset">⏮</button>
                <button onClick={togglePlay} className="p-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20 text-lg font-bold w-12 h-12 flex items-center justify-center" aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? "❚❚" : "▶"}
                </button>
              </div>
              <div className="font-mono text-sm text-slate-400">Beat {currentBeat} / {hymn.totalBeats}</div>
              <div className="text-xs text-slate-500">Visual metronome</div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-5 space-y-6">
            {hymn.lyrics.map((sec) => (
              <div key={sec.section}>
                <h3 className="text-xs uppercase tracking-widest text-amber-500/80 mb-3">{sec.section}</h3>
                <div className="space-y-3">
                  {sec.lines.map((line, i) => (
                    <div key={i}>
                      {line.chords && (
                        <div className="flex gap-6 mb-0.5 text-amber-300/90 font-mono text-xs font-medium">
                          {line.chords.map((c, ci) => (
                            <span key={ci} className={c === currentChord && isPlaying ? "text-amber-200" : ""}>{c}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-slate-200 text-lg leading-snug">{line.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="flex gap-2 flex-wrap">
            {hymn.instruments.map((inst, idx) => (
              <button key={inst.name} onClick={() => setActiveInstrument(idx)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${activeInstrument === idx ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500"}`}>
                {inst.name}
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700/50 p-5 flex flex-col items-center">
            <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">Now playing · {instrument?.name}</div>
            <ChordDiagram chord={currentChord} shape={shape} size="lg" />
            <DemoCharacter currentChord={currentChord} isPlaying={isPlaying} tip={instrument?.tips[0]} />
          </div>

          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4">
            <h4 className="text-sm font-semibold text-amber-300 mb-2">{instrument?.name} · {instrument?.role}</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {instrument?.tips.map((t, i) => (
                <li key={i} className="flex gap-2"><span className="text-amber-500/70">•</span><span>{t}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-indigo-950/40 border border-indigo-800/40 p-4">
            <button onClick={() => setShowExplain((s) => !s)} className="text-xs uppercase tracking-widest text-indigo-300 mb-2">
              Beat-by-beat guide {showExplain ? "▾" : "▸"}
            </button>
            {showExplain && <p className="text-sm text-slate-300 leading-relaxed">{getExplanation()}</p>}
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-600">
        HymnFlow · Interactive hymn pocketbook · Public domain texts
      </footer>
    </div>
  );
}
