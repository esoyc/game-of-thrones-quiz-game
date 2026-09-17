import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Home } from 'lucide-react';

type Props = {
  score: number;
  answered: number;
  total: number;
  onHome: () => void;
  onLeaderboard: () => void;
};

export default function GameOverScreen({
  score,
  answered,
  total,
  onHome,
}: Props) {
  const getRank = (sc: number) => {
    if (sc >= 1500) return { title: 'Yedi Krallığın Hükümdarı', color: '#e6b322', description: 'Westeros senin önünde diz çöküyor.' };
    if (sc >= 800) return { title: 'Kral Eli', color: '#c49a3f', description: 'Büyük bir stratejistsin.' };
    return { title: 'Köylü', color: '#7a7a7a', description: 'Yedi Krallıkta yolun başındasın.' };
  };

  const rank = getRank(score);
  const calculatedCorrect = Math.round((score + answered * 25) / 125);
  const correct = answered > 0 ? Math.max(0, calculatedCorrect) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="glass-panel rounded-2xl p-8 sm:p-10 max-w-md w-full text-center">
        <Crown size={48} strokeWidth={1.2} className="mx-auto mb-4" style={{ color: rank.color }} />
        <p className="text-xs tracking-[0.3em] text-[#7a7a7a] uppercase mb-2">Oyun Bitti</p>
        <h2 className="font-display text-3xl font-bold mb-1" style={{ color: rank.color }}>
          {rank.title}
        </h2>
        <p className="text-sm text-[#9a9a9a] mb-6">{rank.description}</p>

        <div className="text-5xl font-display font-bold gold-text mb-2">{score}</div>
        <div className="text-xs tracking-widest text-[#7a7a7a] uppercase mb-6">Toplam Skor</div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-[#14141a] rounded-lg p-3 border border-[#2a2a30]">
            <div className="font-display text-xl text-[#e6b322]">{answered}</div>
            <div className="text-[9px] tracking-widest text-[#7a7a7a] uppercase mt-1">Cevaplanan</div>
          </div>
          <div className="bg-[#14141a] rounded-lg p-3 border border-[#2a2a30]">
            <div className="font-display text-xl text-green-500">{correct}</div>
            <div className="text-[9px] tracking-widest text-[#7a7a7a] uppercase mt-1">Doğru</div>
          </div>
          <div className="bg-[#14141a] rounded-lg p-3 border border-[#2a2a30]">
            <div className="font-display text-xl text-[#7a7a7a]">{total}</div>
            <div className="text-[9px] tracking-widest text-[#7a7a7a] uppercase mt-1">Toplam</div>
          </div>
        </div>

        <button
          onClick={onHome}
          className="btn-gold rounded-lg py-3 px-4 w-full flex items-center justify-center gap-2 text-xs"
        >
          <Home size={16} />
          Ana Menü
        </button>
      </div>
    </motion.div>
  );
}