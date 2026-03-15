import { Component } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

/**
 * React Error Boundary — 주요 섹션 에러 격리 패턴
 * class 컴포넌트만 Error Boundary 구현 가능 (React 제약)
 *
 * 사용법:
 *   <ErrorBoundary section="날씨 위젯">
 *     <WeatherWidget />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // 실서비스에서는 Sentry / 자체 로깅 API 로 전송
    console.error(`[ErrorBoundary] ${this.props.section ?? '컴포넌트'} 에러:`, error, info);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const { section = '섹션', minimal = false } = this.props;

    // minimal 모드: 인라인 소형 에러 (위젯 내부용)
    if (minimal) {
      return (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 rounded-2xl glass border border-[rgba(255,107,107,0.25)] text-sm"
        >
          <AlertTriangle size={16} className="text-[#FF6B6B] flex-shrink-0" aria-hidden="true" />
          <span className="text-[#9090A8]">{section} 로딩 실패</span>
          <button
            onClick={this.handleReset}
            aria-label={`${section} 다시 시도`}
            className="ml-auto text-xs text-aurora-1 font-bold hover:underline flex-shrink-0"
          >
            재시도
          </button>
        </div>
      );
    }

    // 풀 에러 UI (섹션 단위)
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex flex-col items-center justify-center gap-6 py-20 px-8 text-center"
      >
        {/* 에러 아이콘 */}
        <div className="w-16 h-16 rounded-full bg-[rgba(255,107,107,0.12)] border border-[rgba(255,107,107,0.25)] flex items-center justify-center">
          <AlertTriangle size={28} aria-hidden="true" className="text-[#FF6B6B]" />
        </div>

        {/* 메시지 */}
        <div className="space-y-2">
          <p className="text-base font-bold text-white">
            {section}을 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="text-sm text-[#5A5A70] max-w-sm mx-auto leading-relaxed">
            일시적인 오류입니다. 아래 버튼을 눌러 다시 시도해 주세요.
          </p>
        </div>

        {/* 재시도 버튼 */}
        <button
          onClick={this.handleReset}
          aria-label={`${section} 다시 불러오기`}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-aurora-h text-white text-sm font-bold hover:shadow-glow-sm transition-shadow"
        >
          <RefreshCw size={14} aria-hidden="true" />
          다시 시도
        </button>
      </div>
    );
  }
}
