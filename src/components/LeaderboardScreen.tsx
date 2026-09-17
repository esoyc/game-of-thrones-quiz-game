import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Home, Loader2, Award } from 'lucide-react';

type Props = {
  onHome: () => void;
};

type LeaderboardItem = {
  player_name: string;
  score: number;
};

export default function LeaderboardScreen({ onHome }: Props) {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Veri çekilemedi');
        const result = await res.json();
        if (Array.isArray(result)) setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
        {/* Taç İkonu */}
        <Crown size={44} className="text-[#e6b322] mx-auto mb-2 drop-shadow-[0_0_15px_rgba(230,179,34,0.5)]" />
        <h2 className="font-display text-2xl sm:text-3xl font-bold gold-text mb-6">
          Liderlik Tablosu
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 size={36} className="animate-spin text-[#e6b322] mb-3" />
            <p className="text-sm text-[#a0a0a0]">Skorlar Yükleniyor...</p>
          </div>
        ) : error ? (
          <p className="text-base text-red-400 py-8">Sıralama yüklenirken bir hata oluştu.</p>
        ) : data.length === 0 ? (
          <p className="text-base text-[#a0a0a0] py-8">Henüz kaydedilmiş bir skor yok. İlk sen ol!</p>
        ) : (
          <div className="space-y-2.5 mb-6 max-h-72 overflow-y-auto pr-1">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#14141a] border border-[#2a2a30] rounded-xl px-4 py-3 text-base sm:text-lg"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`font-display font-bold w-6 text-left text-base sm:text-lg ${
                      index === 0
                        ? 'text-[#e6b322]'
                        : index === 1
                        ? 'text-[#c0c0c0]'
                        : index === 2
                        ? 'text-[#cd7f32]'
                        : 'text-[#7a7a7a]'
                    }`}
                  >
                    {index + 1}.
                  </span>
                  <span className="text-[#e8e6e0] font-semibold tracking-wide">{item.player_name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-display font-bold text-[#e6b322] text-base sm:text-lg">
                  <Award size={18} />
                  <span>{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onHome}
          className="btn-gold rounded-lg py-3.5 px-6 w-full text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Ana Menü
        </button>
      </div>
    </motion.div>
  );
}
