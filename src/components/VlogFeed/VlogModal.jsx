import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export default function VlogModal({ vlog, onClose }) {
  const closeRef = useRef(null);
  const prevFocusRef = useRef(null);

  useEffect(() => {
    if (!vlog) return;
    // 포커스 저장 후 닫기 버튼으로 이동
    prevFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    // 포커스 트랩
    const trapFocus = (e) => {
      const modal = document.getElementById('vlog-modal-inner');
      if (!modal) return;
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', trapFocus);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', trapFocus);
      document.body.style.overflow = '';
      prevFocusRef.current?.focus();
    };
  }, [vlog, onClose]);

  return (
    <AnimatePresence>
      {vlog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vlog-modal-title"
          aria-describedby="vlog-modal-desc"
        >
          {/* 딤 배경 */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* 모달 본체 */}
          <motion.div
            id="vlog-modal-inner"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="relative z-10 w-full max-w-3xl glass rounded-3xl overflow-hidden"
          >
            {/* 닫기 버튼 */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="영상 플레이어 닫기"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X size={16} aria-hidden="true" />
            </button>

            {/* 영상 임베드 (YouTube) */}
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${vlog.videoId}?autoplay=1&rel=0`}
                title={vlog.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                aria-label={`${vlog.title} 유튜브 영상`}
              />
            </div>

            {/* 메타 정보 */}
            <div className="p-5 space-y-3">
              <h3
                id="vlog-modal-title"
                className="text-base font-bold text-white leading-snug pr-8"
              >
                {vlog.title}
              </h3>
              <p id="vlog-modal-desc" className="sr-only">
                {vlog.channelTitle} 채널의 유튜브 브이로그 영상
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={vlog.channelAvatar}
                    alt={`${vlog.channelTitle} 채널 프로필 이미지`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium text-[#9090A8]">{vlog.channelTitle}</span>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${vlog.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${vlog.title} — YouTube에서 전체 화면으로 보기`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-aurora-1 hover:text-white transition-colors"
                >
                  YouTube에서 보기
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
