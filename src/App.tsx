import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollText, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import BackgroundMusic from '@/components/BackgroundMusic';
import MainMenu from '@/components/MainMenu';
import QuizScreen from '@/components/QuizScreen';
import GameOverScreen from '@/components/GameOverScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';
import Modal from '@/components/Modal';

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export type MappedQuestion = {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: OptionKey;
  options: Record<OptionKey, string>;
};

type Screen = 'menu' | 'loading' | 'quiz' | 'gameover' | 'leaderboard';

type GameResult = {
  score: number;
  answered: number;
  total: number;
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [questions, setQuestions] = useState<MappedQuestion[]>([]);
  const [result, setResult] = useState<GameResult | null>(null);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Feedback State
  const [feedbackText, setFeedbackText] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const startGame = useCallback(async () => {
    setScreen('loading');
    setLoadError(null);
    try {
      const res = await fetch('/api/questions');
      if (!res.ok) throw new Error('Sorular veritabanından alınamadı.');
      const data = await res.json();
      setQuestions(shuffle(data));
      setScreen('quiz');
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Sorular yüklenemedi.');
      setScreen('menu');
    }
  }, []);

  const handleFinish = useCallback(
    (score: number, answered: number, total: number) => {
      setResult({ score, answered, total });
      setScreen('gameover');
    },
    []
  );

  // Öneri / Şikayet Gönderme Fonksiyonu
  const handleSendFeedback = async () => {
    if (!feedbackText.trim()) return;
    setIsSendingFeedback(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: feedbackText }),
      });
      if (!res.ok) throw new Error('Gönderilemedi');
      
      alert('Görüşün Westeros diyarlarına başarıyla ulaştı!');
      setFeedbackText('');
      setFeedbackOpen(false);
    } catch (e) {
      alert('Geri bildirim gönderilirken bir hata oluştu.');
    } finally {
      setIsSendingFeedback(false);
    }
  };

  return (
    <>
      <BackgroundMusic />
      <AmbientBackground variant={screen === 'quiz' ? 'quiz' : screen === 'gameover' ? 'gameover' : 'menu'} />

      {/* Load error toast */}
      <AnimatePresence>
        {loadError && screen === 'menu' && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%]">
            <div className="glass-panel rounded-xl p-4 flex items-center gap-3 border-red-500/30">
              <AlertCircle size={20} className="text-red-500 shrink-0" />
              <p className="text-red-300 text-sm">{loadError}</p>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {screen === 'menu' && (
          <MainMenu
            key="menu"
            onPlay={startGame}
            onLeaderboard={() => setScreen('leaderboard')}
            onRules={() => setRulesOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
          />
        )}

        {screen === 'loading' && (
          <div key="loading" className="min-h-screen flex flex-col items-center justify-center">
            <Loader2 size={40} className="animate-spin text-[#e6b322] mb-4" />
            <p className="text-sm tracking-widest text-[#c49a3f] uppercase">
              Sorular Yükleniyor...
            </p>
          </div>
        )}

        {screen === 'quiz' && questions.length > 0 && (
          <QuizScreen
            key="quiz"
            questions={questions}
            onFinish={handleFinish}
            onExit={() => setScreen('menu')}
          />
        )}

        {screen === 'gameover' && result && (
          <GameOverScreen
            key="gameover"
            score={result.score}
            answered={result.answered}
            total={result.total}
            onHome={() => setScreen('menu')}
            onLeaderboard={() => setScreen('leaderboard')}
          />
        )}

        {screen === 'leaderboard' && (
          <LeaderboardScreen
            key="leaderboard"
            onHome={() => setScreen('menu')}
          />
        )}
      </AnimatePresence>

      {/* Rules Modal */}
      <Modal
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        title="Kurallar"
        icon={<ScrollText size={22} className="text-[#e6b322]" />}
      >
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-[#e6b322]">•</span>
            <span>120 saniyelik genel süre dolmadan tüm soruları cevapla.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#e6b322]">•</span>
            <span>Her doğru cevap <strong className="text-green-400">100</strong> puan kazandırır.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#e6b322]">•</span>
            <span>Her yanlış cevap <strong className="text-red-400">25</strong> puan kaybettirir.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#e6b322]">•</span>
            <span>"Pas Geç" ile soruyu atlayabilirsin — puan değişmez.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#e6b322]">•</span>
            <span>Süre dolduğunda oyun biter ve rütben belirlenir.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#e6b322]">•</span>
            <span>Skorunu liderlik tablosuna kaydedebilirsin.</span>
          </li>
        </ul>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        title="Öneri / Şikayet"
        icon={<MessageSquare size={22} className="text-[#e6b322]" />}
      >
        <p className="mb-4">
          Görüşlerin Westeros için değerli. Öneri ve şikayetlerini bize ilet:
        </p>
        <textarea
          rows={4}
          placeholder="Mesajını buraya yaz..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="w-full bg-[#14141a] border border-[#3a3a44] rounded-lg px-4 py-3 text-sm text-[#e8e6e0] placeholder:text-[#5a5a5a] focus:border-[#e6b322]/50 focus:outline-none resize-none"
        />
        <button
          onClick={handleSendFeedback}
          disabled={isSendingFeedback || !feedbackText.trim()}
          className="btn-gold rounded-lg py-2.5 px-6 w-full mt-4 text-sm disabled:opacity-50"
        >
          {isSendingFeedback ? 'Gönderiliyor...' : 'Gönder'}
        </button>
        <p className="text-[10px] text-[#5a5a5a] text-center mt-3 tracking-wider">
          Teşekkür ederiz. Kış geliyor.
        </p>
      </Modal>
    </>
  );
}
