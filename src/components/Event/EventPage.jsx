import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import AttendanceCheck from './AttendanceCheck';
import LuckyRoulette from './LuckyRoulette';
import TravelQuiz from './TravelQuiz';
import RewardToast from './RewardToast';

export default function EventPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleReward = useCallback((reward) => {
    setToast(reward);
  }, []);

  const handleCloseToast = useCallback(() => setToast(null), []);

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-12 lg:py-20 space-y-12">

        {/* 페이지 헤더 */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
            Daily Event
          </p>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
            매일 참여하고, 여행 떠나자!
          </h1>
          <p className="text-[#9090A8] text-lg max-w-xl leading-relaxed">
            출석체크 · 룰렛 · 퀴즈 — 매일 당첨 기회!
          </p>
        </motion.div>

        {/* 유저 상태 바 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="glass border border-white/10 rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4"
          aria-label="내 이벤트 현황"
        >
          <img
            src={user.avatar}
            alt={`${user.nickname} 프로필`}
            width={36}
            height={36}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <p className="text-sm font-bold text-white">{user.nickname}님</p>
            <p className="text-xs text-[#5A5A70]">반갑습니다!</p>
          </div>
          <div className="flex flex-wrap gap-4 ml-auto">
            <div className="text-center">
              <p className="text-base font-black text-aurora-4">
                ₩{user.credit.toLocaleString()}
              </p>
              <p className="text-xs text-[#5A5A70]">적립금</p>
            </div>
            <div className="text-center">
              <p className="text-base font-black text-aurora-1">
                {user.attendance.streak}일
              </p>
              <p className="text-xs text-[#5A5A70]">연속 출석</p>
            </div>
            <div className="text-center">
              <p className="text-base font-black text-aurora-3">
                🎫 {user.rouletteSpinsLeft}회
              </p>
              <p className="text-xs text-[#5A5A70]">룰렛 남음</p>
            </div>
            <motion.button
              onClick={() => navigate('/mypage')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 rounded-full glass border border-white/15 text-xs font-semibold text-[#9090A8] hover:text-white transition-colors"
              aria-label="마이페이지로 이동"
            >
              MY 내역
            </motion.button>
          </div>
        </motion.div>

        {/* 섹션들 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AttendanceCheck onReward={handleReward} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <LuckyRoulette onReward={handleReward} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <TravelQuiz onReward={handleReward} />
        </motion.div>
      </div>

      {/* 토스트 */}
      <RewardToast toast={toast} onClose={handleCloseToast} />
    </>
  );
}
