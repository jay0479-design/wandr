# 디자인 결정 기록 (Design Decision Log)

> WandR — 주요 설계 결정 및 근거
> 업데이트: 2026-03-15

---

## DD-001: 글래스모피즘 UI 채택

**결정**: Apple Vision Pro 스타일의 글래스모피즘을 메인 디자인 언어로 채택

**배경**: 기존 여행 앱들의 평면적이고 촌스러운 디자인에 대한 사용자 불만 (리서치 44%)

**대안**: 뉴모피즘, 플랫 디자인, 스큐어모피즘

**채택 이유**:
- 고품질 여행 사진과 자연스럽게 조화 (배경 이미지를 흐리지 않고 노출)
- 다크모드에서 시각적 깊이감 제공
- `backdrop-filter` 브라우저 지원율 94%+ (2026년 기준)

**트레이드오프**:
- GPU 렌더링 부하 증가 → `will-change: transform` + 레이어 분리로 완화
- 저사양 기기에서 성능 저하 가능 → `@media (prefers-reduced-motion)` 대응

---

## DD-002: React Context + useReducer 상태 관리

**결정**: Redux/Zustand 대신 React 내장 Context + useReducer 사용

**배경**: 해커톤 일정 내 빠른 개발, 외부 의존성 최소화

**대안**: Zustand, Redux Toolkit, Jotai

**채택 이유**:
- 번들 크기 절약 (Zustand ~3KB 절감)
- React 19 내장 기능만으로 충분한 상태 복잡도
- 팀 온보딩 용이 (별도 학습 불필요)

**트레이드오프**:
- 대규모 앱 확장 시 리렌더링 최적화 한계
- DevTools 경험 Redux보다 열악

---

## DD-003: Mock API 서비스 레이어 분리

**결정**: 컴포넌트에서 직접 데이터를 읽지 않고 `src/services/api.js` 레이어 도입

**배경**: 해커톤 완료 후 실서비스 전환 용이성 확보

**채택 이유**:
- 실 API 전환 시 컴포넌트 코드 변경 없이 `api.js`만 교체
- 네트워크 지연/에러 시뮬레이션으로 실제 UX 사전 검증
- 테스트 작성 시 Mock 주입 포인트 명확

---

## DD-004: CSS snap-x 스크롤 (TourCards)

**결정**: TourCards 가로 스크롤에 CSS scroll-snap 적용

**배경**: 터치 스크롤 후 카드가 어중간하게 멈추는 UX 불만 (사용성 테스트 3/5명)

**채택 이유**:
- 네이티브 CSS만으로 구현 (JS 불필요)
- iOS Safari에서 부드러운 모멘텀 스크롤 지원
- 접근성 저하 없음

**설정**:
```css
container: scroll-snap-type: x mandatory; overscroll-behavior-x: contain;
item: scroll-snap-align: start; flex-shrink: 0;
```

---

## DD-005: 다크모드 전용 + 라이트모드 토글

**결정**: 기본값 다크모드, 사용자 선택으로 라이트모드 전환 가능

**배경**: 사용자 리서치 결과 다크모드 선호 49%, 야간 여행 계획 수요

**Tailwind 전략**: `darkMode: 'class'` — `html` 엘리먼트에 `.dark`/`.light` 클래스 토글

**localStorage 영속화**: 테마 선택을 `wandr-theme` 키로 저장

---

## DD-006: Framer Motion 애니메이션 전략

**결정**: CSS transition 대신 Framer Motion으로 모든 인터랙션 구현

**채택 이유**:
- `AnimatePresence`로 마운트/언마운트 애니메이션 선언적 관리
- Spring 물리 엔진으로 자연스러운 인터랙션 피드백
- `layout` prop으로 리스트 재정렬 자동 애니메이션

**번들 영향**: Framer Motion ~50KB gzip → 시각 품질 대비 허용 가능

---

## DD-007: ErrorBoundary 전략

**결정**: 섹션별 세분화된 ErrorBoundary (전체 앱 하나가 아닌 각 위젯별)

**채택 이유**:
- 날씨 API 오류 시 투어 카드에 영향 없음
- `minimal` prop으로 인라인/전체 에러 UI 분기
- 사용자에게 최소한의 서비스 지속 보장
