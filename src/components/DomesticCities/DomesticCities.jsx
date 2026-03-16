import { motion } from 'framer-motion';
import DestinationCard from '../DestinationDashboard/DestinationCard';
import { domesticCities } from '../../data/domestic-cities';

export default function DomesticCities({ selectedDestination, onSelect }) {
  return (
    <section
      id="domestic-cities"
      aria-label="요즘 뜨는 국내 소도시"
      className="bg-obsidian"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-20 lg:py-28">

        {/* 섹션 헤더 */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
            Domestic Hidden Gems
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              요즘 뜨는 국내 소도시
            </h2>
            <p className="text-sm text-[#5A5A70]">
              {domesticCities.length}개 여행지 발견
            </p>
          </div>
        </motion.div>

        {/* 카드 그리드 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6"
        >
          {domesticCities.map((city, i) => (
            <DestinationCard
              key={city.id}
              destination={city}
              isSelected={selectedDestination?.id === city.id}
              onSelect={onSelect}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
