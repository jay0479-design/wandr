# 접근성 감사 보고서

> WandR — WCAG 2.2 AA 준수 검증
> 감사 날짜: 2026-03-15
> 도구: axe-core v4.9, Lighthouse, 수동 키보드 테스트

---

## 1. 종합 결과

| 지표 | 목표 | 실측 | 상태 |
|------|------|------|------|
| Lighthouse 접근성 점수 | ≥ 90 | 95 | ✅ Pass |
| axe-core violations | 0건 | 0건 | ✅ Pass |
| 키보드 전용 탐색 | 전 기능 | 전 기능 | ✅ Pass |
| 스크린리더 (NVDA) | 주요 흐름 | 주요 흐름 | ✅ Pass |
| 색상 대비 (본문) | 4.5:1 | 18.1:1 | ✅ Pass |
| 색상 대비 (UI) | 3:1 | 9.2:1 | ✅ Pass |

---

## 2. WCAG 2.2 성공 기준별 검토

### 2.1 인식 가능 (Perceivable)

| 기준 | 설명 | 상태 | 비고 |
|------|------|------|------|
| 1.1.1 | 비텍스트 콘텐츠 대체 텍스트 | ✅ | 모든 이미지에 alt 속성 |
| 1.3.1 | 정보와 관계 (시맨틱 마크업) | ✅ | header/main/nav/section/article |
| 1.3.3 | 감각 특성 | ✅ | 색상 외 형태/텍스트로도 구분 |
| 1.4.1 | 색상 사용 | ✅ | 색상만으로 정보 전달 없음 |
| 1.4.3 | 명암비 (일반 텍스트) | ✅ | 18.1:1 (#F0F0F5 / #0A0A0F) |
| 1.4.4 | 텍스트 크기 조정 | ✅ | rem 단위 사용, 200% 확대 가능 |
| 1.4.10 | 재배치 (Reflow) | ✅ | 375px에서 가로 스크롤 없음 |
| 1.4.11 | 비텍스트 대비 | ✅ | 버튼 테두리 3:1 이상 |
| 1.4.13 | 호버/포커스 콘텐츠 | ✅ | hover 상태 즉시 해제 가능 |

### 2.2 운용 가능 (Operable)

| 기준 | 설명 | 상태 | 비고 |
|------|------|------|------|
| 2.1.1 | 키보드 | ✅ | 모든 기능 키보드로 접근 가능 |
| 2.1.2 | 키보드 트랩 없음 | ✅ | 모달: Escape 키로 닫기 |
| 2.4.1 | 블록 건너뛰기 | ✅ | skip-link 제공 |
| 2.4.3 | 포커스 순서 | ✅ | 시각적 흐름과 DOM 순서 일치 |
| 2.4.4 | 링크 목적 (컨텍스트) | ✅ | aria-label로 명확한 목적 제공 |
| 2.4.7 | 포커스 가시성 | ✅ | focus-visible ring 스타일 |
| 2.5.3 | 레이블과 이름 | ✅ | 버튼 aria-label = 시각 텍스트 |
| 2.5.8 | 최소 타겟 크기 | ✅ | 최소 44×44px (WCAG 2.2 신규) |

### 2.3 이해 가능 (Understandable)

| 기준 | 설명 | 상태 | 비고 |
|------|------|------|------|
| 3.1.1 | 페이지 언어 | ✅ | `<html lang="ko">` |
| 3.2.1 | 포커스 시 변경 없음 | ✅ | 포커스만으로 페이지 변경 없음 |
| 3.3.1 | 오류 식별 | ✅ | role="alert" + 오류 메시지 |
| 3.3.2 | 레이블 또는 지침 | ✅ | 모든 입력 필드에 레이블 |

### 2.4 견고성 (Robust)

| 기준 | 설명 | 상태 | 비고 |
|------|------|------|------|
| 4.1.2 | 이름, 역할, 값 | ✅ | role + aria-label + aria-expanded |
| 4.1.3 | 상태 메시지 | ✅ | aria-live="polite" 동적 영역 |

---

## 3. 컴포넌트별 접근성 검토

### Header
- [x] `<nav>` + `aria-label="주 내비게이션"`
- [x] 로고: `aria-label="WandR 홈으로"`
- [x] 쿠폰 버튼: `aria-label="쿠폰 열기"`

### Hero (검색)
- [x] `<search>` 랜드마크 (ARIA 역할)
- [x] `role="combobox"` + `aria-expanded` + `aria-controls`
- [x] `role="listbox"` 검색 결과
- [x] `aria-activedescendant` 키보드 탐색

### DestinationDashboard
- [x] `role="tablist"` 필터 탭
- [x] `role="tab"` + `aria-selected`
- [x] `role="tabpanel"` + `aria-labelledby`
- [x] 카드: `role="button"` + `onKeyDown` (Enter/Space)

### WeatherWidget
- [x] `aria-live="polite"` 날씨 데이터 업데이트
- [x] 에러 상태: `role="alert"` + `aria-live="assertive"`
- [x] 스켈레톤: `aria-busy="true"` + `aria-label="날씨 정보 로딩 중"`

### TipsAccordion
- [x] `<button>` + `aria-expanded` + `aria-controls`
- [x] `<section role="region">` 패널

### CouponSystem
- [x] `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- [x] 포커스 트랩 (모달 내부)
- [x] Escape 키로 닫기

---

## 4. prefers-reduced-motion 지원

```css
/* index.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Framer Motion: `useReducedMotion()` 훅으로 조건부 애니메이션 비활성화
- CSS 애니메이션: 미디어 쿼리로 일괄 비활성화

---

## 5. 잔여 개선 사항

| 우선순위 | 항목 | 개선 방법 |
|----------|------|-----------|
| Low | VlogFeed 모달의 포커스 복귀 | 모달 닫힘 시 원래 트리거 버튼으로 포커스 이동 |
| Low | 날씨 아이콘 `<title>` 추가 | SVG `<title>` + `aria-describedby` |
