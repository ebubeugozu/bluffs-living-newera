/**
 * Subtle procedural nature ambiance synthesizer using Web Audio API
 * Generates soft rushing river water and gentle distant songbird tones without external audio files.
 */
class NatureAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private riverGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private birdInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public start() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isRunning = true;

    // Create pink noise for rushing Tennessee River water
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Lowpass filter for water depth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, this.ctx.currentTime);

    this.riverGain = this.ctx.createGain();
    this.riverGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.noiseNode.connect(filter);
    filter.connect(this.riverGain);
    this.riverGain.connect(this.masterGain);

    this.noiseNode.start();

    // Fade in
    this.masterGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 1.5);

    // Random periodic gentle bird tweet
    this.birdInterval = window.setInterval(() => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.4) {
        this.playSoftChirp();
      }
    }, 4500);
  }

  private playSoftChirp() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const chirpGain = this.ctx.createGain();

    const baseFreq = 2200 + Math.random() * 800;
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 350, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 150, now + 0.18);

    chirpGain.gain.setValueAtTime(0.0001, now);
    chirpGain.gain.linearRampToValueAtTime(0.04, now + 0.05);
    chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(chirpGain);
    chirpGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
    setTimeout(() => {
      if (this.noiseNode) {
        try { this.noiseNode.stop(); } catch { /* ignore */ }
        this.noiseNode.disconnect();
      }
      if (this.birdInterval) {
        clearInterval(this.birdInterval);
        this.birdInterval = null;
      }
      this.isRunning = false;
    }, 1100);
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const natureAudio = new NatureAudioEngine();
