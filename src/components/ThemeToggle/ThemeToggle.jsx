import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle — 다크/라이트 모드 전환 버튼
 *
 * AppContext의 toggleTheme 액션을 호출합니다.
 * html 엘리먼트에 .dark / .light 클래스를 토글합니다.
 *
 * 접근성: aria-label, aria-pressed, 키보드 지원
 */
export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={!isDark}
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-xl glass text-[#9090A8] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
        transition={{ duration: 0.22 }}
      >
        {isDark ? (
          <Sun size={16} aria-hidden="true" />
        ) : (
          <Moon size={16} aria-hidden="true" />
        )}
      </motion.span>
    </motion.button>
  );
}
