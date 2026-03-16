import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, X, Send } from 'lucide-react';

export default function WriteButton({ roomTitle }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setForm({ title: '', content: '', tags: '' });
    }, 1800);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="글쓰기"
        aria-haspopup="dialog"
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-aurora-h text-white text-sm font-bold shadow-glow-sm hover:shadow-glow transition-shadow duration-300"
      >
        <PenLine size={16} aria-hidden="true" />
        글쓰기
      </motion.button>

      {/* 모달 */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="글쓰기"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto glass border border-white/15 rounded-3xl p-6 shadow-2xl"
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-white">
                  {roomTitle}에 글쓰기
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="글쓰기 닫기"
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-[#9090A8] hover:text-white transition-colors duration-200"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-3"
                >
                  <p className="text-4xl">🎉</p>
                  <p className="text-white font-bold">게시글이 등록됐어요!</p>
                  <p className="text-sm text-[#9090A8]">잠시 후 창이 닫힙니다.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="post-title" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      제목 <span aria-hidden="true" className="text-aurora-3">*</span>
                    </label>
                    <input
                      id="post-title"
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="제목을 입력하세요"
                      maxLength={100}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="post-content" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      내용 <span aria-hidden="true" className="text-aurora-3">*</span>
                    </label>
                    <textarea
                      id="post-content"
                      value={form.content}
                      onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                      placeholder="여행 경험을 자유롭게 공유해보세요!"
                      rows={5}
                      maxLength={2000}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="post-tags" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      태그 (쉼표로 구분)
                    </label>
                    <input
                      id="post-tags"
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                      placeholder="도쿄, 맛집, 꿀팁"
                      maxLength={100}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-aurora-h text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!form.title.trim() || !form.content.trim()}
                  >
                    <Send size={15} aria-hidden="true" />
                    게시글 등록
                  </motion.button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
