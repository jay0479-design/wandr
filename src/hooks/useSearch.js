import { useState, useEffect, useCallback, useRef } from 'react';
import { destinationAPI } from '../services/api';

/**
 * useSearch — 여행지 검색 훅
 *
 * @param {string} initialQuery - 초기 검색어
 * @param {number} debounceMs - debounce 딜레이 (기본 200ms)
 * @returns {{ query, setQuery, results, loading, error, showSuggestions, setShowSuggestions, handleSelect }}
 *
 * - debounce로 과도한 API 호출 방지
 * - loading/error/data 3-state 패턴
 * - 빈 쿼리 시 인기 목적지 5개 반환
 */
export function useSearch({ initialQuery = '', debounceMs = 200, onSelect } = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = query.trim()
          ? await destinationAPI.search(query)
          : await destinationAPI.getPopular(5);
        setResults(data);
      } catch (err) {
        setError(err.message || '검색 중 오류가 발생했습니다.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(debounceTimer.current);
  }, [query, debounceMs]);

  const handleSelect = useCallback((dest) => {
    setQuery(dest.name);
    setShowSuggestions(false);
    onSelect?.(dest);
  }, [onSelect]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    showSuggestions,
    setShowSuggestions,
    handleSelect,
  };
}
