import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';

const SOURCE_ICON = { roulette: '🎰', attendance: '📅', quiz: '🧠' };
const SOURCE_LABEL = { roulette: '룰렛 당첨', attendance: '출석 보상', quiz: '퀴즈 보상' };

const TYPE_FILTERS = [
  { id: 'all',      label: '전체' },
  { id: 'credit',   label: '적립금' },
  { id: 'coupon',   label: '상품권' },
  { id: 'product',  label: '실물상품' },
  { id: 'airline',  label: '항공권' },
];

const TYPE_BADGE = {
  credit:  { label: '적립금',  cls: 'bg-aurora-1/15 text-aurora-1 border-aurora-1/30' },
  coupon:  { label: '상품권',  cls: 'bg-aurora-4/15 text-aurora-4 border-aurora-4/30' },
  product: { label: '실물상품', cls: 'bg-aurora-2/15 text-aurora-2 border-aurora-2/30' },
  airline: { label: '항공권',  cls: 'bg-aurora-3/15 text-aurora-3 border-aurora-3/30' },
};

function formatDate(iso) {
  const d = new Date(iso);
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function RewardHistory() {
  const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? user.rewards
      : user.rewards.filter((r) => r.type === activeFilter);

  return (
    <section aria-labelledby="history-heading" className="space-y-4">
      <h2 id="history-heading" className="text-xl font-extrabold text-white">
        당첨 내역
      </h2>

      {/* 필터 탭 */}
      <div
        role="tablist"
        aria-label="보상 유형 필터"
        className="flex gap-2 overflow-x-auto py-1 no-scrollbar"
      >
        {TYPE_FILTERS.map(({ id, label }) => {
          const isActive = activeFilter === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(id)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-aurora-1 ${
                isActive ? 'text-white shadow-glow-sm' : 'text-[#9090A8] hover:text-white glass'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="history-filter-pill"
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

      {/* 내역 리스트 */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-[#5A5A70]"
            role="status"
          >
            <p className="text-3xl mb-3" aria-hidden="true">🎁</p>
            <p className="text-sm font-semibold">아직 내역이 없습니다</p>
            <p className="text-xs mt-1">이벤트에 참여해 보세요!</p>
          </motion.div>
        ) : (
          <motion.ul
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="list"
            aria-label="보상 내역 목록"
            className="glass border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/8"
          >
            {filtered.map((reward, i) => {
              const badge = TYPE_BADGE[reward.type] || TYPE_BADGE.credit;
              return (
                <motion.li
                  key={reward.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">
                    {SOURCE_ICON[reward.source] || '🎁'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{reward.name}</p>
                    <p className="text-xs text-[#5A5A70] mt-0.5">
                      {SOURCE_LABEL[reward.source] || '보상'}
                      {reward.type === 'credit' && reward.value > 0
                        ? ` · +₩${reward.value.toLocaleString()}`
                        : ' · 마이쿠폰함에서 확인'}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right space-y-1">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                    <p className="text-[10px] text-[#5A5A70]">{formatDate(reward.wonAt)}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {filtered.length > 0 && (
        <p className="text-center text-xs text-[#5A5A70]" role="status" aria-live="polite">
          총 {filtered.length}개 내역
        </p>
      )}
    </section>
  );
}
