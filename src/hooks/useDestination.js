import { useState, useMemo, useCallback } from 'react';
import { destinations, filterCategories } from '../data/destinations';

/**
 * useDestination — 여행지 필터링 & 정렬 훅
 *
 * @returns {{ filtered, activeFilter, setActiveFilter, categories, selectedDestination, selectDestination, clearSelection }}
 *
 * - filterCategories 기반 탭 필터
 * - useMemo로 필터링 연산 최적화 (불필요한 재계산 방지)
 * - 선택된 여행지 상태 통합 관리
 */
export function useDestination() {
  const [activeFilter, setActiveFilter] = useState(filterCategories[0]?.id ?? 'all');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return destinations;
    return destinations.filter((d) => {
      const cat = filterCategories.find((c) => c.id === activeFilter);
      if (!cat) return true;
      return d.tags.some((t) => cat.tags?.includes(t)) || d.region === cat.region;
    });
  }, [activeFilter]);

  const selectDestination = useCallback((dest) => {
    setSelectedDestination(dest);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedDestination(null);
  }, []);

  return {
    filtered,
    activeFilter,
    setActiveFilter,
    categories: filterCategories,
    selectedDestination,
    selectDestination,
    clearSelection,
  };
}
