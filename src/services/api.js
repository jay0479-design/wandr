/**
 * Mock API 서비스 레이어
 *
 * 실제 API 호출 구조를 미러링합니다.
 * 실서비스 전환 시 이 파일만 교체하면 컴포넌트/훅 코드 변경 최소화.
 *
 * 패턴: async/await + 네트워크 지연 시뮬레이션 + 에러 시뮬레이션
 */

import { destinations } from '../data/destinations';
import { getToursForDestination } from '../data/tours';
import { getTipsForDestination } from '../data/tips';
import { getVlogsForDestination } from '../data/vlogs';
import { coupons } from '../data/coupons';

// ── 설정 ─────────────────────────────────────────────────
const CONFIG = {
  baseDelay: 400,      // 기본 네트워크 지연 (ms)
  errorRate: 0,        // 에러 시뮬레이션 비율 (0~1, 0 = 에러 없음)
};

// ── 내부 유틸 ─────────────────────────────────────────────
function delay(ms = CONFIG.baseDelay) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeThrow(resource) {
  if (Math.random() < CONFIG.errorRate) {
    throw new Error(`[Mock API] ${resource} 요청 실패 (시뮬레이션)`);
  }
}

// ── Mock 날씨 데이터 ──────────────────────────────────────
const MOCK_WEATHER = {
  Tokyo:      { temp: 18, feelsLike: 16, humidity: 62, windSpeed: 4.2, visibility: 10, condition: 'clear',  description: '맑음',      uvIndex: '보통',      localTime: 'Asia/Tokyo' },
  Paris:      { temp: 14, feelsLike: 12, humidity: 74, windSpeed: 6.1, visibility: 9,  condition: 'cloudy', description: '흐림',      uvIndex: '낮음',      localTime: 'Europe/Paris' },
  Denpasar:   { temp: 29, feelsLike: 34, humidity: 85, windSpeed: 2.8, visibility: 8,  condition: 'rain',   description: '소나기',    uvIndex: '높음',      localTime: 'Asia/Makassar' },
  'New York': { temp: 7,  feelsLike: 4,  humidity: 58, windSpeed: 9.5, visibility: 12, condition: 'clear',  description: '맑음',      uvIndex: '낮음',      localTime: 'America/New_York' },
  Santorini:  { temp: 22, feelsLike: 21, humidity: 55, windSpeed: 5.4, visibility: 20, condition: 'clear',  description: '화창',      uvIndex: '높음',      localTime: 'Europe/Athens' },
  Prague:     { temp: 10, feelsLike: 8,  humidity: 71, windSpeed: 4.0, visibility: 8,  condition: 'cloudy', description: '구름 많음', uvIndex: '낮음',      localTime: 'Europe/Prague' },
  Dubai:      { temp: 35, feelsLike: 38, humidity: 40, windSpeed: 7.2, visibility: 15, condition: 'clear',  description: '화창·더움', uvIndex: '매우 높음', localTime: 'Asia/Dubai' },
  Lisbon:     { temp: 19, feelsLike: 18, humidity: 65, windSpeed: 5.5, visibility: 12, condition: 'clear',  description: '맑음',      uvIndex: '보통',      localTime: 'Europe/Lisbon' },
};

// ── 날씨 API ──────────────────────────────────────────────
export const weatherAPI = {
  /**
   * 도시별 날씨 조회
   * 실서비스: GET /api/weather?city={city} → OpenWeather API 프록시
   */
  async getByCity(city) {
    await delay(600);
    maybeThrow('weather');
    const data = MOCK_WEATHER[city];
    if (!data) throw new Error(`'${city}' 날씨 정보를 찾을 수 없습니다.`);
    return data;
  },
};

// ── 여행지 API ────────────────────────────────────────────
export const destinationAPI = {
  /**
   * 전체 여행지 목록 (필터 옵션)
   * 실서비스: GET /api/destinations?filter={filter}
   */
  async getAll(filter = 'all') {
    await delay(CONFIG.baseDelay);
    maybeThrow('destinations');
    if (filter === 'all') return destinations;
    return destinations.filter(
      (d) => d.region === filter || d.tags.includes(filter)
    );
  },

  /**
   * 단일 여행지 조회
   * 실서비스: GET /api/destinations/{id}
   */
  async getById(id) {
    await delay(CONFIG.baseDelay);
    maybeThrow('destination');
    const dest = destinations.find((d) => d.id === id);
    if (!dest) throw new Error(`여행지 ID '${id}'를 찾을 수 없습니다.`);
    return dest;
  },

  /**
   * 여행지 검색
   * 실서비스: GET /api/destinations/search?q={query}
   */
  async search(query) {
    await delay(200); // 검색은 빠르게
    maybeThrow('search');
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  },

  /**
   * 인기 여행지 (홈 화면 기본 표시)
   * 실서비스: GET /api/destinations/popular?limit={limit}
   */
  async getPopular(limit = 5) {
    await delay(200);
    maybeThrow('popular');
    return destinations.slice(0, limit);
  },
};

// ── 투어 API ──────────────────────────────────────────────
export const tourAPI = {
  /**
   * 여행지별 투어 목록
   * 실서비스: GET /api/tours?destination={slug}
   */
  async getByDestination(slug) {
    await delay(CONFIG.baseDelay);
    maybeThrow('tours');
    return getToursForDestination(slug);
  },
};

// ── 브이로그 API ──────────────────────────────────────────
export const vlogAPI = {
  /**
   * 여행지별 브이로그 목록
   * 실서비스: GET /api/vlogs?destination={slug}
   */
  async getByDestination(slug) {
    await delay(CONFIG.baseDelay);
    maybeThrow('vlogs');
    return getVlogsForDestination(slug);
  },
};

// ── 팁 API ────────────────────────────────────────────────
export const tipsAPI = {
  /**
   * 여행지별 현지 팁
   * 실서비스: GET /api/tips?destination={slug}
   */
  async getByDestination(slug) {
    await delay(CONFIG.baseDelay);
    maybeThrow('tips');
    return getTipsForDestination(slug);
  },
};

// ── 쿠폰 API ──────────────────────────────────────────────
export const couponAPI = {
  /**
   * 사용 가능 쿠폰 목록
   * 실서비스: GET /api/coupons (인증 헤더 포함)
   */
  async getAvailable() {
    await delay(300);
    maybeThrow('coupons');
    return coupons.filter((c) => new Date(c.expiry) > new Date());
  },
};
