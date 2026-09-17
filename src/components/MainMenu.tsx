import { motion } from 'framer-motion';
import { Play, Trophy, ScrollText, MessageSquare } from 'lucide-react';

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
      {/* Title & AI Dragon Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="text-center mb-12"
      >
        {/* Şeffaf AI Üretimi Ejderha Logosu */}
        <div className="flex justify-center mb-4">
          <img
            src="/dragon-logo.png"
            alt="Targaryen Dragon Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_0_20px_rgba(230,179,34,0.65)] hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider leading-tight">
          <span className="shimmer-text">GAME OF THRONES</span>
        </h1>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] mt-2 gold-text">
          QUIZ
        </h2>
        <div className="mt-6 flex items-center gap-4 justify-center">
          <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#e6b322]/60" />
          <span className="font-display text-sm sm:text-base tracking-[0.3em] text-[#e6b322]/90 uppercase font-medium">
            Westeros Bilgi Yarışması
          </span>
          <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#e6b322]/60" />
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
          className="btn-gold rounded-lg py-4 px-8 flex items-center justify-center gap-3 text-base sm:text-lg"
        >
          <Play size={20} fill="currentColor" />
          Oyuna Başla
        </button>
        <button
          onClick={onLeaderboard}
          className="btn-ghost rounded-lg py-4 px-8 flex items-center justify-center gap-3 text-sm sm:text-base"
        >
          <Trophy size={18} />
          Liderlik Tablosu
        </button>
        <div className="flex gap-4">
          <button
            onClick={onRules}
            className="btn-ghost rounded-lg py-3.5 px-4 flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <ScrollText size={16} />
            Kurallar
          </button>
          <button
            onClick={onFeedback}
            className="btn-ghost rounded-lg py-3.5 px-4 flex-1 flex items-center justify-center gap-2 text-xs sm:text-sm"
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
        className="mt-12 font-display text-xs sm:text-sm tracking-[0.35em] text-[#a0a0a0] uppercase text-center"
      >
        FIRE & BLOOD
      </motion.p>
    </motion.div>
  );
}
