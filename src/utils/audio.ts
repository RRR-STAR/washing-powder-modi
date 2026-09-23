/**
 * Sound synthesis engine using standard Web Audio API.
 * Provides highly laughable and enjoyable cartoon sound effects:
 * - High-energy Indian Dholak Bhangra groove (inspired by Modi playing the drums)
 * - Comical spring "Boing!" sound
 * - Cartoon giggle / chuckle synthesis
 * - Comical Wah-Wah brass horn
 * - Squeaky rubber duck laugh
 * - Washing Powder Modi jingle melody hook
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
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(950 + Math.random() * 250, now + 0.05);

      gain.gain.setValueAtTime(0.2, now);
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
   * Plays a single Indian Dholak drum strike with authentic pitch bend (Ghe/Dhama/Ta).
   */
  public playDrumBeat(type: 'bass' | 'slap' | 'bendy' = 'bass') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === 'bass') {
        // Deep resonant Dhol bass (Dhama)
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(160, now);
        bassOsc.frequency.exponentialRampToValueAtTime(50, now + 0.18);

        bassGain.gain.setValueAtTime(0.45, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.22);
      } else if (type === 'bendy') {
        // Laughable sliding Baya / Dholak pressure slide ("GHEEEEE-up!")
        const bendOsc = this.ctx.createOscillator();
        const bendGain = this.ctx.createGain();
        bendOsc.type = 'sine';
        bendOsc.frequency.setValueAtTime(65, now);
        bendOsc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
        bendOsc.frequency.exponentialRampToValueAtTime(80, now + 0.24);

        bendGain.gain.setValueAtTime(0.4, now);
        bendGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        bendOsc.connect(bendGain);
        bendGain.connect(this.ctx.destination);
        bendOsc.start(now);
        bendOsc.stop(now + 0.25);
      } else {
        // Sharp metallic Tasha / Slap (Ta)
        const slapOsc = this.ctx.createOscillator();
        const slapGain = this.ctx.createGain();
        slapOsc.type = 'square';
        slapOsc.frequency.setValueAtTime(360, now);
        slapOsc.frequency.exponentialRampToValueAtTime(190, now + 0.1);

        slapGain.gain.setValueAtTime(0.18, now);
        slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        slapOsc.connect(slapGain);
        slapGain.connect(this.ctx.destination);
        slapOsc.start(now);
        slapOsc.stop(now + 0.16);
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Laughable high-energy Dholak groove:
   * "Dha-dhin-dha, taka-taka-dha, Ghe-ghe-ghe... BOING!"
   * Guaranteed to bring a big smile!
   */
  public playLaughableModiGroove() {
    if (this.isMuted) return;
    const rhythm = [
      { delay: 0, type: 'bass' as const },
      { delay: 110, type: 'slap' as const },
      { delay: 200, type: 'bendy' as const },
      { delay: 310, type: 'slap' as const },
      { delay: 390, type: 'slap' as const },
      { delay: 470, type: 'bass' as const },
      { delay: 580, type: 'bendy' as const },
      { delay: 680, type: 'slap' as const },
      { delay: 780, type: 'bass' as const },
    ];

    rhythm.forEach((beat) => {
      setTimeout(() => {
        this.playDrumBeat(beat.type);
      }, beat.delay);
    });

    // End with a funny cartoon spring boing!
    setTimeout(() => {
      this.playCartoonSpring();
    }, 880);
  }

  /**
   * Original drum pattern alias for compatibility, now boosted with laughable groove!
   */
  public playDrumPattern() {
    this.playLaughableModiGroove();
  }

  /**
   * Comical cartoon spring twang ("B-O-I-N-G-G-G!").
   */
  public playCartoonSpring() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch sweeps upward with rapid vibrato like a spring
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.28);

      // Add spring oscillation wobbling
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(28, now); // 28Hz wobble
      lfoGain.gain.setValueAtTime(45, now);
      lfo.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + 0.35);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Ignore
    }
  }

  /**
   * Hilarious cartoon chuckle / laughter ("He-he-he-he!").
   * Synthesizes 4 rhythmic laughing pulses with vocal formant-like filtering!
   */
  public playCartoonChuckle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const pulses = [0, 110, 220, 330];
      const baseFreqs = [560, 530, 500, 460];

      pulses.forEach((offsetMs, i) => {
        setTimeout(() => {
          if (!this.ctx || this.isMuted) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(baseFreqs[i], now);
          osc.frequency.exponentialRampToValueAtTime(baseFreqs[i] * 0.8, now + 0.08);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1400, now);
          filter.Q.setValueAtTime(4, now);

          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.09);
        }, offsetMs);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Comical Wah-Wah Brass Horn ("Waa-waa-waa-waaah!").
   */
  public playWahWahHorn() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [
        { freq: 392.00, start: 0, dur: 0.18 }, // G4
        { freq: 369.99, start: 0.2, dur: 0.18 }, // F#4
        { freq: 349.23, start: 0.4, dur: 0.18 }, // F4
        { freq: 329.63, start: 0.6, dur: 0.45 }, // E4 (long slide down)
      ];

      const now = this.ctx.currentTime;

      notes.forEach((n) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.freq, now + n.start);
        if (n.start === 0.6) {
          osc.frequency.linearRampToValueAtTime(260, now + n.start + n.dur);
        }

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(n.freq * 2.5, now + n.start);
        filter.Q.setValueAtTime(5, now + n.start);

        gain.gain.setValueAtTime(0.2, now + n.start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Plays the famous catchy melody hook of "Washing Powder Nirma / Washing Powder Modi"!
   * (E-E-D#-E-F#-E, D#-E-F#... "Washing Powder Modi, Washing Powder Modi!")
   */
  public playModiWashingJingleTune() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Notes for the bouncy jingle melody
      const melody = [
        { note: 523.25, dur: 0.14, pause: 0 },    // C5 (Wash-)
        { note: 587.33, dur: 0.14, pause: 0.15 }, // D5 (-ing)
        { note: 659.25, dur: 0.22, pause: 0.30 }, // E5 (Pow-)
        { note: 523.25, dur: 0.26, pause: 0.54 }, // C5 (-der)
        { note: 783.99, dur: 0.35, pause: 0.82 }, // G5 (MO-)
        { note: 659.25, dur: 0.45, pause: 1.18 }, // E5 (-DI!)
      ];

      const now = this.ctx.currentTime;

      melody.forEach((m) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(m.note, now + m.pause);

        gain.gain.setValueAtTime(0.25, now + m.pause);
        gain.gain.exponentialRampToValueAtTime(0.001, now + m.pause + m.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + m.pause);
        osc.stop(now + m.pause + m.dur);
      });

      // Also trigger dholak beat in sync with "MO-DI!"
      setTimeout(() => {
        this.playDrumBeat('bass');
      }, 820);
      setTimeout(() => {
        this.playDrumBeat('bendy');
      }, 1180);
    } catch {
      // Ignore
    }
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

        gain.gain.setValueAtTime(0.25, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });

      setTimeout(() => {
        this.playCartoonSpring();
      }, 450);
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

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
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

