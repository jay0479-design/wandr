import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { destinations } from '../../data/destinations';

// 히어로 배경 이미지 로테이션
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=90&auto=format&fit=crop', // Tokyo
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=90&auto=format&fit=crop', // Paris
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90&auto=format&fit=crop', // Bali
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero({ onDestinationSelect }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? destinations.filter(
        (d) =>
          d.name.includes(query) ||
          d.country.includes(query) ||
          d.region.includes(query) ||
          d.tags.some((t) => t.includes(query))
      )
    : destinations.slice(0, 5);

  const handleSelect = (dest) => {
    onDestinationSelect(dest);
    setQuery(dest.name);
    setShowSuggestions(false);
    // 상세 패널로 스크롤
    setTimeout(() => {
      document.getElementById('detail-panel')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filtered.length > 0) handleSelect(filtered[0]);
  };

  return (
    <section
      id="hero"
      aria-label="히어로 — 여행지 탐색 시작"
      className="relative w-full"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src={HERO_IMAGES[0]}
          alt=""
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105"
          style={{ willChange: 'transform' }}
        />
        {/* 그라디언트 오버레이 — 상단~중앙 텍스트 구간을 충분히 어둡게 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.38) 55%, rgba(10,10,15,0.82) 80%, rgba(10,10,15,1) 100%)',
          }}
        />
        {/* 중앙 텍스트 영역 집중 vignette — 배경이 밝은 사진도 흡수 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 46%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.70) 100%)',
          }}
        />
        {/* 사이드 페이드 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.50) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.50) 100%)',
          }}
        />
        {/* 텍스트 가시성 보조 — 전체 면에 아주 옅은 검은 레이어 */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-aurora-1 mb-5"
          style={{ textShadow: '0 0 20px rgba(0,212,255,0.55), 0 1px 10px rgba(0,0,0,0.9)' }}
        >
          Discover Your Next Adventure
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]"
          style={{
            letterSpacing: '-0.03em',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          세상 모든 여행,
          <br />
          <span className="text-white">지금 시작하세요</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-[#9090A8] max-w-xl mx-auto leading-relaxed mb-10"
          style={{ textShadow: '0 1px 16px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.7)' }}
        >
          전 세계 프리미엄 여행지 정보·날씨·투어·현지 팁을
          <br className="hidden sm:block" />
          한 곳에서 경험하세요.
        </motion.p>

        {/* 검색 폼 */}
        <motion.div variants={itemVariants} className="w-full max-w-xl relative">
          <form
            onSubmit={handleSubmit}
            role="search"
            aria-label="여행지 검색"
            className="relative"
          >
            <label htmlFor="destination-input" className="sr-only">
              여행지를 검색하세요
            </label>
            <div className="flex items-center gap-3 glass rounded-full px-5 py-3 border border-white/20 focus-within:border-aurora-1 focus-within:shadow-glow-sm transition-all duration-300">
              <MapPin
                size={18}
                aria-hidden="true"
                className="text-aurora-1 flex-shrink-0"
              />
              <input
                ref={inputRef}
                id="destination-input"
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                placeholder="도쿄, 파리, 발리… 어디든 검색하세요"
                autoComplete="off"
                className="flex-1 bg-transparent text-white placeholder-[#5A5A70] text-sm outline-none min-w-0"
                aria-expanded={showSuggestions}
                aria-autocomplete="list"
                aria-controls="search-suggestions"
              />
              <button
                type="submit"
                aria-label="검색 실행"
                className="flex-shrink-0 px-5 py-2 rounded-full bg-aurora-h text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                <Search size={15} aria-hidden="true" className="sm:hidden" />
                <span className="hidden sm:inline">검색</span>
              </button>
            </div>
          </form>

          {/* 자동완성 드롭다운 */}
          {showSuggestions && filtered.length > 0 && (
            <motion.ul
              id="search-suggestions"
              role="listbox"
              aria-label="여행지 추천 목록"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full glass rounded-2xl border border-white/12 overflow-hidden z-50 divide-y divide-white/6"
            >
              {filtered.map((dest) => (
                <li key={dest.id} role="option" aria-selected="false">
                  <button
                    onMouseDown={() => handleSelect(dest)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white/8 transition-colors duration-150"
                  >
                    <MapPin size={14} aria-hidden="true" className="text-aurora-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{dest.name}</p>
                      <p className="text-xs text-[#5A5A70]">{dest.country} · {dest.region}</p>
                    </div>
                    <div className="ml-auto flex gap-1 flex-shrink-0">
                      {dest.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="tag-theme text-[10px] px-2 py-0.5 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        {/* 인기 검색어 */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          aria-label="인기 여행지 빠른 선택"
        >
          <span className="text-xs text-[#5A5A70] font-medium mr-1">인기 :</span>
          {destinations.slice(0, 5).map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelect(d)}
              className="text-xs px-3 py-1.5 rounded-full glass border border-white/10 text-[#9090A8] hover:text-white hover:border-white/25 transition-all duration-200"
            >
              {d.name}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 rounded-full bg-white/60 animate-scroll-bounce" />
        </div>
        <ChevronDown size={14} aria-hidden="true" className="text-white/40 animate-scroll-bounce" />
      </div>
    </section>
  );
}
