import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';

const SOURCE_ICONS = {
  roulette: '🎰',
  attendance: '📅',
  quiz: '🧠',
};

const TYPE_COLORS = {
  credit: 'from-aurora-1/20 to-transparent border-aurora-1/30',
  coupon: 'from-aurora-4/20 to-transparent border-aurora-4/30',
  product: 'from-aurora-2/20 to-transparent border-aurora-2/30',
  airline: 'from-aurora-3/20 to-transparent border-aurora-3/30',
};

export default function RewardToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: 80, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="status"
          aria-live="polite"
          aria-label={`당첨: ${toast.name}`}
          className={`fixed top-20 right-4 z-[60] max-w-[300px] glass border bg-gradient-to-br ${
            TYPE_COLORS[toast.type] || 'from-aurora-1/20 to-transparent border-aurora-1/30'
          } rounded-2xl p-4 shadow-2xl`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0" aria-hidden="true">
              {SOURCE_ICONS[toast.source] || '🎉'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-aurora-1 tracking-wide uppercase mb-0.5">
                🎉 당첨!
              </p>
              <p className="text-sm font-bold text-white truncate">{toast.name}</p>
              {toast.type === 'credit' && toast.value > 0 && (
                <p className="text-xs text-[#9090A8] mt-0.5">
                  +₩{toast.value.toLocaleString()} 적립
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="토스트 닫기"
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[#5A5A70] hover:text-white transition-colors"
            >
              <X size={12} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
