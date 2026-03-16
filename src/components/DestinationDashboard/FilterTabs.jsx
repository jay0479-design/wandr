import { useRef } from 'react';
import { motion } from 'framer-motion';
import { filterCategories } from '../../data/destinations';

export default function FilterTabs({ activeFilter, onFilterChange }) {
  const tabsRef = useRef([]);

  const handleKeyDown = (e, idx) => {
    const tabs = tabsRef.current.filter(Boolean);
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % tabs.length;
      tabs[next].focus();
      onFilterChange(filterCategories[next].id);
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + tabs.length) % tabs.length;
      tabs[prev].focus();
      onFilterChange(filterCategories[prev].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="여행지 필터"
      className="flex gap-2 overflow-x-auto py-1 px-1 -mx-1 no-scrollbar"
    >
      {filterCategories.map(({ id, label }, idx) => {
        const isActive = activeFilter === id;
        return (
          <button
            key={id}
            ref={(el) => (tabsRef.current[idx] = el)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            onClick={() => onFilterChange(id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            tabIndex={isActive ? 0 : -1}
            className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-aurora-1 ${
              isActive
                ? 'text-white shadow-glow-sm'
                : 'text-[#9090A8] hover:text-white glass'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
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
  );
}
