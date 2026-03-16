import { motion } from 'framer-motion';
import { Heart, MessageSquare, Eye } from 'lucide-react';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function PostCard({ post, liked, onLike, onClick }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-white/20 transition-colors duration-300"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`게시글 ${post.title} 열기`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="flex gap-4 p-5">
        {/* 썸네일 */}
        {post.thumbnail && (
          <div className="flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden">
            <img
              src={post.thumbnail}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* 작성자 */}
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs text-[#9090A8]">{post.author.name}</span>
            <span className="text-xs text-[#5A5A70]">·</span>
            <time dateTime={post.publishedAt} className="text-xs text-[#5A5A70]">
              {formatDate(post.publishedAt)}
            </time>
          </div>

          {/* 제목 */}
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-aurora-1 transition-colors duration-200">
            {post.title}
          </h3>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full tag-theme">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 통계 */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-white/8">
        <button
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          aria-label={liked ? '좋아요 취소' : '좋아요'}
          aria-pressed={liked}
          className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${liked ? 'text-aurora-3' : 'text-[#9090A8] hover:text-aurora-3'}`}
        >
          <Heart size={13} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
          {post.likeCount + (liked ? 1 : 0)}
        </button>
        <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
          <MessageSquare size={13} aria-hidden="true" />
          {post.commentCount}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[#9090A8]">
          <Eye size={13} aria-hidden="true" />
          {post.viewCount}
        </span>
      </div>
    </motion.article>
  );
}
