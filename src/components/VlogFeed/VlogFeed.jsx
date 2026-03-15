import { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import VlogCard from './VlogCard';
import VlogModal from './VlogModal';
import { getVlogsForDestination } from '../../data/vlogs';

export default function VlogFeed({ slug, destinationName }) {
  const [activeVlog, setActiveVlog] = useState(null);
  const vlogs = getVlogsForDestination(slug);

  return (
    <section id="vlog-feed" aria-label={`${destinationName} 여행 브이로그`}>

      {/* 섹션 헤더 */}
      <motion.div
        className="mb-8 space-y-3"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-aurora-1">
            YouTube Vlogs
          </p>
          <Youtube
            size={14}
            aria-hidden="true"
            className="text-[#FF0000] opacity-80"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:justify-between">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            최근 브이로그
          </h3>
          <p className="text-sm text-[#5A5A70]">
            {destinationName}을(를) 다녀온 유튜버들의 생생한 후기
          </p>
        </div>
      </motion.div>

      {/* 비디오 그리드 */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        aria-label={`${destinationName} 브이로그 목록`}
      >
        {vlogs.map((vlog, i) => (
          <VlogCard
            key={vlog.videoId}
            vlog={vlog}
            onPlay={setActiveVlog}
            index={i}
          />
        ))}
      </div>

      {/* 유튜브 모달 */}
      <VlogModal vlog={activeVlog} onClose={() => setActiveVlog(null)} />
    </section>
  );
}
