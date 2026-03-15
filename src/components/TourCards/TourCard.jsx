import { motion } from 'framer-motion';
import { Star, Clock, ExternalLink, Tag } from 'lucide-react';

const BADGE_STYLE = {
  '베스트셀러': 'bg-[rgba(255,217,61,0.15)] text-[#FFD93D] border-[rgba(255,217,61,0.35)]',
  '신규':       'bg-[rgba(0,200,150,0.15)] text-emerald-400 border-[rgba(0,200,150,0.35)]',
  '한정 특가':  'bg-[rgba(255,107,107,0.15)] text-[#FF6B6B] border-[rgba(255,107,107,0.35)]',
};

function StarRating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`별점 ${rating}점, 리뷰 ${reviewCount.toLocaleString()}개`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={11}
            aria-hidden="true"
            fill={i < Math.floor(rating) ? '#FFD93D' : 'transparent'}
            color={i < Math.floor(rating) ? '#FFD93D' : '#5A5A70'}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-[#FFD93D]">{rating}</span>
      <span className="text-[11px] text-[#5A5A70]">({reviewCount.toLocaleString()})</span>
    </div>
  );
}

export default function TourCard({ tour, index }) {
  const discountPct = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 380, damping: 30 } }}
      className="glass glass-hover rounded-2xl overflow-hidden flex-shrink-0 w-72 sm:w-80"
      aria-label={`${tour.title} — ${tour.provider} 투어`}
    >
      {/* 썸네일 */}
      <figure className="relative overflow-hidden aspect-video m-0">
        <img
          src={tour.thumbnail}
          alt={`${tour.title} 투어 현장 사진`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 뱃지 */}
        {tour.badge && (
          <div
            aria-label={`${tour.badge} 투어`}
            className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${BADGE_STYLE[tour.badge] || ''}`}
          >
            {tour.badge}
          </div>
        )}
        {/* 할인율 */}
        {discountPct && (
          <div
            aria-label={`${discountPct}% 할인`}
            className="absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded-full bg-[#FF6B6B] text-white"
          >
            -{discountPct}%
          </div>
        )}
        {/* 소요시간 */}
        <div
          aria-label={`소요 시간 ${tour.duration}`}
          className="absolute bottom-3 left-3 flex items-center gap-1 glass text-[11px] font-medium text-white px-2.5 py-1 rounded-full"
        >
          <Clock size={10} aria-hidden="true" />
          {tour.duration}
        </div>
        <figcaption className="sr-only">{tour.title} 투어 현장 사진</figcaption>
      </figure>

      {/* 카드 바디 */}
      <div className="p-4 space-y-3">
        {/* 공급사 */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: tour.providerColor }}
            aria-hidden="true"
          />
          <span className="text-[11px] font-bold text-[#9090A8] tracking-wider uppercase">
            {tour.provider}
          </span>
        </div>

        {/* 제목 */}
        <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
          {tour.title}
        </h4>

        {/* 별점 */}
        <StarRating rating={tour.rating} reviewCount={tour.reviewCount} />

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5" aria-label="투어 특징">
          {tour.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-[10px] font-medium text-[#9090A8] bg-white/6 px-2 py-0.5 rounded-full"
            >
              <Tag size={8} aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        {/* 가격 + CTA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            {tour.originalPrice && (
              <p className="text-[11px] text-[#5A5A70] line-through">
                ₩{tour.originalPrice.toLocaleString()}
              </p>
            )}
            <p
              className="text-lg font-black text-aurora-1"
              aria-label={`가격 ${tour.price.toLocaleString()}원`}
            >
              ₩{tour.price.toLocaleString()}
            </p>
          </div>
          <motion.a
            href={tour.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${tour.title} — 외부 사이트(${tour.provider})에서 예약하기`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-aurora-h text-white text-xs font-bold hover:shadow-glow-sm transition-shadow"
          >
            예약하기
            <ExternalLink size={11} aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
