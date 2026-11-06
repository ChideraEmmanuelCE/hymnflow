export type Hymn = {
  id: string;
  title: string;
  author: string;
  description: string;
  key: string;
  timeSignature: string;
  bpm: number;
  category: string;
  totalBeats: number;
  progression: { beat: number; chord: string }[];
  beatExplanations: { beatRange: [number, number]; text: string }[];
  instruments: { name: string; role: string; chordShapes?: Record<string, string>; tips: string[] }[];
  lyrics: { section: string; lines: { text: string; chords?: string[] }[] }[];
};

const shapes = { G: "320003", C: "x32010", D: "xx0232", F: "133211", A: "x02220" };

function instruments(): Hymn["instruments"] {
  return [
    { name: "Guitar", role: "Chord accompaniment", chordShapes: shapes,
      tips: ["Strum gently on each downbeat, keeping a steady tempo.", "Hold each chord until the next highlighted change.", "Start slowly and increase speed as the progression becomes familiar."] },
    { name: "Piano", role: "Harmony and melody",
      tips: ["Use your left hand for root notes and your right for triads.", "Change harmony when the current chord indicator advances.", "Keep your touch even and let each phrase breathe."] }
  ];
}

export const hymns: Hymn[] = [
  {
    id: "amazing-grace",
    title: "Amazing Grace",
    author: "John Newton (1779)",
    description: "A timeless hymn of grace, gratitude, and hope. Learn a gentle accompaniment in G major.",
    key: "G major", timeSignature: "3/4", bpm: 78, category: "Grace", totalBeats: 32,
    progression: [{beat:0,chord:"G"},{beat:8,chord:"C"},{beat:12,chord:"G"},{beat:16,chord:"D"},{beat:20,chord:"G"},{beat:24,chord:"C"},{beat:28,chord:"G"}],
    beatExplanations: [
      {beatRange:[0,7],text:"Find the slow triple-meter pulse. Begin softly on G."},
      {beatRange:[8,15],text:"Move to C and return to G without interrupting the rhythm."},
      {beatRange:[16,23],text:"Use D to create a little tension, resolving back to G."},
      {beatRange:[24,31],text:"Shape the closing phrase gently and let the final G ring."}
    ],
    instruments: instruments(),
    lyrics: [{section:"Verse 1",lines:[
      {text:"Amazing grace! How sweet the sound",chords:["G","C"]},
      {text:"That saved a wretch like me!",chords:["G","D"]},
      {text:"I once was lost, but now am found;",chords:["G","C"]},
      {text:"Was blind, but now I see.",chords:["D","G"]}
    ]}]
  },
  {
    id: "joy-to-the-world",
    title: "Joy to the World",
    author: "Isaac Watts (1719)",
    description: "An uplifting Christmas hymn with a bright and confident accompaniment.",
    key:"D major",timeSignature:"4/4",bpm:104,category:"Christmas",totalBeats:32,
    progression:[{beat:0,chord:"D"},{beat:8,chord:"G"},{beat:12,chord:"D"},{beat:16,chord:"A"},{beat:20,chord:"D"},{beat:24,chord:"G"},{beat:28,chord:"D"}],
    beatExplanations:[
      {beatRange:[0,7],text:"Play the opening D with a joyful, steady four-beat pulse."},
      {beatRange:[8,15],text:"Change to G smoothly, then return to D."},
      {beatRange:[16,23],text:"A builds energy; resolve it confidently to D."},
      {beatRange:[24,31],text:"Finish with a ringing cadence and keep the final note clean."}
    ],
    instruments: instruments(),
    lyrics:[{section:"Verse 1",lines:[
      {text:"Joy to the world! The Lord is come;",chords:["D","G"]},
      {text:"Let earth receive her King;",chords:["D","A"]},
      {text:"Let every heart prepare Him room,",chords:["D","G"]},
      {text:"And heaven and nature sing.",chords:["A","D"]}
    ]}]
  },
  {
    id:"holy-holy-holy",
    title:"Holy, Holy, Holy",
    author:"Reginald Heber (1826)",
    description:"A majestic hymn of praise, suited to clear, measured chord changes.",
    key:"G major",timeSignature:"4/4",bpm:86,category:"Praise",totalBeats:32,
    progression:[{beat:0,chord:"G"},{beat:8,chord:"C"},{beat:12,chord:"G"},{beat:16,chord:"D"},{beat:20,chord:"G"},{beat:24,chord:"C"},{beat:28,chord:"G"}],
    beatExplanations:[
      {beatRange:[0,7],text:"Give each beat weight without rushing the hymn."},
      {beatRange:[8,15],text:"Move from G to C, keeping all notes balanced."},
      {beatRange:[16,23],text:"The D chord signals the approaching cadence; resolve softly."},
      {beatRange:[24,31],text:"Release the last chord together at the end of the phrase."}
    ],
    instruments:instruments(),
    lyrics:[{section:"Verse 1",lines:[
      {text:"Holy, holy, holy! Lord God Almighty!",chords:["G","C"]},
      {text:"Early in the morning our song shall rise to Thee;",chords:["G","D"]},
      {text:"Holy, holy, holy! Merciful and mighty!",chords:["G","C"]},
      {text:"God in three Persons, blessed Trinity!",chords:["D","G"]}
    ]}]
  }
];

export const getHymn = (id: string): Hymn | undefined => hymns.find((h) => h.id === id);
