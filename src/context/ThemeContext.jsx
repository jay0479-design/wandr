/**
 * ThemeContext — 테마(다크/라이트) 전용 컨텍스트
 *
 * AppContext의 theme 상태를 구독하는 경량 래퍼입니다.
 * 테마 관련 로직만 필요한 컴포넌트에서 useTheme()으로 간결하게 사용.
 *
 * @example
 * const { theme, toggleTheme, isDark } = useTheme();
 */
import { useApp } from './AppContext';

export function useTheme() {
  const { state, actions } = useApp();
  return {
    theme: state.theme,
    isDark: state.theme === 'dark',
    isLight: state.theme === 'light',
    toggleTheme: actions.toggleTheme,
    setTheme: actions.setTheme,
  };
}
