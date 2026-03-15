import { motion } from 'framer-motion';
import AccordionItem from './AccordionItem';
import { getTipsForDestination } from '../../data/tips';

export default function TipsAccordion({ slug, destinationName }) {
  const tips = getTipsForDestination(slug);
  const tipEntries = Object.values(tips);

  return (
    <section id="tips" aria-label={`${destinationName} 실전 여행 가이드`}>

      {/* 섹션 헤더 */}
      <motion.div
        className="mb-8 space-y-3"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-aurora-1">
          Local Guide
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            실전 여행 가이드
          </h3>
          <p className="text-sm text-[#5A5A70]">
            현지에서 꼭 알아야 할 실용 정보
          </p>
        </div>
      </motion.div>

      {/* 아코디언 2열 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tipEntries.map(({ icon, title, content }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
          >
            <AccordionItem
              icon={icon}
              title={title}
              content={content}
              defaultOpen={i === 0}
            />
          </motion.div>
        ))}
      </div>

      {/* 보험 CTA 배너 */}
      <motion.div
        className="mt-8 glass rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-[rgba(0,212,255,0.15)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="text-3xl flex-shrink-0" aria-hidden="true">🛡️</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">여행자 보험, 아직 안 드셨나요?</p>
          <p className="text-xs text-[#9090A8] mt-1">
            질병·사고·도난·항공편 취소까지 커버하는 해외 여행자 보험. 출발 전 5분 만에 가입 완료.
          </p>
        </div>
        <a
          href="#"
          aria-label="여행자 보험 비교 및 가입하기 — 외부 사이트"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-5 py-2.5 rounded-full bg-aurora-h text-white text-xs font-bold hover:shadow-glow-sm transition-shadow whitespace-nowrap"
        >
          보험 비교하기 →
        </a>
      </motion.div>
    </section>
  );
}
