import Link from "next/link";
import { hymns } from "@/data/hymns";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-12 relative">
          <div className="flex items-center gap-2 text-amber-400 mb-4">
            <span className="text-2xl">♪</span>
            <span className="font-semibold tracking-wide text-lg">HymnFlow</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Your interactive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              hymn pocketbook
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-400 max-w-xl leading-relaxed">
            Chords, lyrics, beat-by-beat guidance, and a live demonstration character —
            everything you need to play the great hymns with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
              🎸 Guitar &amp; Piano diagrams
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
              📖 Beat-by-beat explanations
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
              ✨ Live demo character
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-6">
          Choose a hymn
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {hymns.map((h) => (
            <Link
              key={h.id}
              href={`/song/${h.id}`}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 p-5 transition-all hover:bg-slate-900/90 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-200 transition">
                    {h.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">{h.author}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                  {h.key}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                {h.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                <span>{h.timeSignature}</span>
                <span>·</span>
                <span>{h.bpm} BPM</span>
                <span>·</span>
                <span className="text-amber-500/80">{h.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-800/60 py-8 text-center text-xs text-slate-600">
        HymnFlow · Built for worship musicians · Public domain hymns
      </footer>
    </div>
  );
}
