/**
 * Skeleton — shimmer 로딩 플레이스홀더 컴포넌트
 *
 * 각 카드 타입별 스켈레톤을 제공합니다.
 * .skeleton 클래스 (index.css): shimmer 애니메이션 적용
 */

function SkeletonBox({ className = '', style = {} }) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton rounded-xl ${className}`}
      style={style}
    />
  );
}

// ── DestinationCard 스켈레톤 ───────────────────────────────
export function DestinationCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="glass rounded-3xl overflow-hidden flex-shrink-0 w-64 sm:w-72"
    >
      {/* 이미지 영역 */}
      <SkeletonBox style={{ height: '180px' }} className="rounded-none" />
      {/* 텍스트 영역 */}
      <div className="p-4 space-y-3">
        <SkeletonBox style={{ height: '12px', width: '40%' }} />
        <SkeletonBox style={{ height: '20px', width: '70%' }} />
        <SkeletonBox style={{ height: '12px', width: '55%' }} />
        <div className="flex gap-2 pt-1">
          <SkeletonBox style={{ height: '22px', width: '52px' }} className="rounded-full" />
          <SkeletonBox style={{ height: '22px', width: '52px' }} className="rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── TourCard 스켈레톤 ─────────────────────────────────────
export function TourCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="glass rounded-2xl overflow-hidden flex-shrink-0 w-72 sm:w-80"
    >
      {/* 썸네일 */}
      <SkeletonBox style={{ height: '160px' }} className="rounded-none" />
      {/* 바디 */}
      <div className="p-4 space-y-3">
        <SkeletonBox style={{ height: '10px', width: '30%' }} />
        <SkeletonBox style={{ height: '16px', width: '85%' }} />
        <SkeletonBox style={{ height: '16px', width: '60%' }} />
        {/* 별점 */}
        <SkeletonBox style={{ height: '12px', width: '45%' }} />
        <div className="flex items-center justify-between pt-1">
          <SkeletonBox style={{ height: '24px', width: '80px' }} />
          <SkeletonBox style={{ height: '34px', width: '80px' }} className="rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── VlogCard 스켈레톤 ─────────────────────────────────────
export function VlogCardSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3">
      {/* 썸네일 */}
      <SkeletonBox style={{ aspectRatio: '16/9' }} className="rounded-2xl" />
      {/* 메타 */}
      <div className="space-y-2 px-1">
        <SkeletonBox style={{ height: '14px', width: '90%' }} />
        <SkeletonBox style={{ height: '14px', width: '70%' }} />
        <SkeletonBox style={{ height: '11px', width: '40%' }} />
      </div>
    </div>
  );
}

// ── WeatherWidget 스켈레톤 ────────────────────────────────
export function WeatherWidgetSkeleton() {
  return (
    <div
      aria-hidden="true"
      aria-label="날씨 정보 로딩 중"
      aria-busy="true"
      className="glass rounded-3xl overflow-hidden p-6 space-y-5 h-full"
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <SkeletonBox style={{ height: '10px', width: '60px' }} />
          <SkeletonBox style={{ height: '18px', width: '80px' }} />
        </div>
        <SkeletonBox style={{ height: '28px', width: '28px' }} className="rounded-full" />
      </div>
      {/* 기온 */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <SkeletonBox style={{ height: '56px', width: '120px' }} />
          <SkeletonBox style={{ height: '14px', width: '80px' }} />
        </div>
        <SkeletonBox style={{ height: '72px', width: '72px' }} className="rounded-2xl" />
      </div>
      {/* 상세 그리드 */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <SkeletonBox style={{ height: '10px', width: '60%' }} />
            <SkeletonBox style={{ height: '16px', width: '80%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 범용 리스트 스켈레톤 ─────────────────────────────────
export function ListSkeleton({ count = 3, renderItem }) {
  return (
    <div aria-busy="true" aria-label="콘텐츠 로딩 중">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderItem(i)}</div>
      ))}
    </div>
  );
}
