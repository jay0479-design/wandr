import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const rouletteSlices = [
  { id: 's1', label: ['여행 지원금', '5만원'],  reward: { type: 'credit',   name: '여행 지원금 5만원',              value: 50000  }, color: '#FF6B6B', probability: 0.15 },
  { id: 's2', label: ['Sony ZV-1 II', '카메라'], reward: { type: 'product',  name: 'Sony ZV-1 II 브이로그 카메라',  value: 0      }, color: '#4ECDC4', probability: 0.03 },
  { id: 's3', label: ['신세계 상품권', '3만원'],  reward: { type: 'coupon',   name: '신세계 상품권 3만원',            value: 30000  }, color: '#FFE66D', probability: 0.12 },
  { id: 's4', label: ['대한항공', '30만 크레딧'], reward: { type: 'airline',  name: '대한항공 항공권 30만원 크레딧',  value: 300000 }, color: '#6C5CE7', probability: 0.02 },
  { id: 's5', label: ['여행 지원금', '1만원'],  reward: { type: 'credit',   name: '여행 지원금 1만원',              value: 10000  }, color: '#A8E6CF', probability: 0.25 },
  { id: 's6', label: ['여행 적립금', '3천원'],   reward: { type: 'credit',   name: '여행 적립금 3,000원',            value: 3000   }, color: '#FF8A5C', probability: 0.20 },
  { id: 's7', label: ['신세계 상품권', '1만원'],  reward: { type: 'coupon',   name: '신세계 상품권 1만원',            value: 10000  }, color: '#85C1E9', probability: 0.13 },
  { id: 's8', label: ['여행 지원금', '7만원'],  reward: { type: 'credit',   name: '여행 지원금 7만원',              value: 70000  }, color: '#F8C291', probability: 0.10 },
];

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 148;
const SLICES = 8;
const SLICE_DEG = 360 / SLICES;

const toRad = (deg) => (deg * Math.PI) / 180;

function buildSVG() {
  return rouletteSlices.map((slice, i) => {
    const startDeg = i * SLICE_DEG;
    const endDeg = (i + 1) * SLICE_DEG;
    const sR = toRad(startDeg - 90);
    const eR = toRad(endDeg - 90);
    const x1 = CX + R * Math.cos(sR);
    const y1 = CY + R * Math.sin(sR);
    const x2 = CX + R * Math.cos(eR);
    const y2 = CY + R * Math.sin(eR);
    const midRad = toRad((startDeg + endDeg) / 2 - 90);
    const tR = R * 0.66;
    const tx = CX + tR * Math.cos(midRad);
    const ty = CY + tR * Math.sin(midRad);
    const midDeg = (startDeg + endDeg) / 2;
    return {
      path: `M ${CX} ${CY} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      tx: tx.toFixed(2),
      ty: ty.toFixed(2),
      midDeg,
      ...slice,
    };
  });
}

const svgSlices = buildSVG();

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

export default function LuckyRoulette({ onReward }) {
  const { user, processRouletteWin } = useUser();
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [jackpot, setJackpot] = useState(null);
  const rotRef = useRef(0);

  const handleSpin = useCallback(() => {
    if (spinning || user.rouletteSpinsLeft <= 0) return;

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

  const spinsLeft = user.rouletteSpinsLeft;

  return (
    <>
      <section aria-labelledby="roulette-heading" className="glass border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="roulette-heading" className="text-lg font-extrabold text-white flex items-center gap-2">
              <span aria-hidden="true">🎰</span> 럭키 룰렛
            </h2>
            <p className="text-xs text-[#9090A8] mt-0.5">
              돌려돌려~ 대한항공 항공권부터 카메라까지!
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black text-aurora-4">{spinsLeft}</p>
            <p className="text-xs text-[#9090A8]">남은 횟수</p>
          </div>
        </div>

        {/* 룰렛 + 포인터 */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative" style={{ width: SIZE, height: SIZE + 24 }}>
            {/* 포인터 ▼ */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-0 h-0"
              style={{
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '20px solid #00D4FF',
                filter: 'drop-shadow(0 0 6px #00D4FF)',
              }}
            />

            {/* 룰렛 원 */}
            <div
              className="mt-6"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: transitioning
                  ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                  : 'none',
                willChange: 'transform',
              }}
            >
              <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                aria-hidden="true"
                style={{ display: 'block', borderRadius: '50%', overflow: 'hidden' }}
              >
                {/* 섹터 */}
                {svgSlices.map((s, i) => (
                  <g key={s.id}>
                    <path d={s.path} fill={s.color} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                    <text
                      x={s.tx}
                      y={s.ty}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${s.midDeg}, ${s.tx}, ${s.ty})`}
                      fontSize="10"
                      fontWeight="700"
                      fill="rgba(0,0,0,0.85)"
                    >
                      {s.label.map((line, li) => (
                        <tspan key={li} x={s.tx} dy={li === 0 ? '-6' : '13'}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                ))}
                {/* 중앙 원 */}
                <circle cx={CX} cy={CY} r={22} fill="rgba(10,10,15,0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="white">
                  🎰
                </text>
              </svg>
            </div>
          </div>

          {/* 돌리기 버튼 */}
          <motion.button
            onClick={handleSpin}
            disabled={spinning || spinsLeft === 0}
            whileHover={!spinning && spinsLeft > 0 ? { scale: 1.05 } : {}}
            whileTap={!spinning && spinsLeft > 0 ? { scale: 0.96 } : {}}
            aria-label={
              spinsLeft === 0
                ? '오늘 룰렛 횟수를 모두 사용했습니다'
                : spinning
                ? '룰렛 회전 중...'
                : `룰렛 돌리기 (${spinsLeft}회 남음)`
            }
            aria-disabled={spinning || spinsLeft === 0}
            className={`flex items-center gap-2 px-10 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
              spinning || spinsLeft === 0
                ? 'bg-white/10 text-[#5A5A70] cursor-not-allowed'
                : 'bg-aurora-h text-white shadow-glow-sm hover:shadow-glow'
            }`}
          >
            {spinning ? '🎰 돌리는 중...' : spinsLeft === 0 ? '오늘 횟수 소진' : '🎰 돌리기'}
          </motion.button>

          <p className="text-xs text-[#5A5A70]">
            💡 꽝이 없는 룰렛! 100% 당첨!
          </p>
        </div>

        {/* 상품 목록 */}
        <ul
          aria-label="룰렛 당첨 상품 목록"
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {rouletteSlices.map((s) => (
            <li key={s.id} className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/8">
              <span
                aria-hidden="true"
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <span className="text-xs text-[#9090A8] truncate">{s.label.join(' ')}</span>
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
                <p className="text-sm text-[#9090A8]">
                  마이페이지에서 수령 방법을 확인하세요
                </p>
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
