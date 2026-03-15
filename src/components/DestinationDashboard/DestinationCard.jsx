import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';

const BUDGET_LABEL = { 저렴: '💰 알뜰', 중간: '💳 중간', 고급: '✨ 럭셔리' };
const BUDGET_CLASS = {
  저렴: 'tag-budget',
  중간: 'bg-[rgba(255,255,255,0.08)] text-[#9090A8] border border-white/10',
  고급: 'bg-[rgba(255,107,107,0.12)] text-[#FF9999] border border-[rgba(255,107,107,0.25)]',
};

export default function DestinationCard({ destination, isSelected, onSelect, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 360, damping: 28 } }}
      aria-label={`${destination.name}, ${destination.country} 카드`}
      className={`relative rounded-3xl overflow-hidden cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-aurora-1 ${
        isSelected
          ? 'ring-2 ring-aurora-1 shadow-glow'
          : 'hover:shadow-glass-xl'
      }`}
      style={{ aspectRatio: '4/5' }}
      role="article"
      tabIndex={0}
      onClick={() => onSelect(destination)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(destination); } }}
    >
      {/* 이미지 */}
      <figure className="absolute inset-0 m-0">
        <img
          src={destination.thumbnailImage}
          alt={`${destination.name} — ${destination.country}의 대표 풍경`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <figcaption className="sr-only">
          {destination.name}, {destination.country} — {destination.description}
        </figcaption>
      </figure>

      {/* 그라디언트 오버레이 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 40%, rgba(10,10,15,0.96) 100%)',
        }}
      />

      {/* 선택 활성화 오버레이 */}
      {isSelected && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,212,255,0.08)' }}
        />
      )}

      {/* 카드 바디 */}
      <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`tag-region text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase`}>
            {destination.region}
          </span>
          {destination.tags.slice(0, 1).map((tag) => (
            <span key={tag} className={`tag-theme text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
              {tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
          {destination.name}
        </h3>
        <p className="text-xs text-[#9090A8] font-medium">{destination.country}</p>

        {/* 메타: 별점 + 예산 */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5" aria-label={`평점 ${destination.rating}점`}>
            <Star size={12} fill="#FFD93D" color="#FFD93D" aria-hidden="true" />
            <span className="text-xs font-bold text-[#FFD93D]">{destination.rating}</span>
            <span className="text-[10px] text-[#5A5A70]">({(destination.reviewCount / 1000).toFixed(1)}k)</span>
          </div>
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${BUDGET_CLASS[destination.budget]}`}>
            {BUDGET_LABEL[destination.budget]}
          </span>
        </div>
      </div>

      {/* 호버 CTA 오버레이 */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="w-9 h-9 rounded-full bg-aurora-h flex items-center justify-center shadow-glow-sm">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>
    </motion.article>
  );
}
