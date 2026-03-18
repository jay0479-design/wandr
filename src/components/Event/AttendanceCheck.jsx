import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { useUser, getTodayStr, dailyRewards, streakBonuses } from '../../context/UserContext';

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function getWeekDates() {
  const today = new Date();
  const dow = (today.getDay() + 6) % 7; // 0=Mon
  const monday = new Date(today);
  monday.setDate(today.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

export default function AttendanceCheck({ onReward }) {
  const { user, hasCheckedInToday, checkIn } = useUser();
  const weekDates = getWeekDates();
  const todayStr = getTodayStr();
  const todayIdx = weekDates.indexOf(todayStr);
  const checkedSet = new Set(user.attendance.checkedDays);

  const handleCheckIn = () => {
    if (hasCheckedInToday) return;
    checkIn();
    const weekday = (new Date().getDay() + 6) % 7;
    const reward = dailyRewards[weekday];
    const streak = user.attendance.streak + 1;
    const bonus = streakBonuses[streak];
    onReward({
      id: `toast-att-${Date.now()}`,
      type: 'credit',
      name: bonus
        ? `출석 보상 ₩${reward.toLocaleString()} + ${bonus.label}`
        : `출석 보상 ₩${reward.toLocaleString()}`,
      value: reward + (bonus?.credit || 0),
      source: 'attendance',
    });
  };

  const getSlotState = (dateStr, idx) => {
    if (dateStr > todayStr) return 'future';
    if (checkedSet.has(dateStr)) return 'done';
    if (dateStr === todayStr) return 'today';
    return 'missed';
  };

  return (
    <section aria-labelledby="attendance-heading" className="glass border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-aurora-1/15 flex items-center justify-center flex-shrink-0">
          <CalendarCheck size={20} aria-hidden="true" className="text-aurora-1" />
        </div>
        <div>
          <h2 id="attendance-heading" className="text-lg font-extrabold text-white">
            오늘의 출석체크
          </h2>
          <p className="text-xs text-[#9090A8]">연속 7일 출석하면 보너스 여행 지원금!</p>
        </div>
        {user.attendance.streak > 0 && (
          <div className="ml-auto text-right">
            <p className="text-2xl font-black text-aurora-4">{user.attendance.streak}</p>
            <p className="text-xs text-[#9090A8]">연속 출석</p>
          </div>
        )}
      </div>

      {/* 7일 그리드 */}
      <div
        role="list"
        aria-label="이번 주 출석 현황"
        className="grid grid-cols-7 gap-1.5 sm:gap-2"
      >
        {weekDates.map((dateStr, idx) => {
          const state = getSlotState(dateStr, idx);
          const reward = dailyRewards[idx];
          const isBonus = idx === 6;
          const isToday = dateStr === todayStr;

          return (
            <motion.div
              key={dateStr}
              role="listitem"
              aria-label={`${DAY_LABELS[idx]}요일: ${
                state === 'done' ? '출석 완료' : state === 'today' ? '오늘' : state === 'missed' ? '미출석' : '예정'
              }`}
              whileHover={state === 'today' && !hasCheckedInToday ? { y: -2 } : {}}
              className={`relative flex flex-col items-center rounded-2xl py-3 px-1 transition-all duration-200 ${
                state === 'done'
                  ? 'bg-aurora-1/15 border border-aurora-1/30'
                  : state === 'today' && !hasCheckedInToday
                  ? 'bg-aurora-1/20 border border-aurora-1/50 ring-1 ring-aurora-1/40'
                  : isToday && hasCheckedInToday
                  ? 'bg-aurora-1/15 border border-aurora-1/30'
                  : isBonus
                  ? 'bg-aurora-4/10 border border-aurora-4/20'
                  : 'bg-white/5 border border-white/8'
              }`}
            >
              <span className="text-[10px] font-bold text-[#9090A8] mb-1">
                {DAY_LABELS[idx]}
              </span>
              <span className="text-lg leading-none mb-1" aria-hidden="true">
                {state === 'done'
                  ? '✅'
                  : state === 'today' && !hasCheckedInToday
                  ? '🔵'
                  : isToday && hasCheckedInToday
                  ? '✅'
                  : isBonus
                  ? '⭐'
                  : '○'}
              </span>
              <span
                className={`text-[9px] font-semibold ${
                  isBonus ? 'text-aurora-4' : 'text-[#5A5A70]'
                }`}
              >
                +{(reward / 1000).toFixed(0)}천
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* 출석하기 버튼 */}
      <div className="flex flex-col items-center gap-3">
        <motion.button
          onClick={handleCheckIn}
          disabled={hasCheckedInToday}
          whileHover={!hasCheckedInToday ? { scale: 1.04 } : {}}
          whileTap={!hasCheckedInToday ? { scale: 0.97 } : {}}
          aria-label={hasCheckedInToday ? '오늘 출석 완료' : '출석하기'}
          aria-disabled={hasCheckedInToday}
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
            hasCheckedInToday
              ? 'bg-white/10 text-[#5A5A70] cursor-not-allowed'
              : 'bg-aurora-h text-white shadow-glow-sm hover:shadow-glow'
          }`}
        >
          {hasCheckedInToday ? '✅ 오늘 출석 완료' : '출석하기 ✓'}
        </motion.button>

        {/* 보너스 안내 */}
        <div role="list" aria-label="연속 출석 보너스 안내" className="flex flex-wrap justify-center gap-3 text-xs text-[#9090A8]">
          {Object.entries(streakBonuses).map(([day, bonus]) => (
            <span
              key={day}
              role="listitem"
              className={`px-3 py-1 rounded-full glass border border-white/10 ${
                user.attendance.streak >= Number(day) ? 'text-aurora-4 border-aurora-4/30' : ''
              }`}
            >
              {day}일 연속: +₩{bonus.credit.toLocaleString()}
              {bonus.spins ? ' + 룰렛 1회' : ''}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
