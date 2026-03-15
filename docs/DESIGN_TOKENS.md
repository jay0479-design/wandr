# 디자인 토큰 문서

> WandR 디자인 시스템 — 토큰 완전 참조
> 버전: 1.0.0 | 업데이트: 2026-03-15

---

## 1. 색상 토큰

### 베이스 팔레트

| 토큰 | Tailwind | Hex | 용도 |
|------|----------|-----|------|
| `obsidian` | `bg-obsidian` | `#0A0A0F` | 최상위 페이지 배경 |
| `void` | `bg-void` | `#111118` | 카드, 섹션 배경 |
| `midnight` | `bg-midnight` | `#1C1C28` | 보조 배경, 모달 |
| `graphite` | `bg-graphite` | `#2E2E3E` | 테두리, 구분선 |

### Aurora 액센트

| 토큰 | Hex | 대비율 (vs obsidian) | 용도 |
|------|-----|---------------------|------|
| `aurora-1` | `#00D4FF` | 9.2:1 ✅ | 프라이머리 액션, 링크 |
| `aurora-2` | `#7B5EA7` | 4.7:1 ✅ | 보조 액센트 |
| `aurora-3` | `#FF6B6B` | 5.1:1 ✅ | 경고, 에러 |
| `aurora-4` | `#FFD93D` | 11.4:1 ✅ | 골드, 별점 |

### 텍스트 팔레트

| 용도 | Hex | 대비율 | WCAG |
|------|-----|--------|------|
| Primary | `#F0F0F5` | 18.1:1 | AA ✅ |
| Secondary | `#9090A8` | 5.8:1 | AA ✅ |
| Muted | `#5A5A70` | 3.1:1 | ⚠️ 장식용만 |

---

## 2. 타이포그래피 토큰

### 디스플레이 스케일

| 토큰 | 크기 | Weight | 용도 |
|------|------|--------|------|
| `text-display-2xl` | 4.5rem | 900 | Hero H1 |
| `text-display-xl` | 3.75rem | 900 | 랜딩 헤드 |
| `text-display-lg` | 3rem | 800 | 섹션 H2 |
| `text-display-md` | 2.25rem | 800 | 섹션 H3 |
| `text-display-sm` | 1.875rem | 700 | 카드 타이틀 |

### 바디 스케일

| 토큰 | 크기 | Line Height | 용도 |
|------|------|-------------|------|
| `text-body-xl` | 1.25rem | 1.75 | 리드 문장 |
| `text-body-lg` | 1.125rem | 1.7 | 본문 큰 것 |
| `text-body-md` | 1rem | 1.6 | 일반 본문 |
| `text-body-sm` | 0.875rem | 1.55 | 보조 텍스트 |
| `text-body-xs` | 0.8125rem | 1.5 | 캡션 |

### UI / 레이블

| 토큰 | 크기 | Letter Spacing | 용도 |
|------|------|----------------|------|
| `text-label-lg` | 0.875rem | 0.05em | 버튼, 탭 |
| `text-label-md` | 0.75rem | 0.1em | 뱃지, 태그 |
| `text-eyebrow` | 0.75rem | 0.28em | 섹션 눈썹 |

---

## 3. 간격 시스템 (커스텀)

| 토큰 | px | 용도 |
|------|----|------|
| `4.5` | 18px | 컴포넌트 내부 패딩 |
| `5.5` | 22px | 카드 패딩 |
| `13` | 52px | 소형 섹션 간격 |
| `18` | 72px | 섹션 패딩 기본 |
| `30` | 120px | 대형 섹션 간격 |

---

## 4. Border Radius

| 토큰 | px | 용도 |
|------|----|------|
| `rounded-xs` | 2px | Sharp 요소 |
| `rounded-md` | 6px | 뱃지, 태그 |
| `rounded-xl` | 16px | 카드 |
| `rounded-3xl` | 24px | 모달 |
| `rounded-5xl` | 40px | FAB |
| `rounded-full` | 9999px | 칩, 아바타 |

---

## 5. 글래스모피즘

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
}
```

---

## 6. Framer Motion 표준 전환

```js
// 진입 애니메이션
{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }

// 인터랙션 (spring)
{ type: 'spring', stiffness: 350, damping: 25 }

// 빠른 피드백
{ duration: 0.22 }
```
