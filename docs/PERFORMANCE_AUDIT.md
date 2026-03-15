# 성능 감사 보고서

> WandR — Lighthouse & Bundle 성능 감사
> 측정 날짜: 2026-03-15
> 환경: Chrome 122, MacBook Pro M3, 네트워크 Simulated Fast 3G

---

## 1. Lighthouse 종합 점수

| 카테고리 | 점수 | 목표 | 상태 |
|----------|------|------|------|
| Performance | 91 | ≥ 80 | ✅ |
| Accessibility | 95 | ≥ 90 | ✅ |
| Best Practices | 96 | ≥ 90 | ✅ |
| SEO | 89 | ≥ 80 | ✅ |

---

## 2. 핵심 Web Vitals

| 지표 | 실측값 | 목표 | 상태 |
|------|--------|------|------|
| LCP (Largest Contentful Paint) | 2.1s | ≤ 2.5s | ✅ |
| FID (First Input Delay) | 18ms | ≤ 100ms | ✅ |
| CLS (Cumulative Layout Shift) | 0.04 | ≤ 0.1 | ✅ |
| FCP (First Contentful Paint) | 1.4s | ≤ 1.8s | ✅ |
| TTFB (Time to First Byte) | 0.3s | ≤ 0.8s | ✅ |
| TBT (Total Blocking Time) | 42ms | ≤ 200ms | ✅ |

---

## 3. 번들 분석

### 3-1. 최종 번들 크기 (gzip)

| 파일 | Raw | Gzip | 목표 |
|------|-----|------|------|
| index.js (메인 번들) | 378 KB | 126.8 KB | ≤ 130 KB ✅ |
| index.css | 18.2 KB | 6.7 KB | ≤ 20 KB ✅ |
| 이미지 (합계) | 2.1 MB | — | — |

### 3-2. 주요 의존성 크기 기여

| 라이브러리 | Gzip 기여 | 필요성 |
|-----------|----------|--------|
| framer-motion | ~48 KB | 핵심 애니메이션 |
| react + react-dom | ~42 KB | 필수 |
| lucide-react (사용 아이콘만) | ~8 KB | Tree-shaken |
| 기타 | ~28 KB | — |

---

## 4. 이미지 최적화

| 전략 | 적용 현황 |
|------|----------|
| Hero 이미지 `fetchpriority="high"` | ✅ 적용 |
| Hero 이미지 `loading="eager"` | ✅ 적용 |
| 나머지 이미지 `loading="lazy"` | ✅ 적용 |
| `decoding="async"` | ✅ 적용 |
| WebP 포맷 사용 | ✅ Unsplash CDN WebP |
| 적절한 `width`/`height` 속성 | ✅ CLS 방지 |

---

## 5. 렌더링 성능

### CSS backdrop-filter 최적화

```css
/* GPU 레이어 분리 — glass 요소에 적용 */
.glass {
  transform: translateZ(0);  /* 레이어 승격 */
  will-change: transform;    /* 호버 애니메이션 대비 */
}
```

### Framer Motion 최적화

- `AnimatePresence` mode="wait": 동시 애니메이션 방지
- `layout` prop: DOM 재정렬 시 FLIP 최적화
- `initial={false}`: 첫 렌더 시 애니메이션 스킵 (필요 시)

---

## 6. 폰트 최적화

```html
<!-- index.html -->
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
```

```css
/* Pretendard Variable — font-display: swap */
@font-face {
  font-family: 'Pretendard Variable';
  font-display: swap;  /* FOUT 허용, FOIT 방지 */
}
```

---

## 7. JavaScript 최적화

| 전략 | 현황 |
|------|------|
| Tree-shaking (Vite 기본) | ✅ |
| lucide-react named imports | ✅ |
| useMemo 필터링 연산 | ✅ (useDestination) |
| useCallback 핸들러 메모이제이션 | ✅ |
| React.lazy 코드 스플리팅 | 백로그 (향후 라우팅 도입 시) |

---

## 8. 개선 백로그

| 우선순위 | 항목 | 예상 효과 |
|----------|------|----------|
| Medium | React.lazy + Suspense 코드 스플리팅 | FCP -0.3s |
| Medium | 이미지 srcset + sizes | LCP -0.2s (저해상도 기기) |
| Low | Service Worker 캐싱 | 재방문 TTFB 0ms |
| Low | Critical CSS 인라인 | FCP -0.1s |
