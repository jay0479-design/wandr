import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Eye, MessageSquare, Share2 } from 'lucide-react';
import CommentSection from './CommentSection';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// 마크다운 굵게(**text**) 처리
function renderContent(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className={line === '' ? 'py-1' : 'text-sm text-[#9090A8] leading-relaxed'}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
        )}
      </p>
    );
  });
}

export default function PostDetail({ post, onBack }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label={post.title}
    >
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-[#9090A8] hover:text-white transition-colors duration-200 mb-6"
        aria-label="목록으로 돌아가기"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        목록으로
      </button>

      {/* 썸네일 */}
      {post.thumbnail && (
        <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden mb-8">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* 헤더 */}
      <div className="space-y-4 mb-8">
        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full tag-theme">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        {/* 작성자 & 날짜 */}
        <div className="flex items-center gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-white">{post.author.name}</p>
            <time dateTime={post.publishedAt} className="text-xs text-[#5A5A70]">
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="glass border border-white/10 rounded-2xl p-6 mb-8 space-y-1">
        {renderContent(post.content)}
      </div>

      {/* 반응 바 */}
      <div className="flex items-center gap-6 pb-8 border-b border-white/10 mb-8">
        <motion.button
          onClick={() => setLiked((p) => !p)}
          whileTap={{ scale: 0.9 }}
          aria-label={liked ? '좋아요 취소' : '좋아요'}
          aria-pressed={liked}
          className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${liked ? 'text-aurora-3' : 'text-[#9090A8] hover:text-aurora-3'}`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
          {post.likeCount + (liked ? 1 : 0)}
        </motion.button>
        <span className="flex items-center gap-2 text-sm text-[#9090A8]">
          <MessageSquare size={18} aria-hidden="true" />
          {post.commentCount}
        </span>
        <span className="flex items-center gap-2 text-sm text-[#9090A8]">
          <Eye size={18} aria-hidden="true" />
          {post.viewCount}
        </span>
        <button
          aria-label="공유하기"
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
          className="ml-auto flex items-center gap-2 text-sm text-[#9090A8] hover:text-white transition-colors duration-200"
        >
          <Share2 size={16} aria-hidden="true" />
          공유
        </button>
      </div>

      {/* 댓글 */}
      <CommentSection comments={post.comments || []} />
    </motion.article>
  );
}
