// Web Audio API Context
const getAudioContext = () => {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  return new AudioCtx();
};

// Doğru Cevap Sesi (Yükselen Çift Ton)
export const playCorrectSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.error('Ses çalınamadı:', e);
  }
};

// Yanlış Cevap Sesi (Düşük Bas Tonu)
export const playWrongSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(164.81, now); // E3
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25); // A2

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.error('Ses çalınamadı:', e);
  }
};
