import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

export default function CreditSummary() {
  const { user } = useUser();

  const totalRewards = user.rewards.length;
  const creditRewards = user.rewards.filter((r) => r.type === 'credit');
  const totalCredit = creditRewards.reduce((sum, r) => sum + r.value, 0);

  const stats = [
    { label: '총 적립금', value: `₩${totalCredit.toLocaleString()}`, highlight: true },
    { label: '총 출석일', value: `${user.attendance.totalDays}일` },
    { label: '당첨 횟수', value: `${totalRewards}회` },
    { label: '연속 출석', value: `${user.attendance.streak}일` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass border border-white/10 rounded-3xl p-6 sm:p-8"
      aria-label="프로필 및 적립 현황"
    >
      {/* 프로필 */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar}
          alt={`${user.nickname} 프로필 이미지`}
          width={56}
          height={56}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <p className="text-xl font-extrabold text-white">{user.nickname}</p>
          <p className="text-xs text-[#9090A8]">WANDR 회원</p>
        </div>
      </div>

      {/* 통계 그리드 */}
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`rounded-2xl p-4 text-center ${
              highlight
                ? 'bg-aurora-4/10 border border-aurora-4/25'
                : 'bg-white/5 border border-white/8'
            }`}
          >
            <dt className="text-xs text-[#5A5A70] mb-1">{label}</dt>
            <dd
              className={`text-lg font-black ${
                highlight ? 'text-aurora-4' : 'text-white'
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
