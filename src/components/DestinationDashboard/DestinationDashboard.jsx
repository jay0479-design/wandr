import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterTabs from './FilterTabs';
import DestinationCard from './DestinationCard';
import { destinations } from '../../data/destinations';

function filterDestinations(list, filter) {
  if (filter === 'all') return list;
  return list.filter(
    (d) =>
      d.region === filter ||
      d.budget === filter ||
      d.theme === filter ||
      d.tags.includes(filter)
  );
}

export default function DestinationDashboard({ selectedDestination, onSelect }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = filterDestinations(destinations, activeFilter);

  return (
    <section
      id="destinations"
      aria-label="여행지 큐레이션 대시보드"
      className="bg-obsidian"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-20 lg:py-28">

        {/* 섹션 헤더 */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
            Premium Destinations
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              어디로 떠나실 건가요?
            </h2>
            <p className="text-sm text-[#5A5A70]">
              {filtered.length}개 여행지 발견
            </p>
          </div>
        </motion.div>

        {/* 필터 탭 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </motion.div>

        {/* 카드 그리드 */}
        <div
          id={`panel-${activeFilter}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeFilter}`}
        >
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
              >
                {filtered.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    isSelected={selectedDestination?.id === dest.id}
                    onSelect={onSelect}
                    index={i}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 text-[#5A5A70]"
                role="status"
                aria-live="polite"
              >
                <p className="text-4xl mb-4" aria-hidden="true">🗺️</p>
                <p className="text-lg font-semibold">해당 조건의 여행지가 없습니다</p>
                <p className="text-sm mt-2">다른 필터를 선택해 보세요</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 카드 선택 안내 */}
        <AnimatePresence>
          {!selectedDestination && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center text-xs text-[#5A5A70] mt-10"
              aria-live="polite"
            >
              ↑ 카드를 클릭하면 날씨·투어·팁 상세 정보를 확인할 수 있어요
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
