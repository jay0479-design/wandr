import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import { relativeTime } from '../../data/vlogs';

export default function VlogCard({ vlog, onPlay, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 360, damping: 28 } }}
      className="glass glass-hover rounded-2xl overflow-hidden group cursor-pointer"
      aria-label={`브이로그: ${vlog.title}`}
      onClick={() => onPlay(vlog)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(vlog); } }}
    >
      {/* 썸네일 */}
      <figure className="relative overflow-hidden aspect-video m-0">
        <img
          src={vlog.thumbnail}
          alt={`${vlog.title} 브이로그 썸네일`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* 재생 버튼 오버레이 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-aurora-h flex items-center justify-center shadow-glow scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={20} fill="white" color="white" />
          </div>
        </div>
        {/* 재생 시간 */}
        {vlog.duration && (
          <div
            className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/80 px-1.5 py-0.5 rounded"
            aria-label={`재생 시간 ${vlog.duration}`}
          >
            {vlog.duration}
          </div>
        )}
        <figcaption className="sr-only">{vlog.title} 브이로그 썸네일</figcaption>
      </figure>

      {/* 카드 바디 */}
      <div className="p-4 space-y-2.5">
        {/* 제목 */}
        <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-aurora-1 transition-colors duration-200">
          {vlog.title}
        </h4>

        {/* 채널 정보 + 메타 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={vlog.channelAvatar}
              alt={`${vlog.channelTitle} 채널`}
              width={24}
              height={24}
              loading="lazy"
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
            />
            <span className="text-xs text-[#9090A8] truncate font-medium">
              {vlog.channelTitle}
            </span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            {vlog.viewCount && (
              <span className="flex items-center gap-1 text-[11px] text-[#5A5A70]" aria-label={`조회수 ${vlog.viewCount}`}>
                <Eye size={10} aria-hidden="true" />
                {vlog.viewCount}
              </span>
            )}
          </div>
        </div>

        {/* 발행일 */}
        <time
          dateTime={vlog.publishedAt}
          className="text-[11px] text-[#5A5A70] block"
        >
          {relativeTime(vlog.publishedAt)}
        </time>
      </div>
    </motion.article>
  );
}
