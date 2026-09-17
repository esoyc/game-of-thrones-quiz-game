import { motion } from 'framer-motion';
import { Play, Trophy, ScrollText, MessageSquare, Crown } from 'lucide-react';

type Props = {
  onPlay: () => void;
  onLeaderboard: () => void;
  onRules: () => void;
  onFeedback: () => void;
};

export default function MainMenu({
  onPlay,
  onLeaderboard,
  onRules,
  onFeedback,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <Crown
            size={56}
            strokeWidth={1.2}
            className="text-[#e6b322] drop-shadow-[0_0_15px_rgba(230,179,34,0.5)]"
          />
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider leading-tight">
          <span className="shimmer-text">GAME OF THRONES</span>
        </h1>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] mt-2 gold-text">
          QUIZ
        </h2>
        <div className="mt-6 flex items-center gap-4 justify-center">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#e6b322]/60" />
          <span className="text-xs tracking-[0.4em] text-[#c49a3f]/70 uppercase">
            Westeros Bilgi Yarışması
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#e6b322]/60" />
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <button
          onClick={onPlay}
          className="btn-gold rounded-lg py-4 px-8 flex items-center justify-center gap-3 text-base"
        >
          <Play size={20} fill="currentColor" />
          Oyuna Başla
        </button>
        <button
          onClick={onLeaderboard}
          className="btn-ghost rounded-lg py-4 px-8 flex items-center justify-center gap-3 text-sm"
        >
          <Trophy size={18} />
          Liderlik Tablosu
        </button>
        <div className="flex gap-4">
          <button
            onClick={onRules}
            className="btn-ghost rounded-lg py-3 px-4 flex-1 flex items-center justify-center gap-2 text-xs"
          >
            <ScrollText size={16} />
            Kurallar
          </button>
          <button
            onClick={onFeedback}
            className="btn-ghost rounded-lg py-3 px-4 flex-1 flex items-center justify-center gap-2 text-xs"
          >
            <MessageSquare size={16} />
            Öneri / Şikayet
          </button>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 text-[10px] tracking-[0.3em] text-[#7a7a7a] uppercase text-center"
      >
        FIRE & BLOOD
      </motion.p>
    </motion.div>
  );
}
