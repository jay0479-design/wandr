# CLAUDE.md - AI Development Context

## Project Overview
WandR는 국내 2030 여행자를 위한 원스톱 여행 정보 통합 플랫폼입니다.
전 세계 프리미엄 여행지 정보·날씨·투어·현지 팁·쿠폰을 한 곳에서 제공하며,
Apple 수준의 글래스모피즘 UI와 WCAG 2.2 AA 완전 준수를 핵심 가치로 합니다.

## AI 활용 전략
- **개발 도구**: Claude Code (Anthropic Claude Sonnet 4.6)
- **활용 범위**: 컴포넌트 설계, 코드 리팩토링, 접근성 검증, 문서화, 디버깅
- **프롬프트 패턴**: Component-first 설계 → AI 코드 생성 → 수동 리뷰 → 반복 개선
- **워크플로우**: 요구사항 정의 → PRD 작성 → AI 초안 생성 → 리뷰 → 테스트 → 배포

## AI Co-Development 가이드라인
- 모든 AI 생성 코드는 수동 리뷰 및 빌드 테스트 후 반영
- AI 제안사항은 프로젝트 컨벤션(Tailwind 유틸리티, 시맨틱 HTML, Framer Motion)에 맞게 수정
- 복잡한 비즈니스 로직: AI 초안 → 수동 정제 워크플로우 적용
- 접근성(a11y): AI가 생성한 모든 인터랙티브 요소에 aria-* 속성 수동 검증

## 절대 불변 규칙 (AI Agent용)
```
❌ 시맨틱 태그(section/article/nav/main/header/footer/dl/table) 변경 금지
❌ aria-* 속성, role, aria-label 등 접근성 속성 변경 금지
❌ Framer Motion variants/transition/animate 구조 변경 금지
❌ 요청 범위 외 파일 수정 금지
❌ node_modules, .git, dist 경로 수정 금지
✅ 변경 전 반드시 Read 도구로 파일 현재 상태 확인
✅ 빌드 테스트(npm run build) 각 단계 후 수행
```

## 프로젝트 구조
```
src/
├── components/     # UI 컴포넌트 (Atomic Design 기반)
│   ├── Header/
│   ├── Hero/
│   ├── DestinationDashboard/
│   ├── WeatherWidget/
│   ├── TourCards/
│   ├── VlogFeed/
│   ├── TipsAccordion/
│   └── CouponSystem/
├── context/        # React Context (전역 상태)
├── data/           # 정적 데이터 및 Mock 데이터
├── hooks/          # 커스텀 React Hooks
├── services/       # API 서비스 레이어 (Mock → Real 전환 대비)
└── index.css       # 글로벌 스타일 및 디자인 토큰
```

## 코딩 컨벤션
- 컴포넌트: PascalCase 함수형 컴포넌트 + default export
- 훅: `use` 접두사 + camelCase (`useWeather`, `useSearch`)
- 스타일: Tailwind CSS 유틸리티 클래스 우선, 커스텀 토큰 활용
- 애니메이션: Framer Motion 선언적 API (`variants` 패턴 권장)
- 접근성: WCAG 2.2 AA 필수 준수 — 모든 인터랙티브 요소에 `aria-label` 또는 visible label

## 디자인 시스템
- **테마**: 다크모드 기본, 라이트모드 선택 (CSS 변수 + `html.dark` 클래스 전략)
- **색상 토큰**: Aurora 악센트 시스템 (`aurora-1: #00D4FF`, `aurora-2: #7B5EA7` 등)
- **글래스모피즘**: `backdrop-filter: blur(24px) saturate(180%)` + 반투명 테두리
- **타이포그래피**: Pretendard Variable (한국어 최적화 가변 폰트)

## 빌드 & 배포
- 빌드: `npm run build` (Vite 8)
- 배포: Vercel (자동 배포, `main` 브랜치 push 시)
- 번들 목표: gzip 기준 JS < 130KB, CSS < 20KB
- 실측: JS 125KB gzip, CSS 6.7KB gzip (2026-03-15 기준)

## 테스트 기준
- Lighthouse 접근성: ≥ 90 (실측 95)
- axe-core violations: 0건
- 키보드 전용 탐색: 전 기능 동작
- 모바일 (375px~): 반응형 정상
