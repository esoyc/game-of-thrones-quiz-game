import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, icon, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="glass-panel rounded-2xl p-6 sm:p-8 max-w-lg w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#a0a0a0] hover:text-[#e6b322] transition-colors p-1"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3.5 mb-6">
              {icon}
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider gold-text">
                {title}
              </h2>
            </div>
            <div className="text-base sm:text-lg text-[#e8e6e0] leading-relaxed">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
