import { useState, useEffect, useCallback } from 'react';
import { weatherAPI } from '../services/api';

/**
 * useWeather — 날씨 데이터 페칭 훅
 *
 * @param {string} city - 날씨 조회 도시명 (MOCK_WEATHER 키 값)
 * @returns {{ weather, loading, error, refresh, updatedAt }}
 *
 * - loading/error/data 3-state 패턴
 * - city 변경 시 자동 재조회
 * - refresh() 수동 재시도 (retry 포함)
 */
export function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [retryCount, setRetryCount] = useState(0);

  const fetchWeather = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const data = await weatherAPI.getByCity(city);
      setWeather(data);
      setUpdatedAt(new Date());
    } catch (err) {
      setError(err.message || '날씨 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [city, retryCount]); // retryCount 변경 시 재실행

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const refresh = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  return { weather, loading, error, refresh, updatedAt };
}
