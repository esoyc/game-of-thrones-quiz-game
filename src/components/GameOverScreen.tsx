import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Home, Trophy, Send, Check } from 'lucide-react';

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
  onLeaderboard,
}: Props) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getRank = (sc: number) => {
    if (sc >= 1500) return { title: 'Yedi Krallığın Hükümdarı', color: '#e6b322', description: 'Westeros senin önünde diz çöküyor.' };
    if (sc >= 800) return { title: 'Kral Eli', color: '#c49a3f', description: 'Büyük bir stratejistsin.' };
    return { title: 'Köylü', color: '#7a7a7a', description: 'Yedi Krallıkta yolun başındasın.' };
  };

  const rank = getRank(score);
  const calculatedCorrect = Math.round((score + answered * 25) / 125);
  const correct = answered > 0 ? Math.max(0, calculatedCorrect) : 0;

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSaved) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_name: playerName, score }),
      });

      if (!res.ok) throw new Error('Skor kaydedilemedi');
      setIsSaved(true);
    } catch (err) {
      alert('Skor kaydedilirken bir sorun oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid grid-cols-3 gap-3 mb-6">
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

        {/* Skor Kaydetme Formu */}
        <form onSubmit={handleSaveScore} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Westeros'taki İsmin..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={isSaved || isSubmitting}
              className="flex-1 bg-[#14141a] border border-[#3a3a44] rounded-lg px-3 py-2 text-xs text-[#e8e6e0] placeholder:text-[#5a5a5a] focus:border-[#e6b322]/50 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSaved || isSubmitting || !playerName.trim()}
              className="btn-gold rounded-lg px-4 py-2 text-xs flex items-center gap-1 disabled:opacity-50 shrink-0"
            >
              {isSaved ? <Check size={14} /> : <Send size={14} />}
              {isSaved ? 'Kaydedildi' : isSubmitting ? '...' : 'Kaydet'}
            </button>
          </div>
        </form>

        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 bg-[#14141a] hover:bg-[#1f1f28] border border-[#3a3a44] rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-xs text-[#e8e6e0]"
          >
            <Home size={16} />
            Ana Menü
          </button>
          <button
            onClick={onLeaderboard}
            className="flex-1 btn-gold rounded-lg py-3 px-4 flex items-center justify-center gap-2 text-xs"
          >
            <Trophy size={16} />
            Sıralama
          </button>
        </div>
      </div>
    </motion.div>
  );
}
