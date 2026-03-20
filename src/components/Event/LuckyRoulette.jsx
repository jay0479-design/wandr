import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const rouletteSlices = [
  { id: 's1', label: ['여행 지원금', '5만원'],    lightColor: '#FF9999', color: '#FF6B6B', probability: 0.15, reward: { type: 'credit',  name: '여행 지원금 5만원',             value: 50000  } },
  { id: 's2', label: ['Sony ZV-1 II', '카메라'],  lightColor: '#7EDDD8', color: '#4ECDC4', probability: 0.03, reward: { type: 'product', name: 'Sony ZV-1 II 브이로그 카메라',  value: 0      } },
  { id: 's3', label: ['신세계 상품권', '3만원'],   lightColor: '#FFED99', color: '#FFE66D', probability: 0.12, reward: { type: 'coupon',  name: '신세계 상품권 3만원',           value: 30000  } },
  { id: 's4', label: ['대한항공', '30만 크레딧'],  lightColor: '#9B8DF0', color: '#6C5CE7', probability: 0.02, reward: { type: 'airline', name: '대한항공 항공권 30만원 크레딧',  value: 300000 } },
  { id: 's5', label: ['여행 지원금', '1만원'],    lightColor: '#C8F0E0', color: '#A8E6CF', probability: 0.25, reward: { type: 'credit',  name: '여행 지원금 1만원',             value: 10000  } },
  { id: 's6', label: ['여행 적립금', '3천원'],    lightColor: '#FFAA80', color: '#FF8A5C', probability: 0.20, reward: { type: 'credit',  name: '여행 적립금 3,000원',           value: 3000   } },
  { id: 's7', label: ['신세계 상품권', '1만원'],   lightColor: '#A8D8F0', color: '#85C1E9', probability: 0.13, reward: { type: 'coupon',  name: '신세계 상품권 1만원',           value: 10000  } },
  { id: 's8', label: ['여행 지원금', '7만원'],    lightColor: '#FAD5B2', color: '#F8C291', probability: 0.10, reward: { type: 'credit',  name: '여행 지원금 7만원',             value: 70000  } },
];

const NUM_SLICES = rouletteSlices.length;
const SLICE_DEG = 360 / NUM_SLICES;
const SIZE = 430;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 198;
const RIM_RADIUS = R + 20;
const RIM_COUNT = 30;

const toRad = (deg) => (deg * Math.PI) / 180;

function selectByProbability() {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < rouletteSlices.length; i++) {
    cum += rouletteSlices[i].probability;
    if (r <= cum) return i;
  }
  return rouletteSlices.length - 1;
}

const JACKPOT_TYPES = new Set(['airline', 'product']);

/* ── 림 조명 점 ── */
function RimLight({ angle, radius, index, spinning }) {
  const rad = toRad(angle);
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: spinning ? '#fbbf24' : '#93c5fd',
        boxShadow: spinning
          ? '0 0 8px #fbbf24, 0 0 16px rgba(251,191,36,0.4)'
          : '0 0 6px #93c5fd, 0 0 12px rgba(147,197,253,0.3)',
        transform: 'translate(-50%, -50%)',
        animation: spinning
          ? `rlRimPulse 0.15s ${index * 0.04}s ease-in-out infinite alternate`
          : `rlRimGlow 2s ${index * 0.15}s ease-in-out infinite alternate`,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  );
}

