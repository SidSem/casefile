// Web Audio API procedural sound engine - 100% self-contained & offline-ready

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientOscillator1: OscillatorNode | null = null;
  private ambientOscillator2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isAmbientPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // --- AMBIENT DRONE (Dark noir classified tension) ---
  public startAmbientDrone(volume = 0.3) {
    if (this.isAmbientPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(volume, now);
      this.masterGain.connect(this.ctx.destination);

      // Low frequency dark drone (48Hz and 55Hz detuned binaural beat)
      this.ambientOscillator1 = this.ctx.createOscillator();
      this.ambientOscillator2 = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOscillator1.type = 'sine';
      this.ambientOscillator1.frequency.setValueAtTime(48, now); // Low G# / A sub-bass

      this.ambientOscillator2.type = 'triangle';
      this.ambientOscillator2.frequency.setValueAtTime(51.5, now); // Gentle slow beating

      // Warm low-pass filter to sound like an old reel-to-reel tape hum
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);

      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.4), now + 3);

      this.ambientOscillator1.connect(filter);
      this.ambientOscillator2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      this.ambientOscillator1.start();
      this.ambientOscillator2.start();

      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn('AudioEngine ambient error:', e);
    }
  }

  public stopAmbientDrone() {
    if (!this.isAmbientPlaying || !this.ctx) return;
    try {
      if (this.ambientGain) {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          try {
            this.ambientOscillator1?.stop();
            this.ambientOscillator2?.stop();
            this.ambientOscillator1?.disconnect();
            this.ambientOscillator2?.disconnect();
            this.ambientGain?.disconnect();
          } catch {
            // Already cleaned
          }
          this.isAmbientPlaying = false;
        }, 1300);
      } else {
        this.isAmbientPlaying = false;
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public setAmbientVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0.001, vol), this.ctx.currentTime);
    }
  }

  // --- PROCEDURAL SOUND EFFECTS ---

  // Typewriter Key Clack
  public playTypewriterKey() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Burst of high-frequency filtered noise for the mechanical mechanical hammer click
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800 + Math.random() * 600, now);
      filter.Q.setValueAtTime(3, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch {
      // Audio autoplay restrictions or context error
    }
  }

  // Classified Stamp Thud
  public playStampThud() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Heavy resonant desk impact
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.15);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Context not ready
    }
  }

  // Tactical Terminal Beep / Keypress
  public playTerminalChirp(pitch = 880) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(pitch, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Ignore
    }
  }

  // Evidence Connection String Pluck
  public playStringPluck() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // Ignore
    }
  }

  // Camera Shutter / Forensic Photo Click
  public playCameraShutter() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore
    }
  }

  // Tape Recorder Click (Interrogation mechanic)
  public playTapeRecorderClick() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore
    }
  }

  // Contradiction Revealed / Eureka Tension Stinger
  public playContradictionStinger() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Minor 2nd dissonance for high drama revelation
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(349.23, now); // F4
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(369.99, now); // F#4

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.8);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.95);
      osc2.stop(now + 0.95);
    } catch {
      // Ignore
    }
  }
}

export const audioEngine = new SoundEngine();
