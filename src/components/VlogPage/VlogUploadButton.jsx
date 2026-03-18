import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, X, Send } from 'lucide-react';

export default function VlogUploadButton({ onUpload }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', url: '', destination: '', tags: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      if (onUpload) {
        onUpload({
          id: `vf-new-${Date.now()}`,
          author: { name: '나', avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=wandr-me&backgroundColor=ffdfbf&backgroundType=solid' },
          title: form.title,
          thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80&auto=format&fit=crop',
          duration: '--:--',
          region: '기타',
          destination: form.destination || '미정',
          viewCount: '0',
          likeCount: 0,
          commentCount: 0,
          publishedAt: new Date().toISOString(),
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        });
      }
      setOpen(false);
      setSubmitted(false);
      setForm({ title: '', url: '', destination: '', tags: '' });
    }, 1800);
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="내 브이로그 올리기"
        aria-haspopup="dialog"
        className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-aurora-h text-white text-sm font-bold shadow-glow-sm hover:shadow-glow transition-shadow duration-300"
      >
        <Video size={16} aria-hidden="true" />
        <span className="hidden sm:inline">내 브이로그 올리기</span>
        <span className="sm:hidden">올리기</span>
      </motion.button>

      {/* 모달 */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="브이로그 올리기"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto glass border border-white/15 rounded-3xl p-6 shadow-2xl"
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Video size={18} aria-hidden="true" className="text-aurora-1" />
                  내 브이로그 올리기
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="닫기"
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
                  <p className="text-4xl" aria-hidden="true">🎥</p>
                  <p className="text-white font-bold">브이로그가 등록됐어요!</p>
                  <p className="text-sm text-[#9090A8]">잠시 후 창이 닫힙니다.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="vlog-title" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      제목 <span aria-hidden="true" className="text-aurora-3">*</span>
                    </label>
                    <input
                      id="vlog-title"
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="브이로그 제목을 입력하세요"
                      maxLength={100}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="vlog-url" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      링크/URL <span aria-hidden="true" className="text-aurora-3">*</span>
                    </label>
                    <input
                      id="vlog-url"
                      type="url"
                      value={form.url}
                      onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                      placeholder="https://youtu.be/..."
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="vlog-destination" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      여행지 (선택)
                    </label>
                    <input
                      id="vlog-destination"
                      type="text"
                      value={form.destination}
                      onChange={(e) => setForm((p) => ({ ...p, destination: e.target.value }))}
                      placeholder="도쿄, 타이베이, 강릉…"
                      maxLength={50}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="vlog-tags" className="block text-xs font-semibold text-[#9090A8] mb-1.5">
                      태그 (쉼표로 구분, 선택)
                    </label>
                    <input
                      id="vlog-tags"
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                      placeholder="도쿄, 먹방, 자유여행"
                      maxLength={100}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#5A5A70] focus:outline-none focus:border-aurora-1 transition-colors duration-200"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.96 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-aurora-h text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!form.title.trim() || !form.url.trim()}
                  >
                    <Send size={15} aria-hidden="true" />
                    브이로그 등록
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
