import { createContext, useContext, useReducer, useCallback } from 'react';

/**
 * AppContext — WandR 글로벌 상태 관리
 * React Context + useReducer 패턴
 *
 * 관리 상태:
 *   - selectedDestination: 현재 선택된 여행지
 *   - searchQuery: 히어로 검색어
 *   - activeFilter: 여행지 필터 탭
 *   - theme: 'dark' | 'light'
 *   - isCouponOpen: 쿠폰 모달 오픈 여부
 */

// ── Action Types ──────────────────────────────────────────
export const ACTIONS = {
  SELECT_DESTINATION:  'SELECT_DESTINATION',
  CLEAR_DESTINATION:   'CLEAR_DESTINATION',
  SET_SEARCH_QUERY:    'SET_SEARCH_QUERY',
  SET_ACTIVE_FILTER:   'SET_ACTIVE_FILTER',
  TOGGLE_THEME:        'TOGGLE_THEME',
  SET_THEME:           'SET_THEME',
  OPEN_COUPON:         'OPEN_COUPON',
  CLOSE_COUPON:        'CLOSE_COUPON',
};

// ── Initial State ─────────────────────────────────────────
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('wandr-theme') || 'dark';
};

const initialState = {
  selectedDestination: null,
  searchQuery: '',
  activeFilter: 'all',
  theme: getInitialTheme(),
  isCouponOpen: false,
};

// ── Reducer ───────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_DESTINATION:
      return { ...state, selectedDestination: action.payload };
    case ACTIONS.CLEAR_DESTINATION:
      return { ...state, selectedDestination: null };
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case ACTIONS.SET_ACTIVE_FILTER:
      return { ...state, activeFilter: action.payload };
    case ACTIONS.TOGGLE_THEME: {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('wandr-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.classList.toggle('light', next === 'light');
      return { ...state, theme: next };
    }
    case ACTIONS.SET_THEME: {
      const t = action.payload;
      localStorage.setItem('wandr-theme', t);
      document.documentElement.classList.toggle('dark', t === 'dark');
      document.documentElement.classList.toggle('light', t === 'light');
      return { ...state, theme: t };
    }
    case ACTIONS.OPEN_COUPON:
      return { ...state, isCouponOpen: true };
    case ACTIONS.CLOSE_COUPON:
      return { ...state, isCouponOpen: false };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // 편의 액션 메서드 (컴포넌트에서 dispatch 직접 사용 불필요)
  const actions = {
    selectDestination:  useCallback((dest) => dispatch({ type: ACTIONS.SELECT_DESTINATION, payload: dest }), []),
    clearDestination:   useCallback(() => dispatch({ type: ACTIONS.CLEAR_DESTINATION }), []),
    setSearchQuery:     useCallback((q) => dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: q }), []),
    setActiveFilter:    useCallback((f) => dispatch({ type: ACTIONS.SET_ACTIVE_FILTER, payload: f }), []),
    toggleTheme:        useCallback(() => dispatch({ type: ACTIONS.TOGGLE_THEME }), []),
    setTheme:           useCallback((t) => dispatch({ type: ACTIONS.SET_THEME, payload: t }), []),
    openCoupon:         useCallback(() => dispatch({ type: ACTIONS.OPEN_COUPON }), []),
    closeCoupon:        useCallback(() => dispatch({ type: ACTIONS.CLOSE_COUPON }), []),
    toggleCoupon:       useCallback(() => dispatch({ type: state.isCouponOpen ? ACTIONS.CLOSE_COUPON : ACTIONS.OPEN_COUPON }), [state.isCouponOpen]),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// ── Custom Hook ───────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within <AppProvider>');
  return ctx;
}
