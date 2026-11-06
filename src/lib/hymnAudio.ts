/** Web Audio synthesizer: starts only after the user's Play tap (iOS compatible). */
export type InstrumentName = "Guitar" | "Piano";
const CHORD_NOTES: Record<string, readonly [number,number,number]> = {
  G: [55,59,62], C: [60,64,67], D: [62,66,69], A: [57,61,64],
  F: [53,57,60], E: [52,56,59], Am: [57,60,64], Em: [52,55,59]
};
const frequency = (note: number) => 440 * 2 ** ((note-69)/12);

export class HymnAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private active = new Set<OscillatorNode>();
  async unlock(): Promise<void> {
    if (typeof window === "undefined" || !window.AudioContext) throw new Error("Web Audio is not available in this browser.");
    if (!this.ctx) {
      this.ctx = new AudioContext({latencyHint:"interactive"});
      this.master = this.ctx.createGain();
      this.master.gain.value = .52;
      this.master.connect(this.ctx.destination);
    }
    // resume() is called from the Play click, not automatically on page load.
    if (this.ctx.state !== "running") await this.ctx.resume();
    if (this.ctx.state !== "running") throw new Error("Sound is blocked. Please tap Play again.");
  }
  setVolume(value: number) {
    if (!this.ctx || !this.master) return;
    this.master.gain.setTargetAtTime(Math.max(0, Math.min(1,value/100))*.7, this.ctx.currentTime, .03);
  }
  beat(index: number, chord: string, instrument: InstrumentName, meter: number, metronome: boolean) {
    if (!this.ctx || this.ctx.state !== "running") return;
    const t=this.ctx.currentTime+.008;
    const notes=CHORD_NOTES[chord] || CHORD_NOTES.G;
    const downbeat=index % meter===0;
    if (metronome) this.note(downbeat?87:83,t,.05,.03,"click");
    if (instrument==="Guitar") {
      if (downbeat || index % 4 === 0) notes.forEach((n,i)=>this.note(n,t+i*.042,.9,.17,"guitar"));
      else this.note(notes[index%3],t,.68,.23,"guitar");
    } else {
      if (downbeat) {
        this.note(notes[0]-12,t,1.2,.16,"piano");
        notes.forEach((n,i)=>this.note(n,t+i*.018,1.15,.11,"piano"));
      } else {
        this.note(notes[index%3],t,.9,.17,"piano");
        this.note(notes[0]-12,t,.65,.07,"piano");
      }
    }
  }
  private note(midi:number, t:number, length:number, strength:number, style:"click"|"guitar"|"piano") {
    if (!this.ctx || !this.master) return;
    const osc=this.ctx.createOscillator(),env=this.ctx.createGain();
    osc.type=style==="guitar"?"triangle":"sine";
    osc.frequency.setValueAtTime(frequency(midi),t);
    env.gain.setValueAtTime(.0001,t);
    env.gain.exponentialRampToValueAtTime(strength,t+(style==="piano"?.01:.004));
    env.gain.exponentialRampToValueAtTime(.0001,t+length);
    osc.connect(env); env.connect(this.master);
    osc.onended=()=>{this.active.delete(osc);osc.disconnect();env.disconnect();};
    this.active.add(osc);
    osc.start(t);osc.stop(t+length+.02);
  }
  stop() { for (const osc of [...this.active]) {try{osc.stop();}catch{}} this.active.clear(); }
  dispose() {this.stop(); if(this.ctx && this.ctx.state!=="closed")void this.ctx.close();this.ctx=null;this.master=null;}
}
