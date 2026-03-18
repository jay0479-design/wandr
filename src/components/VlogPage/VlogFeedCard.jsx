import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, MessageCircle, X, Play } from 'lucide-react';
import { relativeTime } from '../../data/vlogs';

export default function VlogFeedCard({ post, index }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((p) => {
      const next = !p;
      setLikeCount((c) => c + (next ? 1 : -1));
      return next;
    });
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 360, damping: 28 } }}
        className="glass rounded-2xl overflow-hidden group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-aurora-1"
        aria-label={`브이로그: ${post.title}`}
        role="button"
        tabIndex={0}
        onClick={() => setModalOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModalOpen(true); } }}
      >
        {/* 썸네일 */}
        <figure className="relative aspect-video overflow-hidden m-0">
          <img
            src={post.thumbnail}
            alt={`${post.title} 썸네일`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* 재생 오버레이 */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-aurora-h flex items-center justify-center shadow-glow scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={18} fill="white" color="white" />
            </div>
          </div>
          {/* 재생 시간 뱃지 */}
          <div
            className="absolute bottom-2 right-2 text-[10px] font-bold text-white bg-black/75 px-2 py-0.5 rounded"
            aria-label={`재생 시간 ${post.duration}`}
          >
            {post.duration}
          </div>
          <figcaption className="sr-only">{post.title} 썸네일</figcaption>
        </figure>

        {/* 카드 바디 */}
        <div className="p-4 space-y-3">
          {/* 작성자 + 날짜 */}
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={`${post.author.name} 프로필`}
              width={24}
              height={24}
              loading="lazy"
              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              style={{ borderRadius: '50%' }}
            />
            <span className="text-xs text-[#9090A8] font-medium truncate">{post.author.name}</span>
            <span aria-hidden="true" className="text-[#5A5A70] text-xs">·</span>
            <time dateTime={post.publishedAt} className="text-xs text-[#5A5A70] flex-shrink-0">
              {relativeTime(post.publishedAt)}
            </time>
          </div>

          {/* 제목 */}
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-aurora-1 transition-colors duration-300">
            {post.title}
          </h3>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-theme text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* 통계 */}
          <div className="flex items-center gap-3 pt-1 border-t border-white/8">
            <span className="flex items-center gap-1 text-[11px] text-[#5A5A70]" aria-label={`조회수 ${post.viewCount}`}>
              <Eye size={11} aria-hidden="true" />
              {post.viewCount}
            </span>
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 1.4 }}
              transition={{ duration: 0.2 }}
              aria-label={liked ? '좋아요 취소' : '좋아요'}
              aria-pressed={liked}
              className={`flex items-center gap-1 text-[11px] transition-colors duration-200 ${liked ? 'text-aurora-3' : 'text-[#5A5A70] hover:text-aurora-3'}`}
            >
              <Heart size={11} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
              {likeCount.toLocaleString()}
            </motion.button>
            <span className="flex items-center gap-1 text-[11px] text-[#5A5A70]" aria-label={`댓글 ${post.commentCount}개`}>
              <MessageCircle size={11} aria-hidden="true" />
              {post.commentCount}
            </span>
          </div>
        </div>
      </motion.article>

      {/* 상세 모달 */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={post.title}
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto glass border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* 썸네일 */}
              <div className="relative aspect-video">
                <img
                  src={post.thumbnail}
                  alt={`${post.title} 썸네일`}
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.95) 100%)' }}
                />
                <button
                  onClick={() => setModalOpen(false)}
                  aria-label="닫기"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-200"
                >
                  <X size={16} aria-hidden="true" />
                </button>
                <div className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/75 px-2 py-0.5 rounded">
                  {post.duration}
                </div>
              </div>

              {/* 정보 */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={`${post.author.name} 프로필`}
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    style={{ borderRadius: '50%' }}
                  />
                  <span className="text-sm font-semibold text-white">{post.author.name}</span>
                  <span aria-hidden="true" className="text-[#5A5A70] text-xs">·</span>
                  <time dateTime={post.publishedAt} className="text-xs text-[#5A5A70]">
                    {relativeTime(post.publishedAt)}
                  </time>
                </div>
                <h2 className="text-base font-bold text-white leading-snug">{post.title}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-theme text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-white/8">
                  <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
                    <Eye size={13} aria-hidden="true" /> {post.viewCount}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
                    <Heart size={13} aria-hidden="true" /> {likeCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
                    <MessageCircle size={13} aria-hidden="true" /> {post.commentCount}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
