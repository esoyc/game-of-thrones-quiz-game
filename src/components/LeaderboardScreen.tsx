import { motion } from 'framer-motion';
import { Crown, Home } from 'lucide-react';

type Props = {
  onHome: () => void;
};

export default function LeaderboardScreen({ onHome }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center">
        <Crown size={40} className="text-[#e6b322] mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold gold-text mb-4">Liderlik Tablosu</h2>
        <p className="text-sm text-[#7a7a7a] mb-6">Liderlik tablosu hazırlanıyor...</p>
        
        <button
          onClick={onHome}
          className="btn-gold rounded-lg py-3 px-6 w-full text-xs flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Ana Menü
        </button>
      </div>
    </motion.div>
  );
}