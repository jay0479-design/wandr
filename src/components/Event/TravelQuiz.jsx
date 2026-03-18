import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightbulb } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { getTodayQuiz } from '../../data/event/quizzes';

const quiz = getTodayQuiz();

export default function TravelQuiz({ onReward }) {
  const { user, processQuizResult } = useUser();
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === quiz.answer;
  const isDone = user.quizCompletedToday;

  const handleSelect = (idx) => {
    if (isDone || selected !== null) return;
    setSelected(idx);
    const correct = idx === quiz.answer;
    const rewardValue = correct ? quiz.reward.correct : quiz.reward.wrong;
    processQuizResult(correct, rewardValue);
    onReward({
      id: `toast-quiz-${Date.now()}`,
      type: 'credit',
      name: correct
        ? `🎉 정답! 적립금 ₩${rewardValue.toLocaleString()} + 룰렛 추가 1회!`
        : `아쉽지만 참여 보상 ₩${rewardValue.toLocaleString()}`,
      value: rewardValue,
      source: 'quiz',
    });
  };

  const getOptionStyle = (idx) => {
    if (selected === null && !isDone) {
      return 'bg-white/5 border-white/10 text-[#9090A8] hover:bg-white/10 hover:border-aurora-1/40 hover:text-white cursor-pointer';
    }
    if (idx === quiz.answer) {
      return 'bg-green-500/20 border-green-400/60 text-green-300';
    }
    if ((selected === idx || isDone) && idx !== quiz.answer) {
      return selected === idx
        ? 'bg-red-500/20 border-red-400/60 text-red-300'
        : 'bg-white/5 border-white/10 text-[#5A5A70]';
    }
    return 'bg-white/5 border-white/10 text-[#5A5A70]';
  };

  return (
    <section aria-labelledby="quiz-heading" className="glass border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      {/* 헤더 */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-aurora-2/15 flex items-center justify-center flex-shrink-0">
          <Brain size={20} aria-hidden="true" className="text-aurora-2" />
        </div>
        <div>
          <h2 id="quiz-heading" className="text-lg font-extrabold text-white">
            오늘의 여행 퀴즈
          </h2>
          <p className="text-xs text-[#9090A8] mt-0.5">
            맞추면 여행 적립금 + 보너스 룰렛 기회!
          </p>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <p className="text-xs font-bold text-aurora-4">
            정답: +₩{quiz.reward.correct.toLocaleString()}
          </p>
          <p className="text-xs text-[#5A5A70]">
            참여: +₩{quiz.reward.wrong.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 질문 */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
        <p className="text-base font-bold text-white leading-relaxed">
          Q. {quiz.question}
        </p>

        {/* 보기 */}
        <div
          role="radiogroup"
          aria-label="퀴즈 보기"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          {quiz.options.map((option, idx) => (
            <motion.button
              key={idx}
              role="radio"
              aria-checked={selected === idx}
              aria-disabled={selected !== null || isDone}
              onClick={() => handleSelect(idx)}
              whileTap={selected === null && !isDone ? { scale: 0.98 } : {}}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${getOptionStyle(idx)}`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {['①', '②', '③', '④'][idx]}
              </span>
              <span>{option}</span>
              {(selected !== null || isDone) && idx === quiz.answer && (
                <span className="ml-auto text-green-400" aria-hidden="true">✓</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* 힌트 */}
        <div>
          <button
            onClick={() => setShowHint((p) => !p)}
            aria-expanded={showHint}
            aria-controls="quiz-hint"
            className="flex items-center gap-1.5 text-xs text-[#5A5A70] hover:text-[#9090A8] transition-colors"
          >
            <Lightbulb size={12} aria-hidden="true" />
            힌트 {showHint ? '숨기기' : '보기'}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.p
                id="quiz-hint"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-aurora-4 mt-2 pl-4 border-l-2 border-aurora-4/40"
              >
                💡 {quiz.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 결과 / 상태 메시지 */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-4 text-center ${
              isCorrect
                ? 'bg-green-500/15 border border-green-400/30'
                : 'bg-red-500/10 border border-red-400/20'
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-base font-bold text-white">
              {isCorrect
                ? '🎉 정답입니다! 적립금 ₩2,000 + 룰렛 추가 1회!'
                : `😅 아쉬워요! 참여 보상 ₩${quiz.reward.wrong.toLocaleString()} 적립!`}
            </p>
            <p className="text-xs text-[#9090A8] mt-1">
              {isCorrect
                ? `정답: ${quiz.options[quiz.answer]}`
                : `정답은 "${quiz.options[quiz.answer]}" 이었습니다.`}
            </p>
          </motion.div>
        )}
        {isDone && selected === null && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 text-center bg-white/5 border border-white/10"
            role="status"
          >
            <p className="text-sm font-semibold text-[#9090A8]">
              오늘 퀴즈 참여 완료 ✅
            </p>
            <p className="text-xs text-[#5A5A70] mt-1">내일 새로운 퀴즈가 기다려요!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
