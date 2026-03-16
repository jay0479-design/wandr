import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function CommentItem({ comment }) {
  const [liked, setLiked] = useState(false);
  return (
    <li className="flex gap-3">
      <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white">{comment.author.name}</span>
          <time dateTime={comment.publishedAt} className="text-[10px] text-[#5A5A70]">
            {formatDate(comment.publishedAt)}
          </time>
        </div>
        <p className="text-sm text-[#9090A8] leading-relaxed">{comment.content}</p>
        <button
          onClick={() => setLiked((p) => !p)}
          aria-label={liked ? '댓글 좋아요 취소' : '댓글 좋아요'}
          aria-pressed={liked}
          className={`flex items-center gap-1 text-xs transition-colors duration-200 ${liked ? 'text-aurora-3' : 'text-[#5A5A70] hover:text-aurora-3'}`}
        >
          <Heart size={11} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
          {comment.likeCount + (liked ? 1 : 0)}
        </button>
      </div>
    </li>
  );
}

export default function CommentSection({ comments }) {
  const [value, setValue] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    const newComment = {
      id: `local-${Date.now()}`,
      author: { name: '나', avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=wandr-me&backgroundColor=ffdfbf&backgroundType=solid' },
      content: trimmed,
      likeCount: 0,
      publishedAt: new Date().toISOString(),
    };
    setLocalComments((prev) => [...prev, newComment]);
    setValue('');
  };

  return (
    <section aria-label="댓글" className="space-y-6">
      <h3 className="text-base font-bold text-white">
        댓글 <span className="text-aurora-1 text-sm">{localComments.length}</span>
      </h3>

      {/* 댓글 목록 */}
      <ul className="space-y-5" aria-live="polite" aria-label="댓글 목록">
        <AnimatePresence initial={false}>
          {localComments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CommentItem comment={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </ul>

      {/* 댓글 작성 */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-3"
        aria-label="댓글 작성"
      >
        <img
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=wandr-me&backgroundColor=ffdfbf&backgroundType=solid"
          alt="내 프로필"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full flex-shrink-0"
          style={{ objectFit: 'cover' }}
        />
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="댓글을 입력하세요..."
            aria-label="댓글 내용"
            maxLength={500}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.93 }}
            aria-label="댓글 등록"
            disabled={!value.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-aurora-h text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity duration-200"
          >
            <Send size={15} aria-hidden="true" />
          </motion.button>
        </div>
      </form>
    </section>
  );
}
