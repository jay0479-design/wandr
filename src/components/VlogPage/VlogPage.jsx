import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { vlogFeedPosts, parseViewCount } from '../../data/vlog-feed';
import VlogFeedCard from './VlogFeedCard';
import CameraEventBanner from './CameraEventBanner';
import VlogUploadButton from './VlogUploadButton';

const PAGE_SIZE = 6;

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: '유럽', label: '🏰 유럽' },
  { id: '아시아', label: '🌏 아시아' },
  { id: '국내', label: '🇰🇷 국내' },
  { id: '대만', label: '🇹🇼 대만' },
];

const SORTS = [
  { id: 'latest', label: '최신순' },
  { id: 'popular', label: '인기순' },
  { id: 'views', label: '조회순' },
];

function filterPosts(posts, filter) {
  if (filter === 'all') return posts;
  if (filter === '대만') return posts.filter((p) => p.tags.includes('대만'));
  return posts.filter((p) => p.region === filter);
}

function sortPosts(posts, sort) {
  const arr = [...posts];
  if (sort === 'popular') return arr.sort((a, b) => b.likeCount - a.likeCount);
  if (sort === 'views') return arr.sort((a, b) => parseViewCount(b.viewCount) - parseViewCount(a.viewCount));
  // latest (default)
  return arr.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export default function VlogPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [userPosts, setUserPosts] = useState([]);

  const allPosts = [...userPosts, ...vlogFeedPosts];
  const filtered = filterPosts(allPosts, activeFilter);
  const sorted = sortPosts(filtered, activeSort);
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (id) => {
    setActiveSort(id);
    setVisibleCount(PAGE_SIZE);
  };

  const handleUpload = (newPost) => {
    setUserPosts((p) => [newPost, ...p]);
    setActiveFilter('all');
    setActiveSort('latest');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-12 lg:py-20 space-y-12">

      {/* 페이지 헤더 */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
          Travel Vlog Feed
        </p>
        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
          여행자들의 브이로그
        </h1>
        <p className="text-[#9090A8] text-lg max-w-xl leading-relaxed">
          직접 찍고, 직접 공유하는 진짜 여행 영상
        </p>
      </motion.div>

      {/* 필터 칩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <div
          role="tablist"
          aria-label="지역 필터"
          className="flex gap-2 overflow-x-auto py-1 no-scrollbar"
        >
          {FILTERS.map(({ id, label }) => {
            const isActive = activeFilter === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(id)}
                className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-aurora-1 ${
                  isActive ? 'text-white shadow-glow-sm' : 'text-[#9090A8] hover:text-white glass'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="vlog-filter-pill"
                    className="absolute inset-0 rounded-full bg-aurora-h"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 정렬 탭 + 결과 수 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#5A5A70]">
          {sorted.length}개 브이로그
        </p>
        <div role="group" aria-label="정렬 기준" className="flex gap-1">
          {SORTS.map(({ id, label }) => (
            <button
              key={id}
              aria-pressed={activeSort === id}
              onClick={() => handleSortChange(id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeSort === id
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'text-[#5A5A70] hover:text-[#9090A8]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 */}
      <div
        role="region"
        aria-label="브이로그 목록"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={`${activeFilter}-${activeSort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            >
              {visible.map((post, i) => (
                <VlogFeedCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-[#5A5A70]"
              role="status"
            >
              <p className="text-4xl mb-4" aria-hidden="true">🎥</p>
              <p className="text-lg font-semibold">해당 조건의 브이로그가 없습니다</p>
              <p className="text-sm mt-2">다른 필터를 선택해 보세요</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 더 보기 버튼 */}
      <AnimatePresence>
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full glass border border-white/15 text-sm font-semibold text-[#9090A8] hover:text-white transition-colors duration-200"
              aria-label={`브이로그 더 보기 (${sorted.length - visibleCount}개 남음)`}
            >
              더 보기
              <ChevronDown size={16} aria-hidden="true" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 카메라 이벤트 배너 */}
      <CameraEventBanner />

      {/* 업로드 FAB */}
      <VlogUploadButton onUpload={handleUpload} />
    </div>
  );
}
