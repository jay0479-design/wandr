import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreditSummary from './CreditSummary';
import RewardHistory from './RewardHistory';

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 lg:py-20 space-y-10">

      {/* 페이지 헤더 */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <button
          onClick={() => navigate('/event')}
          aria-label="이벤트 페이지로 돌아가기"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5A5A70] hover:text-[#9090A8] transition-colors mb-2"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          이벤트로 돌아가기
        </button>
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
          My Page
        </p>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          마이페이지
        </h1>
        <p className="text-[#9090A8] leading-relaxed">
          당첨 내역, 적립금, 쿠폰을 한눈에 확인하세요
        </p>
      </motion.div>

      {/* 프로필 + 통계 */}
      <CreditSummary />

      {/* 당첨 내역 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <RewardHistory />
      </motion.div>
    </div>
  );
}
