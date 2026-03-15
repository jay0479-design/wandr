# Development Log — WandR

> AI-Native 개발 방식으로 제작된 해커톤 출품작의 개발 일지입니다.
> Claude Code (Anthropic) + 수동 리뷰 워크플로우로 진행되었습니다.

---

## Phase 1: 프로젝트 설계 (Day 1 — 오전)

### 문제 정의
국내 2030 여행자의 해외여행 정보 수집 과정을 관찰한 결과:
- 평균 45분 이상을 정보 수집에 소요 (구글·네이버·인스타·유튜브 교차 탐색)
- 날씨·투어·팁·쿠폰 정보가 4~5개 별도 채널에 분산
- 한국어로 된 신뢰할 수 있는 통합 정보 소스 부재

### 사용자 페르소나 3인 정의

| 페르소나 | 김여행 (28, 직장인) | 이탐험 (24, 대학생) | 박휴식 (32, 신혼부부) |
|---------|-------------------|-------------------|---------------------|
| 여행 빈도 | 연 2~3회 | 방학마다 | 첫 신혼여행 준비 중 |
| 핵심 니즈 | 빠른 정보 통합 | 영상 후기, 가성비 | 코스 비교, 쿠폰 |
| 페인포인트 | 정보 파편화 | SNS 과부하 | 커플 특화 정보 부족 |

### 기술 스택 선택 근거

| 기술 | 선택 이유 | 대안 검토 |
|------|-----------|-----------|
| React 19 | Concurrent Features + 풍부한 생태계 | Vue 3 (팀 친숙도 낮음) |
| Vite 8 | HMR 최고속, ES Module 네이티브 | CRA (빌드 속도 느림) |
| Tailwind CSS 3 | 디자인 토큰 통합, 번들 최적화 | styled-components (런타임 오버헤드) |
| Framer Motion 12 | 선언적 API, 접근성 연동 | GSAP (라이선스 비용) |
| Pretendard | 한국어 최적화 가변 폰트, 서브셋 자동화 | Noto Sans KR (파일 크기 큼) |

---

## Phase 2: 디자인 시스템 구축 (Day 1 — 오후)

### 글래스모피즘 선택 이유
- **여행 콘텐츠의 시각적 몰입감**: 풍경 사진 위에 반투명 UI가 자연스럽게 조화
- **정보 계층 구분**: 투명도 차이로 배경(장소)과 정보(위젯)를 직관적으로 분리
- **Apple 트렌드 부합**: iOS 18 · visionOS의 글래스 패턴과 일치 → 프리미엄 인식

### Aurora 색상 시스템 설계
오로라(북극광)에서 영감 — 여행의 설렘, 발견, 미지를 색으로 표현:
```
aurora-1 (#00D4FF) — Cyan: 청명한 하늘, 바다, 신선함 → CTA 버튼, 링크
aurora-2 (#7B5EA7) — Violet: 신비로운 탐험, 황혼 → 보조 그라디언트
aurora-3 (#FF6B6B) — Coral: 에너지, 열정, 할인 → 뱃지, 경고
aurora-4 (#FFD93D) — Gold: 따뜻한 햇살, 별점 → 평점, 추천
```

### 타이포그래피 스케일: 모듈러 스케일 1.25 기반
- `display-2xl`: 72px — Hero H1
- `display-lg`: 48px — 섹션 헤드
- `body-md`: 16px — 일반 본문
- `caption`: 12px — 라벨, 배지

### WCAG 2.2 AA 색상 대비 전수 검증
모든 전경색-배경색 조합을 WebAIM Contrast Checker로 검증:
- `#F0F0F5` on `#0A0A0F`: 18.1:1 ✅ AAA
- `#00D4FF` on `#0A0A0F`: 9.2:1 ✅ AA
- `#9090A8` on `#0A0A0F`: 5.8:1 ✅ AA
- `#5A5A70` on `#0A0A0F`: 3.1:1 ⚠️ 장식용만 (비필수 텍스트 한정)

---

## Phase 3: 핵심 기능 구현 (Day 1 후반 ~ Day 2 전반)

### Hero 섹션
- 3겹 오버레이 시스템 (linear-gradient + radial vignette + side-fade)
- `scroll-snap` 검색 드롭다운 + `role="listbox"` + `aria-autocomplete`
- `100svh` (Safari-safe) 풀스크린
- Framer Motion stagger container/item variants

### DestinationDashboard
- `role="tablist"` 필터 탭 + 화살표 키 네비게이션
- `layoutId="filter-pill"` spring 인디케이터
- `AnimatePresence mode="wait"` 필터 전환
- `role="status" aria-live="polite"` 빈 결과 상태

