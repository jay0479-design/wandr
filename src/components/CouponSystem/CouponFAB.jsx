import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, X } from 'lucide-react';
import CouponCard from './CouponCard';
import { coupons } from '../../data/coupons';

export default function CouponFAB({ isOpen, onToggle }) {
  const modalRef = useRef(null);
  const fabRef = useRef(null);
  const prevFocusRef = useRef(null);

  // 포커스 트랩 + ESC 닫기
  useEffect(() => {
    if (!isOpen) return;
    prevFocusRef.current = document.activeElement;
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    const trap = (e) => {
      if (e.key === 'Escape') { onToggle(); return; }
      if (e.key !== 'Tab') return;
      const el = modalRef.current;
      if (!el) return;
      const focusable = el.querySelectorAll(
        'button, [href], input, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', trap);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', trap);
      document.body.style.overflow = '';
      prevFocusRef.current?.focus();
    };
  }, [isOpen, onToggle]);

  return (
    <>
      {/* 딤 배경 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
            aria-hidden="true"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* 쿠폰 모달 패널 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="coupon-modal-title"
            id="coupon-modal"
            initial={{ opacity: 0, y: 48, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md"
          >
            <div className="glass rounded-3xl overflow-hidden border border-white/12 shadow-glass-xl">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <h2 id="coupon-modal-title" className="text-base font-extrabold text-white">
                    ✈️ 특별 여행 쿠폰
                  </h2>
                  <p className="text-xs text-[#5A5A70] mt-0.5">
                    {coupons.length}개 쿠폰 이용 가능
                  </p>
                </div>
                <button
                  onClick={onToggle}
                  aria-label="쿠폰 모달 닫기"
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-[#9090A8] hover:text-white transition-colors"
                >
                  <X size={15} aria-hidden="true" />
                </button>
              </div>

              {/* 쿠폰 리스트 */}
              <div className="px-4 pb-6 max-h-[65vh] overflow-y-auto">
                <ul
                  role="list"
                  aria-label="이용 가능한 쿠폰 목록"
                  className="space-y-3"
                >
                  {coupons.map((coupon, i) => (
                    <motion.div
                      key={coupon.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                      <CouponCard coupon={coupon} />
                    </motion.div>
                  ))}
                </ul>

                {/* 유의사항 */}
                <p className="text-[11px] text-[#5A5A70] mt-5 text-center leading-relaxed">
                  쿠폰 코드를 복사한 후 각 파트너 사이트 결제 시 입력하세요.
                  <br />각 쿠폰의 사용 조건을 반드시 확인하세요.
                </p>

                {/* 복사 토스트 알림 영역 */}
                <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB 버튼 */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        {/* Pulse ring */}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-pulse-aurora bg-aurora-1 opacity-40 scale-125"
          />
        )}
        <motion.button
          ref={fabRef}
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isOpen ? '쿠폰 모달 닫기' : '여행 쿠폰 받기 — 클릭하여 이벤트 모달 열기'}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="coupon-modal"
          className="relative w-14 h-14 rounded-full bg-aurora-h flex flex-col items-center justify-center shadow-glow text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="ticket"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <Ticket size={18} aria-hidden="true" />
                <span className="text-[8px] font-bold mt-0.5 leading-none" aria-hidden="true">쿠폰</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* 뱃지 */}
        {!isOpen && (
          <span
            aria-label={`새 쿠폰 ${coupons.length}개`}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6B6B] flex items-center justify-center text-[9px] font-black text-white border-2 border-obsidian"
          >
            {coupons.length}
          </span>
        )}
      </div>
    </>
  );
}
