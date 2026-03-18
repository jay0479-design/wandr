import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Menu, X, Globe, Compass, User } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const NAV_LINKS = [
  { href: '#destinations', label: '여행지 탐색' },
  { href: '/vlog', label: '브이로그' },
  { href: '/community', label: '커뮤니티' },
  { href: '/event', label: '이벤트' },
];

export default function Header({ onCouponClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 모바일 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        aria-label="주 내비게이션"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between"
      >
        {/* 로고 */}
        <a
          href="/"
          aria-label="WANDR 홈으로 이동"
          className="flex items-center gap-2 group"
        >
          <Compass
            size={22}
            aria-hidden="true"
            className="text-aurora-1 group-hover:rotate-45 transition-transform duration-500"
          />
          <span
            className="text-aurora font-black text-xl tracking-[0.18em] uppercase"
            style={{ letterSpacing: '0.18em' }}
          >
            WANDR
          </span>
        </a>

        {/* 데스크탑 링크 */}
        <ul role="list" className="hidden md:flex items-center gap-1" aria-label="페이지 내 이동">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-[#9090A8] hover:text-white transition-colors duration-200 group"
              >
                {label}
                {/* 하단 인디케이터 */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full bg-aurora-h transition-all duration-300 rounded-full"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* 우측 액션 */}
        <div className="flex items-center gap-3">
          {/* 쿠폰 버튼 (데스크탑) */}
          <motion.button
            onClick={onCouponClick}
            aria-label="여행 쿠폰 받기 — 이벤트 모달 열기"
            aria-haspopup="dialog"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-aurora-h text-white text-xs font-bold tracking-wide shadow-glow-sm hover:shadow-glow transition-shadow duration-300"
          >
            <Ticket size={14} aria-hidden="true" />
            쿠폰 받기
          </motion.button>

          {/* 언어 아이콘 */}
          <button
            aria-label="언어 선택"
            className="hidden sm:flex w-9 h-9 rounded-full glass items-center justify-center text-[#9090A8] hover:text-white transition-colors duration-200"
          >
            <Globe size={16} aria-hidden="true" />
          </button>

          {/* 마이페이지 아이콘 */}
          <a
            href="/mypage"
            aria-label="마이페이지"
            className="hidden sm:flex w-9 h-9 rounded-full glass items-center justify-center text-[#9090A8] hover:text-white transition-colors duration-200"
          >
            <User size={16} aria-hidden="true" />
          </a>

          {/* 테마 토글 */}
          <ThemeToggle />

          {/* 햄버거 (모바일) */}
          <button
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((p) => !p)}
            className="flex md:hidden w-10 h-10 rounded-full glass items-center justify-center text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* 모바일 드로어 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <ul role="list" className="px-6 py-6 space-y-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-base font-medium text-[#9090A8] hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
              {/* 모바일 마이페이지 링크 */}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.3 }}
              >
                <a
                  href="/mypage"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-base font-medium text-[#9090A8] hover:text-white transition-colors"
                >
                  <User size={16} aria-hidden="true" />
                  마이페이지
                </a>
              </motion.li>
              {/* 모바일 쿠폰 버튼 */}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (NAV_LINKS.length + 1) * 0.06, duration: 0.3 }}
                className="pt-3"
              >
                <button
                  onClick={() => { setMenuOpen(false); onCouponClick(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-aurora-h text-white text-sm font-bold"
                  aria-haspopup="dialog"
                >
                  <Ticket size={16} aria-hidden="true" />
                  여행 쿠폰 받기
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
