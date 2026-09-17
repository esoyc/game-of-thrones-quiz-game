import { useMemo } from 'react';

type Props = {
  variant?: 'menu' | 'quiz' | 'gameover' | 'leaderboard';
};

export default function AmbientBackground({ variant = 'menu' }: Props) {
  const embers = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  const glowColor =
    variant === 'quiz'
      ? 'rgba(180, 50, 30, 0.15)'
      : variant === 'gameover'
      ? 'rgba(230, 179, 34, 0.18)'
      : variant === 'leaderboard'
      ? 'rgba(100, 150, 200, 0.12)'
      : 'rgba(230, 179, 34, 0.12)';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #1a1a22 0%, #0a0a0c 60%), radial-gradient(ellipse at 50% 100%, #12121a 0%, transparent 70%)',
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] rounded-full blur-[120px]"
        style={{
          background: glowColor,
          animation: 'ambient-glow 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vh] rounded-full blur-[120px]"
        style={{
          background: 'rgba(230, 179, 34, 0.08)',
          animation: 'ambient-glow 10s ease-in-out infinite 2s',
        }}
      />

      {/* Floating embers */}
      {embers.map((e) => (
        <div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: '-10px',
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: 'rgba(230, 179, 34, 0.7)',
            boxShadow: '0 0 6px rgba(230, 179, 34, 0.6)',
            animation: `ember-float ${e.duration}s linear infinite ${e.delay}s`,
          }}
        />
      ))}

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