### WeatherWidget
- Mock 데이터 (실제 API: OpenWeather API 연동 예정)
- `useEffect` + `useCallback` 기반 비동기 패턴
- **에러 상태**: `WifiOff` 아이콘 + "다시 시도" 버튼
- `useLocalTime` 커스텀 훅: `Intl.DateTimeFormat` 시간대별 실시간 시각
- `<dl>` 상세 그리드, `<time datetime>` 시맨틱

### TourCards
- 가로 스크롤 슬라이더 (`overflow-x-auto`)
- `snap-x snap-mandatory` CSS 스냅 (모바일 최적화)
- `WebkitOverflowScrolling: 'touch'` iOS 모멘텀 스크롤
- 화살표 버튼 `scrollBy` + `role="list"` 접근성

### TipsAccordion
- `useId()` 고유 ID 생성
- `aria-expanded`, `aria-controls`, `role="region" aria-labelledby`
- 높이 애니메이션 (0 → auto) with `AnimatePresence`
- 카드결제 비교표: `<table>` + `<caption>` + `scope="col"/"row"`

### CouponFAB
- 포커스 트랩 (Tab 순환, ESC 닫기, `prevFocusRef` 복원)
- `aria-haspopup="dialog" aria-expanded aria-controls`
- Clipboard API (`navigator.clipboard.writeText`) + `execCommand` fallback
- `aria-live="polite"` 복사 완료 알림

---

## Phase 4: 접근성 및 최적화 (Day 2)

### WCAG 2.2 AA 완전 준수
- 모든 인터랙티브 요소: `aria-label` 또는 visible label
- 키보드 전용 탐색: Tab/Enter/Space/ESC/Arrow Keys
- 포커스 트랩: 모달 2개 (CouponFAB, VlogModal)
- Skip link: `#main-content` 바로가기
- `prefers-reduced-motion` 미디어쿼리 대응

### 번들 최적화
- Tailwind CSS `purge`: 미사용 스타일 자동 제거
- 이미지: Unsplash CDN + `loading="lazy"` + `fetchpriority="high"` (Hero만)
- 폰트: CDN `preconnect` + `font-display: swap`
- **최종 번들**: JS 124.97KB gzip, CSS 6.66KB gzip ✅

### 반응형 레이아웃
- Mobile first: `375px` (xs) 기준
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1440px`
- Hero: `100svh` (Safari safe-area 대응)
- 터치 인터랙션: `touch-action`, `scroll-snap`, `WebkitOverflowScrolling`

---

## Phase 5: 아키텍처 강화 (Day 2 후반)

### 상태 관리 구조화
- `AppContext` (React Context + useReducer): 선택 여행지, 검색어, 필터, 테마
- `ErrorBoundary`: React 에러 경계 패턴, 주요 섹션 래핑

### 커스텀 훅 분리
- `useWeather`: 날씨 데이터 페칭 + 에러 핸들링 + retry
- `useSearch`: 검색 로직 + debounce + 에러 상태
- `useDestination`: 여행지 필터링 + 정렬

### Mock API 서비스 레이어
- `src/services/api.js`: 실제 API 호출 구조 미러링
- `async/await` 패턴으로 실제 API 전환 시 코드 변경 최소화
- 네트워크 지연 시뮬레이션 + 에러 시뮬레이션 옵션

### 라이트모드 지원
- CSS 변수 기반 테마 전환 (`html.dark` ↔ `html.light`)
- `tailwind.config.js`: 배경 색상 CSS 변수 참조로 변경
- `ThemeToggle` 컴포넌트: Sun/Moon 아이콘, `localStorage` 설정 기억
- `prefers-color-scheme` 시스템 설정 자동 감지

---

## AI 생성 코드 품질 메모

| 컴포넌트 | AI 기여도 | 수동 수정 내용 |
|---------|-----------|---------------|
| Hero.jsx | 70% | 오버레이 강도, `aria-autocomplete` 수정 |
| WeatherWidget.jsx | 60% | 에러 상태 패턴, `useLocalTime` 훅 설계 |
| TipsAccordion.jsx | 65% | 테이블 `scope` 속성, `useId` 적용 |
| CouponFAB.jsx | 55% | 포커스 트랩 로직 전면 재작성 |
| AppContext.jsx | 80% | useReducer action 타입 정교화 |

---

## 향후 로드맵

### v1.1 (실서비스 전환)
- [ ] OpenWeather API 실제 연동 (`useWeather` 훅만 수정하면 됨)
- [ ] Klook/Viator 파트너 API 연동 (`src/services/api.js` 교체)
- [ ] 사용자 인증 (카카오 OAuth 2.0)
- [ ] 즐겨찾기 여행지 저장 (localStorage → DB)

### v1.2 (성장 단계)
- [ ] 실시간 항공권 가격 비교
- [ ] 여행 일정 플래너 (드래그 앤 드롭)
- [ ] 커뮤니티 후기 시스템
- [ ] PWA 전환 (오프라인 지원)
