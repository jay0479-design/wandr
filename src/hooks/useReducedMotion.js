import { useState, useEffect } from 'react';

/**
 * useReducedMotion — prefers-reduced-motion 미디어 쿼리 훅
 *
 * 사용자의 운동 감소 설정을 감지합니다.
 * Framer Motion whileHover/whileTap/animate 비활성화 조건으로 활용.
 *
 * @returns {boolean} true = 애니메이션 최소화 필요
 *
 * @example
 * const reduced = useReducedMotion();
 * <motion.div animate={reduced ? {} : { opacity: 1, y: 0 }} />
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
