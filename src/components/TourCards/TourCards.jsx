import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TourCard from './TourCard';
import { getToursForDestination } from '../../data/tours';

export default function TourCards({ slug, destinationName }) {
  const scrollRef = useRef(null);
  const tours = getToursForDestination(slug);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section aria-label={`${destinationName} 추천 투어 & 액티비티`} className="h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-aurora-1 mb-1">
            Curated Tours
          </p>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            추천 투어 & 액티비티
          </h3>
        </div>
        {/* 스크롤 화살표 */}
        <div className="flex gap-2" aria-label="투어 카드 스크롤">
          <motion.button
            onClick={() => scroll(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="이전 투어 카드 보기"
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#9090A8] hover:text-white transition-colors"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </motion.button>
          <motion.button
            onClick={() => scroll(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="다음 투어 카드 보기"
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-[#9090A8] hover:text-white transition-colors"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      {/* 가로 스크롤 슬라이더 */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 no-scrollbar scroll-smooth snap-x snap-mandatory overscroll-x-contain"
        role="list"
        aria-label={`${destinationName} 투어 목록`}
        tabIndex={0}
        aria-describedby="tour-scroll-hint"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {tours.map((tour, i) => (
          <div key={tour.id} role="listitem" className="snap-start flex-shrink-0">
            <TourCard tour={tour} index={i} />
          </div>
        ))}
      </div>
      <p id="tour-scroll-hint" className="sr-only">
        가로로 스크롤하거나 좌우 버튼을 눌러 더 많은 투어를 확인하세요.
      </p>

      {/* 스크롤 힌트 (모바일) */}
      <p className="text-[11px] text-[#5A5A70] mt-3 text-right" aria-hidden="true">
        → 스와이프하여 더 보기
      </p>
    </section>
  );
}
