import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, SkipForward, Check, X, AlertCircle } from 'lucide-react';
import type { MappedQuestion, OptionKey } from '@/lib/supabase';
import { playCorrectSound, playWrongSound } from '@/utils/audio';

type Props = {
  questions: MappedQuestion[];
  onFinish: (score: number, answered: number, total: number) => void;
  onExit: () => void;
};

const GAME_DURATION = 120;
const OPTION_LABELS: OptionKey[] = ['A', 'B', 'C', 'D'];

type AnswerState = {
  selected: OptionKey | null;
  correct: OptionKey;
  locked: boolean;
};

export default function QuizScreen({ questions, onFinish, onExit }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [answerState, setAnswerState] = useState<AnswerState | null>(null);
  const [error] = useState<string | null>(null);

  const scoreRef = useRef(score);
  const answeredRef = useRef(answered);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    answeredRef.current = answered;
  }, [answered]);

  const current = questions[currentIndex];

  const finishGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    onFinish(scoreRef.current, answeredRef.current, questions.length);
  }, [onFinish, questions.length]);

  const advance = useCallback(() => {
    setAnswerState(null);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        finishGame();
        return prev;
      }
      return next;
    });
  }, [questions.length, finishGame]);

  useEffect(() => {
    advanceRef.current = advance;
  }, [advance]);

  // Timer Setup
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finishGame]);

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>, option: OptionKey) => {
    e.currentTarget.blur();
    if (answerState?.locked) return;
    if (!current) return;

    const isCorrect = option === current.correct_option;
    setAnswerState({
      selected: option,
      correct: current.correct_option,
      locked: true,
    });

    setAnswered((a) => a + 1);

    if (isCorrect) {
      setScore((s) => s + 100);
      playCorrectSound();
    } else {
      setScore((s) => s - 25);
      playWrongSound();
    }

    setTimeout(() => {
      advanceRef.current?.();
    }, 1200);
  };

  const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    if (answerState?.locked) return;
    setAnswerState(null);
    advanceRef.current?.();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel rounded-xl p-8 max-w-md text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={onExit} className="btn-ghost rounded-lg px-6 py-3">
            Ana Menü
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const timePercent = (timeLeft / GAME_DURATION) * 100;
  const isLow = timeLeft <= 10;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:py-8">
      {/* Top bar (Telefonda soru ve skor ortalandı, masaüstünde eski sağa yatık haline döner) */}
      <div className="flex items-center justify-between mb-6 max-w-3xl w-full mx-auto">
        <button
          onClick={onExit}
          className="text-[#7a7a7a] hover:text-[#e6b322] text-xs tracking-widest uppercase transition-colors shrink-0"
        >
          ← Çık
        </button>
        
        <div className="flex-1 flex items-center justify-center sm:justify-end gap-6 sm:pr-0 pr-6">
          <div className="text-center">
            <div className="text-[10px] tracking-widest text-[#7a7a7a] uppercase">
              Soru
            </div>
            <div className="font-display text-base sm:text-lg text-[#e6b322]">
              {currentIndex + 1}
              <span className="text-[#7a7a7a] text-xs sm:text-sm">/{questions.length}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[10px] tracking-widest text-[#7a7a7a] uppercase">
              Skor
            </div>
            <div className="font-display text-base sm:text-lg text-[#e6b322]">
              {score}
            </div>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="max-w-3xl w-full mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Clock
            size={18}
            className={isLow ? 'text-red-500' : 'text-[#c49a3f]'}
          />
          <span
            className={`font-display text-sm tracking-wider ${
              isLow ? 'text-red-500' : 'text-[#c49a3f]'
            }`}
          >
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 bg-[#1e1e24] rounded-full overflow-hidden gold-border">
          <motion.div
            className={`h-full rounded-full ${
              isLow
                ? 'bg-gradient-to-r from-red-700 to-red-400'
                : 'bg-gradient-to-r from-[#c49a3f] to-[#f5cf5e]'
            }`}
            animate={{ width: `${timePercent}%` }}
            transition={{ duration: 0.5, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass-panel rounded-2xl p-6 sm:p-8 mb-6"
          >
            <p className="font-display text-lg sm:text-xl leading-relaxed text-[#e8e6e0]">
              {current.question_text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {OPTION_LABELS.map((key) => {
            const isSelected = answerState?.selected === key;
            const isCorrect = answerState?.correct === key;
            const locked = answerState?.locked;

            let cls =
              'border-[#3a3a44] bg-[#1a1a20] sm:hover:border-[#e6b322]/50 sm:hover:bg-[#22221a]';
            if (locked) {
              if (isCorrect) {
                cls = 'border-green-500 bg-green-900/30';
              } else if (isSelected && !isCorrect) {
                cls = 'border-red-500 bg-red-900/30';
              } else {
                cls = 'border-[#2a2a30] bg-[#14141a] opacity-50';
              }
            }

            return (
              <motion.button
                key={key}
                whileHover={!locked ? { scale: 1.02 } : {}}
                whileTap={!locked ? { scale: 0.98 } : {}}
                disabled={locked}
                onClick={(e) => handleSelect(e, key)}
                className={`relative rounded-xl p-4 border-2 text-left transition-all duration-300 ${cls}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-display text-lg w-9 h-9 rounded-lg flex items-center justify-center border ${
                      locked && isCorrect
                        ? 'border-green-500 text-green-400'
                        : locked && isSelected && !isCorrect
                        ? 'border-red-500 text-red-400'
                        : 'border-[#e6b322]/30 text-[#c49a3f]'
                    }`}
                  >
                    {key}
                  </span>
                  <span className="flex-1 text-[#e8e6e0] text-sm sm:text-base">
                    {current.options[key]}
                  </span>
                  {locked && isCorrect && (
                    <Check size={20} className="text-green-400" />
                  )}
                  {locked && isSelected && !isCorrect && (
                    <X size={20} className="text-red-400" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Skip */}
        <div className="flex justify-center">
          <button
            onClick={handleSkip}
            disabled={answerState?.locked}
            className="btn-ghost rounded-lg py-2.5 px-6 flex items-center gap-2 text-xs disabled:opacity-40"
          >
            <SkipForward size={16} />
            Pas Geç
          </button>
        </div>
      </div>
    </div>
  );
}
