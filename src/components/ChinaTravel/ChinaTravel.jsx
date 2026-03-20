import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────
   데이터
───────────────────────────────────────── */
const experiences = [
  {
    id: 'cq-bike',
    city: '충칭 重慶',
    cityKey: 'chongqing',
    badge: '🔥 MZ 인기 1위',
    title: '야경 오토바이\n릴스 촬영',
    subtitle: '도파민 폭포 체험',
    description:
      '충칭의 화려한 네온 야경 속을 오토바이로 질주하며 영화 같은 릴스 영상을 촬영합니다. 전속 촬영팀 동행, 의상 대여, 면사포 소품, 보정 영상 올인원 제공. 홍야동 · 해방비 · 장강대교를 무대로 인생 영상을 완성하세요.',
    highlights: ['전속 촬영팀 동행', '의상·소품 대여 포함', '릴스 편집본 당일 전달', '야경 1시간 라이딩'],
    price: '약 300~500 위안',
    duration: '2~3시간',
    location: '홍야동 · 해방비 · 장강대교',
    iconEmoji: '🏍️',
    accentColor: '#fbbf24',
    gradient: 'linear-gradient(135deg, #1c1403 0%, #2d2000 50%, #1a1200 100%)',
  },
  {
    id: 'cq-cruise',
    city: '충칭 重慶',
    cityKey: 'chongqing',
    badge: '🌙 야경 명소',
    title: '양강 야경\n크루즈',
    subtitle: '양강이 만나는 황금 유역',
    description:
      '장강과 가릉강이 합류하는 충칭의 아이코닉한 양강 크루즈. 홍야동 야경과 강변 마천루를 선상에서 감상하며 충칭의 3D 입체 도시 스카이라인을 만끽합니다. 저녁 식사 옵션 포함 패키지도 선택 가능합니다.',
    highlights: ['양강 합류 구간 조망', '홍야동 야경 감상', '선상 음료 제공', '야간 촬영 포인트'],
    price: '약 150~300 위안',
    duration: '1.5시간',
    location: '조천문 선착장 · 홍야동',
    iconEmoji: '🚢',
    accentColor: '#3b82f6',
    gradient: 'linear-gradient(135deg, #020d1f 0%, #0a1f3d 50%, #020d1f 100%)',
  },
  {
    id: 'sh-cruise',
    city: '상하이 上海',
    cityKey: 'shanghai',
    badge: '🌃 야경 필수코스',
    title: '와이탄 황푸강\n유람선',
    subtitle: '동방명주와 푸동 스카이라인',
    description:
      '상하이의 상징 와이탄에서 출발하는 황푸강 유람선. 동방명주와 세계 최고층 빌딩들이 빛나는 푸동 스카이라인을 선상에서 감상합니다. 낮에는 클래식한 강변 건축물, 밤에는 환상적인 조명 쇼를 즐길 수 있습니다.',
    highlights: ['동방명주 근접 조망', '와이탄 야경 감상', '푸동 스카이라인 뷰', '상·하선 유연 선택'],
    price: '약 120~280 위안',
    duration: '1시간',
    location: '와이탄 선착장 · 황푸강',
    iconEmoji: '🌃',
    accentColor: '#14b8a6',
    gradient: 'linear-gradient(135deg, #021a18 0%, #043d38 50%, #021a18 100%)',
  },
  {
    id: 'cq-hotpot',
    city: '충칭 重慶',
    cityKey: 'chongqing',
    badge: '🍲 미식 체험',
    title: '정통 훠궈 &\n궁중 연회',
    subtitle: '바(巴) 문화의 진수',
    description:
      '충칭 정통 훠궈와 함께 전통 바(巴) 문화 공연을 감상하는 올인원 미식 체험. 전통 무용과 변검(얼굴 바꾸기) 공연, 충칭 방언 MC 진행으로 잊지 못할 저녁을 선사합니다. 매운 정도는 선택 가능합니다.',
    highlights: ['정통 충칭 훠궈', '변검 공연 관람', '바 문화 퍼포먼스', '매운맛 조절 가능'],
    price: '약 200~400 위안',
    duration: '2시간',
    location: '해방비 · 홍야동 주변',
    iconEmoji: '🍲',
    accentColor: '#dc2626',
    gradient: 'linear-gradient(135deg, #1f0505 0%, #3d0a0a 50%, #1f0505 100%)',
  },
  {
    id: 'sh-zhujiajiao',
    city: '상하이 上海',
    cityKey: 'shanghai',
    badge: '🏮 수향마을 야경',
    title: '주가각 수향마을\n야경투어',
    subtitle: '강남 운하 위의 낭만',
    description:
      '상하이 근교 주가각 수향마을에서 나룻배를 타며 야경을 감상합니다. 돌다리와 홍등이 반사되는 수면 위 촬영은 SNS 최고 인기 콘텐츠. 당일 또는 1박2일 코스를 선택할 수 있습니다.',
    highlights: ['나룻배 탑승 체험', '수향마을 야경 촬영', '홍등 수면 반사 포토존', '당일·1박2일 선택'],
    price: '약 200~350 위안',
    duration: '4~5시간',
    location: '주가각 수향마을',
    iconEmoji: '🏮',
    accentColor: '#14b8a6',
    gradient: 'linear-gradient(135deg, #031412 0%, #062e2a 50%, #031412 100%)',
  },
];