export default function LuckyRoulette({ onReward }) {
  const { user, processRouletteWin } = useUser();
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [jackpot, setJackpot] = useState(null);
  const rotRef = useRef(0);

  const handleSpin = useCallback(() => {
    if (spinning) return;

    const idx = selectByProbability();
    const targetCenter = idx * SLICE_DEG + SLICE_DEG / 2;
    const alignAngle = 360 - targetCenter;
    const currentMod = rotRef.current % 360;
    const delta = ((alignAngle - currentMod) + 7200) % 360;
    const newRotation = rotRef.current + 4 * 360 + delta;
    rotRef.current = newRotation;

    setTransitioning(true);
    setRotation(newRotation);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setTransitioning(false);
      const winner = rouletteSlices[idx];
      processRouletteWin(winner.reward);
      if (JACKPOT_TYPES.has(winner.reward.type)) {
        setJackpot(winner.reward);
      } else {
        onReward({
          id: `toast-rlt-${Date.now()}`,
          ...winner.reward,
          source: 'roulette',
        });
      }
    }, 4200);
  }, [spinning, user.rouletteSpinsLeft, processRouletteWin, onReward]);

  const spinsLeft = '∞';
  const disabled = spinning;

  return (
    <>
      <section
        aria-labelledby="roulette-heading"
        className="rounded-3xl p-6 sm:p-10 space-y-8"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow: '0 8px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        <style>{`
          @keyframes rlRimGlow {
            0%   { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
            100% { opacity: 1;   transform: translate(-50%, -50%) scale(1.2); }
          }
          @keyframes rlRimPulse {
            0%   { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
            100% { opacity: 1;   transform: translate(-50%, -50%) scale(1.4); }
          }
          @keyframes rlGlowPulse {
            0%, 100% { opacity: 0.6; }
            50%       { opacity: 1;   }
          }
        `}</style>

        {/* 헤더 */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="roulette-heading" className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span aria-hidden="true">🎰</span> 럭키 룰렛
            </h2>
            <p className="text-sm text-[#9090A8] mt-1">
              돌려돌려~ 대한항공 항공권부터 카메라까지!
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-3xl font-black text-aurora-4">{spinsLeft}</p>
            <p className="text-sm text-[#9090A8]">남은 횟수</p>
          </div>
        </div>

        {/* 룰렛 영역 */}
        <div className="flex flex-col items-center gap-6">

          {/* 휠 컨테이너 */}
          <div className="relative" style={{ width: SIZE, height: SIZE }}>

            {/* 외부 글로우 링 */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -28,
                borderRadius: '50%',
                background: 'radial-gradient(circle, transparent 50%, rgba(59,130,246,0.22) 68%, transparent 82%)',
                animation: 'rlGlowPulse 3s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />

            {/* 휠 아래 3D 그림자 */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: -26,
                left: '10%',
                right: '10%',
                height: 48,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
                filter: 'blur(10px)',
                pointerEvents: 'none',
              }}
            />

            {/* 메탈릭 외부 림 */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #1e3a8a, #2563eb, #1e40af, #3b82f6, #1e3a8a, #2563eb, #1e40af, #3b82f6, #1e3a8a)',
                boxShadow: '0 0 30px rgba(37,99,235,0.4), inset 0 0 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 4,
                  borderRadius: '50%',
                  background: 'linear-gradient(145deg, #0c1a4a, #0f2060)',
                }}
              />
            </div>

            {/* 림 조명 */}
            {Array.from({ length: RIM_COUNT }, (_, i) => (
              <RimLight
                key={`rim-${i}`}
                angle={(i / RIM_COUNT) * 360 - 90}
                radius={RIM_RADIUS}
                index={i}
                spinning={spinning}
              />
            ))}

            {/* 포인터 ▼ */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -30,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
              }}
            >
              <svg width="38" height="46" viewBox="0 0 28 34">
                <defs>
                  <linearGradient id="rlPointerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <path d="M14 34 L3 8 Q0 0 14 0 Q28 0 25 8 Z" fill="url(#rlPointerGrad)" />
                <path d="M14 34 L3 8 Q0 0 14 0" fill="rgba(255,255,255,0.15)" />
                <circle cx="14" cy="10" r="3.5" fill="#ffffff" opacity="0.9" />
              </svg>
            </div>

            {/* SVG 휠 */}
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                transform: `rotate(${rotation}deg)`,
                transition: transitioning
                  ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                  : 'none',
                willChange: 'transform',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
              }}
            >
              <defs>
                {rouletteSlices.map((s, i) => (
                  <linearGradient key={`rlGrad-${i}`} id={`rlSegGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={s.lightColor} />
                    <stop offset="100%" stopColor={s.color} />
                  </linearGradient>
                ))}
                <radialGradient id="rlOverlay" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                </radialGradient>
              </defs>

              {rouletteSlices.map((s, i) => {
                const startDeg = i * SLICE_DEG - 90;
                const endDeg = startDeg + SLICE_DEG;
                const sR = toRad(startDeg);
                const eR = toRad(endDeg);
                const x1 = CX + R * Math.cos(sR);
                const y1 = CY + R * Math.sin(sR);
                const x2 = CX + R * Math.cos(eR);
                const y2 = CY + R * Math.sin(eR);
                const midRad = toRad((startDeg + endDeg) / 2);
                const tR = R * 0.66;
                const tx = CX + tR * Math.cos(midRad);
                const ty = CY + tR * Math.sin(midRad);
                const textRot = (startDeg + endDeg) / 2 + 90;

                return (
                  <g key={s.id}>
                    <path
                      d={`M ${CX} ${CY} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`}
                      fill={`url(#rlSegGrad${i})`}
                      stroke="rgba(0,0,0,0.25)"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={CX} y1={CY}
                      x2={x1.toFixed(2)} y2={y1.toFixed(2)}
                      stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="rgba(0,0,0,0.88)"
                      fontSize="12"
                      fontWeight="800"
                      transform={`rotate(${textRot}, ${tx.toFixed(2)}, ${ty.toFixed(2)})`}
                    >
                      {s.label.map((line, li) => (
                        <tspan key={li} x={tx.toFixed(2)} y={ty.toFixed(2)} dy={li === 0 ? -8 : 15}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}

              {/* 3D 광택 오버레이 */}
              <circle cx={CX} cy={CY} r={R} fill="url(#rlOverlay)" />

              {/* 중앙 링 */}
              <circle cx={CX} cy={CY} r={60} fill="none" stroke="rgba(30,58,138,0.8)" strokeWidth="3" />
            </svg>

            {/* 센터 버튼 */}
            <button
              onClick={handleSpin}
              disabled={disabled}
              aria-label={spinning ? '룰렛 회전 중...' : '룰렛 돌리기'}
              aria-disabled={disabled}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 110,
                height: 110,
                borderRadius: '50%',
                border: '3px solid rgba(147,197,253,0.6)',
                background: disabled
                  ? 'radial-gradient(circle at 40% 35%, #1e40af, #0f1b3d)'
                  : 'radial-gradient(circle at 40% 35%, #ffffff, #dbeafe, #93c5fd)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: 16,
                fontWeight: 900,
                color: disabled ? '#60a5fa' : '#1e3a8a',
                letterSpacing: 1,
                boxShadow: disabled
                  ? '0 0 20px rgba(37,99,235,0.4), inset 0 2px 8px rgba(0,0,0,0.3)'
                  : '0 4px 20px rgba(0,0,0,0.4), 0 0 30px rgba(147,197,253,0.3), inset 0 -3px 6px rgba(0,0,0,0.1), inset 0 3px 6px rgba(255,255,255,0.8)',
                zIndex: 15,
                transition: 'all 0.3s ease',
              }}
            >
              {spinning ? '...' : 'START'}
            </button>
          </div>

          {/* 돌리기 버튼 */}
          <motion.button
            onClick={handleSpin}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.96 } : {}}
            aria-label={spinning ? '룰렛 회전 중...' : '룰렛 돌리기'}
            aria-disabled={disabled}
            className={`flex items-center gap-2 px-12 py-4 rounded-full text-base font-bold transition-all duration-300 ${
              disabled
                ? 'bg-white/10 text-[#5A5A70] cursor-not-allowed'
                : 'bg-aurora-h text-white shadow-glow-sm hover:shadow-glow'
            }`}
          >
            {spinning ? '🎰 돌리는 중...' : '🎰 돌리기'}
          </motion.button>

          <p className="text-sm text-[#5A5A70]">💡 꽝이 없는 룰렛! 100% 당첨!</p>
        </div>

        {/* 상품 목록 */}
        <ul aria-label="룰렛 당첨 상품 목록" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {rouletteSlices.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <span
                aria-hidden="true"
                className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-sm text-[#9090A8] truncate">{s.label.join(' ')}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 잭팟 모달 */}
      <AnimatePresence>
        {jackpot && (
          <>
            <JackpotConfetti />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
              onClick={() => setJackpot(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="dialog"
                aria-modal="true"
                aria-label="잭팟 당첨 축하"
                onClick={(e) => e.stopPropagation()}
                className="glass border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.25) 0%, rgba(0,212,255,0.1) 100%)' }}
              >
                <p className="text-4xl" aria-hidden="true">🎊🎊🎊</p>
                <div className="space-y-1">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-aurora-1">JACKPOT!</p>
                  <h3 className="text-2xl font-black text-white">{jackpot.name}</h3>
                  <p className="text-lg font-bold text-aurora-4">당첨되셨습니다!</p>
                </div>
                <p className="text-sm text-[#9090A8]">마이페이지에서 수령 방법을 확인하세요</p>
                <div className="flex flex-col gap-2 pt-2">
                  <motion.button
                    onClick={() => { setJackpot(null); navigate('/mypage'); }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-2xl bg-aurora-h text-white text-sm font-bold"
                  >
                    마이페이지에서 확인하기
                  </motion.button>
                  <button
                    onClick={() => setJackpot(null)}
                    className="w-full py-2.5 rounded-2xl glass border border-white/15 text-sm font-semibold text-[#9090A8] hover:text-white transition-colors"
                  >
                    계속 참여하기
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function JackpotConfetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: ['#FF6B6B', '#00D4FF', '#FFD93D', '#6C5CE7', '#A8E6CF', '#FF8A5C'][i % 6],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: 6 + Math.floor(Math.random() * 8),
    duration: `${3 + Math.random() * 2}s`,
  }));

  return (
    <>
      <style>{`
        @keyframes confetti-drop {
          0%   { transform: translateY(-40px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh)  rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div aria-hidden="true" className="fixed inset-0 z-[49] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-sm"
            style={{
              left: p.left,
              top: 0,
              width: p.size,
              height: p.size,
              background: p.color,
              animation: `confetti-drop ${p.duration} ${p.delay} linear forwards`,
            }}
          />
        ))}
      </div>
    </>
  );
}
