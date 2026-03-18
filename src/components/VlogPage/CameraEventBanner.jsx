import { motion } from 'framer-motion';
import { Camera, ExternalLink } from 'lucide-react';

const cameraProducts = [
  'Sony ZV-1 II',
  'DJI Osmo Pocket 3',
  'GoPro HERO13 Black',
  'Insta360 X4',
];

const bannerImage = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80&auto=format&fit=crop';

export default function CameraEventBanner() {
  const handleCTA = (e) => {
    e.preventDefault();
    alert('이벤트 준비 중입니다! 곧 오픈할게요 🎥');
  };

  return (
    <motion.section
      aria-label="브이로거 카메라 기획전 이벤트 배너"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass border border-white/10 rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 50%, rgba(255,107,107,0.08) 100%)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* 좌측: 이미지 */}
        <div className="relative h-56 md:h-auto overflow-hidden">
          <img
            src={bannerImage}
            alt="카메라를 들고 풍경을 촬영하는 여행자 실루엣"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, transparent 60%, rgba(10,10,15,0.8) 100%)',
            }}
          />
        </div>

        {/* 우측: 텍스트 */}
        <div className="p-7 sm:p-8 flex flex-col justify-center space-y-5">
          {/* 아이콘 + 태그라인 */}
          <div className="flex items-center gap-2">
            <Camera size={18} aria-hidden="true" className="text-aurora-1 flex-shrink-0" />
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
              브이로거를 위한 특별 혜택
            </p>
          </div>

          {/* 헤드라인 */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              여행 브이로그 전용
              <br />
              카메라 기획전
            </h2>
            <p className="text-sm text-[#9090A8] leading-relaxed">
              Wandr 회원 전용 최대&nbsp;
              <span className="text-aurora-4 font-bold">15% 할인</span>
            </p>
          </div>

          {/* 제품 목록 */}
          <ul aria-label="할인 대상 제품" className="flex flex-wrap gap-2">
            {cameraProducts.map((product) => (
              <li key={product}>
                <span className="text-xs font-semibold px-3 py-1 rounded-full glass border border-white/10 text-[#9090A8]">
                  {product}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="space-y-3">
            <motion.button
              onClick={handleCTA}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-aurora-h text-white text-sm font-bold shadow-glow-sm hover:shadow-glow transition-shadow duration-300"
              aria-label="카메라 이벤트 자세히 보기 (준비 중)"
            >
              이벤트 자세히 보기
              <ExternalLink size={14} aria-hidden="true" />
            </motion.button>

            {/* 이벤트 기간 */}
            <p className="text-xs text-[#5A5A70]">
              <time dateTime="2026-03-01">📅 2026.03.01</time>
              &nbsp;~&nbsp;
              <time dateTime="2026-04-30">2026.04.30</time>
              &nbsp;|&nbsp;선착순 100명
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
