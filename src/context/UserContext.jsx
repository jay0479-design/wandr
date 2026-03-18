import { createContext, useContext, useState, useCallback } from 'react';

const getTodayStr = () => new Date().toISOString().slice(0, 10);

const getDateStr = (date) => new Date(date).toISOString().slice(0, 10);

function calcStreak(checkedDays) {
  if (!checkedDays.length) return 0;
  const today = getTodayStr();
  const set = new Set(checkedDays);
  if (!set.has(today)) return 0;
  let streak = 0;
  let d = new Date();
  while (set.has(getDateStr(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

const dailyRewards = [1000, 1000, 1000, 1000, 2000, 2000, 5000]; // Mon–Sun

const streakBonuses = {
  3: { credit: 2000, label: '연속 3일 출석 보너스' },
  5: { credit: 5000, label: '연속 5일 출석 보너스' },
  7: { credit: 10000, spins: 1, label: '연속 7일 보너스 + 룰렛 추가' },
};

const defaultUser = {
  id: 'lucky77',
  nickname: 'lucky77',
  avatar:
    'https://api.dicebear.com/9.x/lorelei/svg?seed=lucky77&backgroundColor=ffdfbf&backgroundType=solid',
  attendance: { checkedDays: [], streak: 0, totalDays: 0 },
  rewards: [],
  credit: 0,
  rouletteSpinsLeft: 3,
  quizCompletedToday: false,
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  const hasCheckedInToday = user.attendance.checkedDays.includes(getTodayStr());

  const checkIn = useCallback(() => {
    setUser((prev) => {
      const today = getTodayStr();
      if (prev.attendance.checkedDays.includes(today)) return prev;

      const newCheckedDays = [...prev.attendance.checkedDays, today];
      const streak = calcStreak(newCheckedDays);
      const weekday = (new Date().getDay() + 6) % 7; // 0=Mon, 6=Sun
      const dayReward = dailyRewards[weekday];

      const newRewards = [
        {
          id: `rwd-att-${Date.now()}`,
          type: 'credit',
          name: `출석 보상 (${weekday === 6 ? '일요일' : ['월','화','수','목','금','토'][weekday]}요일)`,
          value: dayReward,
          wonAt: new Date().toISOString(),
          source: 'attendance',
          status: 'received',
        },
        ...prev.rewards,
      ];

      let bonusCredit = 0;
      let bonusSpins = 0;
      const bonus = streakBonuses[streak];
      if (bonus) {
        bonusCredit = bonus.credit;
        bonusSpins = bonus.spins || 0;
        newRewards.unshift({
          id: `rwd-bonus-${Date.now()}`,
          type: 'credit',
          name: bonus.label,
          value: bonus.credit,
          wonAt: new Date().toISOString(),
          source: 'attendance',
          status: 'received',
        });
      }

      return {
        ...prev,
        attendance: {
          checkedDays: newCheckedDays,
          streak,
          totalDays: newCheckedDays.length,
        },
        rewards: newRewards,
        credit: prev.credit + dayReward + bonusCredit,
        rouletteSpinsLeft: prev.rouletteSpinsLeft + bonusSpins,
      };
    });
  }, []);

  const processRouletteWin = useCallback((reward) => {
    setUser((prev) => {
      if (prev.rouletteSpinsLeft <= 0) return prev;
      const newReward = {
        id: `rwd-rlt-${Date.now()}`,
        type: reward.type,
        name: reward.name,
        value: reward.value,
        wonAt: new Date().toISOString(),
        source: 'roulette',
        status: 'received',
      };
      return {
        ...prev,
        rouletteSpinsLeft: prev.rouletteSpinsLeft - 1,
        rewards: [newReward, ...prev.rewards],
        credit: reward.type === 'credit' ? prev.credit + reward.value : prev.credit,
      };
    });
  }, []);

  const processQuizResult = useCallback((isCorrect, rewardValue) => {
    setUser((prev) => {
      const newReward = {
        id: `rwd-quiz-${Date.now()}`,
        type: 'credit',
        name: isCorrect ? '퀴즈 정답 보상' : '퀴즈 참여 보상',
        value: rewardValue,
        wonAt: new Date().toISOString(),
        source: 'quiz',
        status: 'received',
      };
      return {
        ...prev,
        quizCompletedToday: true,
        rewards: [newReward, ...prev.rewards],
        credit: prev.credit + rewardValue,
        rouletteSpinsLeft: isCorrect
          ? prev.rouletteSpinsLeft + 1
          : prev.rouletteSpinsLeft,
      };
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, hasCheckedInToday, checkIn, processRouletteWin, processQuizResult }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within <UserProvider>');
  return ctx;
}

export { getTodayStr, dailyRewards, streakBonuses };
