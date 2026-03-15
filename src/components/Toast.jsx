import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast — 전역 알림 시스템
 *
 * useToast() 훅으로 토스트 메시지를 표시합니다.
 * aria-live="polite" + role="status" 로 스크린리더에 즉시 전달.
 *
 * @example
 * const { showToast, ToastContainer } = useToast();
 * showToast({ message: '저장 완료!', type: 'success' });
 * return <><App /><ToastContainer /></>;
 */

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertCircle,
  info:    Info,
};

const COLORS = {
  success: 'text-emerald-400 border-emerald-400/30',
  error:   'text-[#FF6B6B] border-[#FF6B6B]/30',
  warning: 'text-[#FFD93D] border-[#FFD93D]/30',
  info:    'text-[#00D4FF] border-[#00D4FF]/30',
};

// ── 단일 Toast 아이템 ──────────────────────────────────
function ToastItem({ id, message, type = 'info', onDismiss }) {
  const Icon = ICONS[type] ?? Info;

  return (
    <motion.div
      layout
      role="status"
      aria-live="polite"
      aria-atomic="true"
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`flex items-start gap-3 glass rounded-2xl px-4 py-3 min-w-[260px] max-w-[360px] border ${COLORS[type]}`}
    >
      <Icon size={18} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm text-[#F0F0F5] flex-1 leading-snug">{message}</p>
      <button
        type="button"
        aria-label="알림 닫기"
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 text-[#5A5A70] hover:text-white transition-colors"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// ── useToast 훅 ────────────────────────────────────────
let _toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = ++_toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  const ToastContainer = useCallback(
    () => (
      <div
        aria-label="알림 목록"
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem {...t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    ),
    [toasts, dismiss]
  );

  return { showToast, ToastContainer };
}
