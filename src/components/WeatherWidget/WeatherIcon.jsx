// CSS 기반 날씨 아이콘 애니메이션 컴포넌트
// 각 날씨 조건에 맞는 SVG + Tailwind 애니메이션 적용

const icons = {
  clear: ClearIcon,
  cloudy: CloudyIcon,
  rain: RainIcon,
  snow: SnowIcon,
  storm: StormIcon,
  fog: FogIcon,
};

export default function WeatherIcon({ condition = 'clear', size = 48, animated = true }) {
  const Icon = icons[condition] || ClearIcon;
  return <Icon size={size} animated={animated} />;
}

/* ── 맑음 (해/달) ──────────────────────────────── */
function ClearIcon({ size, animated }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center flex-shrink-0"
    >
      {/* 빛 방사 */}
      <div
        className={`absolute inset-0 rounded-full ${animated ? 'animate-spin-slow' : ''}`}
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(255,217,61,0.25) 20deg, transparent 40deg, rgba(255,217,61,0.15) 60deg, transparent 80deg, rgba(255,217,61,0.25) 100deg, transparent 120deg, rgba(255,217,61,0.2) 140deg, transparent 160deg, rgba(255,217,61,0.25) 180deg, transparent 200deg, rgba(255,217,61,0.15) 220deg, transparent 240deg, rgba(255,217,61,0.25) 260deg, transparent 280deg, rgba(255,217,61,0.2) 300deg, transparent 320deg, rgba(255,217,61,0.25) 340deg, transparent 360deg)',
        }}
      />
      {/* 태양 원 */}
      <div
        className="relative rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          background: 'radial-gradient(circle, #FFD93D 0%, #FFB800 100%)',
          boxShadow: `0 0 ${size * 0.25}px rgba(255,217,61,0.6)`,
        }}
      />
    </div>
  );
}

/* ── 흐림 ──────────────────────────────────────── */
function CloudyIcon({ size, animated }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`flex items-center justify-center flex-shrink-0 ${animated ? 'animate-float' : ''}`}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* 뒷구름 */}
        <ellipse cx="30" cy="26" rx="14" ry="10" fill="rgba(160,170,200,0.35)" />
        {/* 앞구름 */}
        <ellipse cx="20" cy="29" rx="16" ry="11" fill="rgba(200,210,230,0.5)" />
        {/* 구름 상단 둥글림 */}
        <circle cx="16" cy="24" r="8" fill="rgba(200,210,230,0.55)" />
        <circle cx="24" cy="21" r="10" fill="rgba(210,220,240,0.55)" />
      </svg>
    </div>
  );
}

/* ── 비 ────────────────────────────────────────── */
function RainIcon({ size, animated }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center flex-shrink-0 overflow-hidden"
    >
      {/* 구름 */}
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <ellipse cx="24" cy="20" rx="18" ry="12" fill="rgba(130,150,190,0.5)" />
        <circle cx="16" cy="18" r="9" fill="rgba(130,150,190,0.55)" />
        <circle cx="26" cy="15" r="11" fill="rgba(140,160,200,0.55)" />
      </svg>
      {/* 빗방울 3개 (stagger) */}
      {animated && [14, 22, 30].map((x, i) => (
        <div
          key={i}
          className="absolute animate-rain rounded-full bg-aurora-1"
          style={{
            left: x,
            top: size * 0.55,
            width: 2,
            height: 8,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
}

/* ── 눈 ────────────────────────────────────────── */
function SnowIcon({ size, animated }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center flex-shrink-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <ellipse cx="24" cy="19" rx="17" ry="11" fill="rgba(200,215,240,0.5)" />
        <circle cx="17" cy="17" r="8" fill="rgba(200,215,240,0.55)" />
        <circle cx="26" cy="14" r="10" fill="rgba(210,225,245,0.55)" />
      </svg>
      {/* 눈송이 */}
      {animated && ['❄', '❄', '❄'].map((s, i) => (
        <div
          key={i}
          className="absolute animate-snow text-white/60"
          style={{
            left: 10 + i * 12,
            top: size * 0.5,
            fontSize: size * 0.18,
            animationDelay: `${i * 0.9}s`,
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

/* ── 폭풍 ──────────────────────────────────────── */
function StormIcon({ size, animated }) {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center flex-shrink-0"
    >
      <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="17" rx="18" ry="11" fill="rgba(80,90,120,0.6)" />
        <circle cx="16" cy="15" r="9" fill="rgba(80,90,120,0.65)" />
        <circle cx="26" cy="12" r="11" fill="rgba(90,100,130,0.65)" />
        {/* 번개 */}
        <polyline
          points="26,26 21,34 25,34 20,44"
          stroke="#FFD93D"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? 'animate-twinkle' : ''}
          style={{ filter: 'drop-shadow(0 0 4px #FFD93D)' }}
        />
      </svg>
    </div>
  );
}

/* ── 안개 ──────────────────────────────────────── */
function FogIcon({ size, animated }) {
  const lines = [{ y: 18, w: '80%' }, { y: 25, w: '65%' }, { y: 32, w: '75%' }];
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="relative flex flex-col justify-center gap-1.5 px-2 flex-shrink-0"
    >
      {lines.map((l, i) => (
        <div
          key={i}
          className={`h-1 rounded-full bg-[rgba(180,190,220,0.4)] ${animated ? 'animate-float' : ''}`}
          style={{ width: l.w, animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </div>
  );
}
