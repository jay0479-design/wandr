import { motion } from 'framer-motion';
import { MessageSquare, Users } from 'lucide-react';

export default function RoomCard({ room, onClick }) {
  return (
    <motion.article
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${room.title} 커뮤니티 방 열기`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="relative overflow-hidden rounded-2xl glass border border-white/10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-aurora-1 group"
    >
      {/* 커버 이미지 */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={room.coverImage}
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* 지역 뱃지 */}
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-aurora-h text-white">
          {room.region}
        </span>
      </div>

      {/* 텍스트 영역 */}
      <div className="p-5 space-y-3">
        <h3 className="text-base font-bold text-white leading-snug">{room.title}</h3>
        <p className="text-xs text-[#9090A8] leading-relaxed line-clamp-2">{room.description}</p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5">
          {room.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full tag-theme">
              {tag}
            </span>
          ))}
        </div>

        {/* 통계 */}
        <div className="flex items-center gap-4 pt-1 border-t border-white/8">
          <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
            <MessageSquare size={12} aria-hidden="true" />
            {room.postCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
            <Users size={12} aria-hidden="true" />
            {room.memberCount.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
