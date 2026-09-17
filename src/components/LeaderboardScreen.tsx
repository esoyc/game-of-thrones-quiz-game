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
      <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center">
        <Crown size={40} className="text-[#e6b322] mx-auto mb-2" />
        <h2 className="font-display text-2xl font-bold gold-text mb-6">Liderlik Tablosu</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 size={32} className="animate-spin text-[#e6b322] mb-2" />
            <p className="text-xs text-[#7a7a7a]">Skorlar Yükleniyor...</p>
          </div>
        ) : error ? (
          <p className="text-sm text-red-400 py-8">Sıralama yüklenirken bir hata oluştu.</p>
        ) : data.length === 0 ? (
          <p className="text-sm text-[#7a7a7a] py-8">Henüz kaydedilmiş bir skor yok. İlk sen ol!</p>
        ) : (
          <div className="space-y-2 mb-6 max-h-64 overflow-y-auto pr-1">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#14141a] border border-[#2a2a30] rounded-lg px-4 py-2.5 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-display font-bold w-4 text-left ${
                      index === 0
                        ? 'text-[#e6b322]'
                        : index === 1
                        ? 'text-[#c0c0c0]'
                        : index === 2
                        ? 'text-[#cd7f32]'
                        : 'text-[#5a5a5a]'
                    }`}
                  >
                    {index + 1}.
                  </span>
                  <span className="text-[#e8e6e0] font-medium">{item.player_name}</span>
                </div>
                <div className="flex items-center gap-1 font-display font-bold text-[#e6b322]">
                  <Award size={14} />
                  <span>{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}

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
