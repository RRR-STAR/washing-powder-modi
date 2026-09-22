/**
 * Sound synthesis engine using standard Web Audio API.
 * Provides playful cartoon sound effects:
 * - Drum beats (inspired by the Modi drum playing in the video)
 * - Bubble popping
 * - Clean chit victory fanfare
 * - Washing machine agitation sound
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a cartoon bubble pop effect when clicking items or selecting options.
   */
  public playBubblePop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      // Quick pitch rise then drop
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 200, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore audio context errors if browser policies block before interaction
    }
  }

  /**
   * Plays simulated Indian Dholak drum beats matching Modi's drum scenes in the video.
   */
  public playDrumBeat() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // Low bass thud (Dhama)
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(140, now);
      bassOsc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

      bassGain.gain.setValueAtTime(0.35, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.18);

      // Higher sharp slap (Ta/Tee)
      const slapOsc = this.ctx.createOscillator();
      const slapGain = this.ctx.createGain();
      slapOsc.type = 'square';
      slapOsc.frequency.setValueAtTime(320, now + 0.08);
      slapOsc.frequency.exponentialRampToValueAtTime(180, now + 0.16);

      slapGain.gain.setValueAtTime(0.12, now + 0.08);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      slapOsc.connect(slapGain);
      slapGain.connect(this.ctx.destination);
      slapOsc.start(now + 0.08);
      slapOsc.stop(now + 0.22);
    } catch {
      // Ignore audio error
    }
  }

  /**
   * Plays a sequence of energetic Modi drum beats (3 in a row).
   */
  public playDrumPattern() {
    this.playDrumBeat();
    setTimeout(() => this.playDrumBeat(), 160);
    setTimeout(() => this.playDrumBeat(), 320);
  }

  /**
   * Plays a cartoon clean-chit celebration chime & victory sound on payment success.
   */
  public playVictoryChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Washing machine sound effect (rumble & water agitate).
   */
  public playWashingSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.4);
      osc.frequency.linearRampToValueAtTime(70, now + 0.8);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine();
