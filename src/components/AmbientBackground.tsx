import { useMemo } from 'react';

type Props = {
  variant?: 'menu' | 'quiz' | 'gameover' | 'leaderboard';
};

export default function AmbientBackground({ variant = 'menu' }: Props) {
  const embers = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 1. Arka Plan Görseli (Yavaş Zoom Animasyonlu) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 animate-bg-zoom scale-105"
        style={{
          backgroundImage: `url('/got-bg.jpg')`,
          filter:
            variant === 'quiz'
              ? 'brightness(0.35) contrast(1.1) saturate(0.9)'
              : variant === 'gameover'
              ? 'brightness(0.3) contrast(1.2) hue-rotate(-10deg)'
              : variant === 'leaderboard'
              ? 'brightness(0.4) contrast(1.1)'
              : 'brightness(0.5) contrast(1.1)',
        }}
      />

      {/* 2. Karartma ve Vignette Katmanları (Metin Okunabilirliği İçin) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/80 opacity-90" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />

      {/* 3. Dinamik Renk Parlamaları */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background:
            variant === 'quiz'
              ? 'radial-gradient(circle at 50% 30%, rgba(230, 179, 34, 0.08) 0%, transparent 70%)'
              : variant === 'gameover'
              ? 'radial-gradient(circle at 50% 40%, rgba(180, 40, 40, 0.12) 0%, transparent 70%)'
              : variant === 'leaderboard'
              ? 'radial-gradient(circle at 50% 30%, rgba(100, 150, 200, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(230, 179, 34, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* 4. Uçuşan Altın Kıvılcımlar (Ember Particles) */}
      {embers.map((e) => (
        <div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: '-10px',
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: 'rgba(245, 207, 94, 0.85)',
            boxShadow: '0 0 8px #e6b322, 0 0 12px #f5cf5e',
            animation: `ember-float ${e.duration}s linear infinite ${e.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