const TIPS = [
  { icon: '💬', title: 'WeChat 필수 설치', desc: '현지 결제·예약·소통 모두 위챗 기반' },
  { icon: '✈️', title: '144시간 무비자', desc: '유효 여권 + 제3국 출국 항공권 필요' },
  { icon: '💳', title: '알리페이 연동', desc: '해외 카드 연동 후 현지 결제 가능' },
  { icon: '📱', title: '번역앱 활용', desc: '파파고·DeepL·구글 번역 사전 다운로드' },
];

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'chongqing', label: '충칭' },
  { key: 'shanghai', label: '상하이' },
];

/* ─────────────────────────────────────────
   ExperienceCard
───────────────────────────────────────── */
function ExperienceCard({ data, index }) {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dx * 12, y: dy * -12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const { accentColor } = data;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setExpanded((p) => !p)}
      aria-expanded={expanded}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded((p) => !p); }}
      aria-label={`${data.city} ${data.title.replace('\n', ' ')} — 클릭하여 상세 보기`}
      style={{
        background: data.gradient,
        borderRadius: 20,
        border: `1px solid rgba(${hexToRgb(accentColor)}, 0.2)`,
        overflow: 'hidden',
        cursor: 'pointer',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) ${tilt.x !== 0 ? 'scale(1.02)' : 'scale(1)'}`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        boxShadow: expanded
          ? `0 20px 60px rgba(${hexToRgb(accentColor)}, 0.25), 0 0 0 1px rgba(${hexToRgb(accentColor)}, 0.3)`
          : `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(${hexToRgb(accentColor)}, 0.1)`,
      }}
    >
      {/* 상단 강조 라인 */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

      <div style={{ padding: '20px 20px 16px' }}>
        {/* 배지 + 도시 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: accentColor,
              background: `rgba(${hexToRgb(accentColor)}, 0.12)`,
              border: `1px solid rgba(${hexToRgb(accentColor)}, 0.25)`,
              borderRadius: 20,
              padding: '3px 10px',
              letterSpacing: 0.3,
            }}
          >
            {data.badge}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(147,197,253,0.6)', letterSpacing: 0.5 }}>
            {data.city}
          </span>
        </div>

        {/* 이모지 + 타이틀 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
          <span
            style={{
              fontSize: 28,
              flexShrink: 0,
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `rgba(${hexToRgb(accentColor)}, 0.12)`,
              borderRadius: '50%',
            }}
            aria-hidden="true"
          >
            {data.iconEmoji}
          </span>
          <div>
            <h3
              style={{
                fontSize: 19,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.25,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {data.title}
            </h3>
            <p style={{ fontSize: 12, fontWeight: 600, color: accentColor, marginTop: 2, opacity: 0.9 }}>
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* 설명 */}
        <p
          style={{
            fontSize: 12.5,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.65,
            marginTop: 10,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            transition: 'all 0.4s ease',
          }}
        >
          {data.description}
        </p>

        {/* 확장 콘텐츠 */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ marginTop: 14 }}
            >
              {/* 하이라이트 칩 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {data.highlights.map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#ffffff',
                      background: `rgba(${hexToRgb(accentColor)}, 0.18)`,
                      border: `1px solid rgba(${hexToRgb(accentColor)}, 0.3)`,
                      borderRadius: 8,
                      padding: '3px 9px',
                    }}
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              {/* 메타 정보 */}
              <dl
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px 10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  padding: '10px 12px',
                }}
              >
                {[
                  { label: '💰 예상 가격', value: data.price },
                  { label: '⏱ 소요 시간', value: data.duration },
                  { label: '📍 주요 장소', value: data.location },
                ].map(({ label, value }) => (
                  <div key={label} style={{ gridColumn: label.includes('장소') ? '1 / -1' : undefined }}>
                    <dt style={{ fontSize: 10, fontWeight: 600, color: 'rgba(147,197,253,0.5)', marginBottom: 2 }}>
                      {label}
                    </dt>
                    <dd style={{ fontSize: 12, fontWeight: 700, color: '#ffffff', margin: 0 }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 접기/펼치기 힌트 */}
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: `rgba(${hexToRgb(accentColor)}, 0.6)`,
            textAlign: 'right',
            letterSpacing: 0.3,
          }}
          aria-hidden="true"
        >
          {expanded ? '▲ 접기' : '▼ 상세 보기'}
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────── */
export default function ChinaTravel() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? experiences
    : experiences.filter((e) => e.cityKey === activeFilter);

  return (
    <section
      aria-labelledby="china-heading"
      style={{
        background: 'linear-gradient(180deg, #030b1f 0%, #081233 35%, #0c1a4a 70%, #0f2060 100%)',
        padding: '72px 16px 88px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Noto Sans KR', 'Pretendard', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes chinaTitleShine {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* 배경 장식 */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 40, left: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          {/* 배지 */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              fontSize: 12, fontWeight: 700, letterSpacing: 2,
              color: '#93c5fd',
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(147,197,253,0.25)',
              borderRadius: 20, padding: '5px 16px',
            }}>
              🇨🇳 CHINA TRAVEL 2026
            </span>
          </div>

          {/* 타이틀 */}
          <h2
            id="china-heading"
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 900,
              margin: '0 0 10px',
              lineHeight: 1.2,
              background: 'linear-gradient(90deg, #ffffff 0%, #93c5fd 25%, #ffffff 50%, #93c5fd 75%, #ffffff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'chinaTitleShine 5s linear infinite',
            }}
          >
            요즘 핫한 중국여행<br />이색 체험 가이드
          </h2>

          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 28, lineHeight: 1.6 }}>
            충칭 오토바이 릴스 촬영부터 상하이 와이탄 야경 크루즈까지 — MZ세대 필수 코스
          </p>

          {/* 필터 탭 */}
          <div
            role="tablist"
            aria-label="도시별 필터"
            style={{ display: 'inline-flex', gap: 8, padding: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: 50, border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    padding: '7px 20px',
                    borderRadius: 50,
                    border: isActive ? '1px solid rgba(147,197,253,0.4)' : '1px solid transparent',
                    background: isActive ? 'rgba(37,99,235,0.3)' : 'transparent',
                    color: isActive ? '#93c5fd' : 'rgba(255,255,255,0.5)',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    fontFamily: 'inherit',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 카드 그리드 */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
            marginBottom: 48,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, i) => (
              <ExperienceCard key={exp.id} data={exp} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 여행 체크리스트 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '24px 24px 20px',
            marginBottom: 20,
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#93c5fd', marginBottom: 16, letterSpacing: 0.5 }}>
            📋 중국 여행 필수 체크리스트
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            {TIPS.map((tip) => (
              <div
                key={tip.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '10px 12px',
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }} aria-hidden="true">{tip.icon}</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#ffffff', margin: '0 0 2px' }}>{tip.title}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 면책 고지 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 10, color: 'rgba(147,197,253,0.3)', lineHeight: 1.8, letterSpacing: 0.3 }}
        >
          · 상기 가격은 2026년 기준 예상 가격이며 환율 및 업체에 따라 변동될 수 있습니다&nbsp;&nbsp;
          · 144시간 무비자 입국 시 유효 여권 및 제3국 출국 항공권이 필요합니다&nbsp;&nbsp;
          · 본 정보는 여행 참고용이며, 예약 전 해당 업체에 직접 확인을 권장합니다
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   유틸: hex → 'r,g,b'
───────────────────────────────────────── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
