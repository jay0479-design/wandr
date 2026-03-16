import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { domesticCities } from '../../data/domestic-cities';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import TourCards from '../TourCards/TourCards';
import VlogFeed from '../VlogFeed/VlogFeed';
import TipsAccordion from '../TipsAccordion/TipsAccordion';
import ErrorBoundary from '../ErrorBoundary';
import Footer from '../Footer/Footer';

const allDestinations = [...destinations, ...domesticCities];

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = allDestinations.find((d) => d.slug === slug);

  if (!dest) {
    return (
      <main id="main-content" className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-4xl">🗺️</p>
        <p className="text-white font-bold text-lg">여행지를 찾을 수 없어요</p>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-aurora-1 hover:underline"
        >
          홈으로 돌아가기
        </button>
      </main>
    );
  }

  return (
    <>
      <main id="main-content" className="dark:bg-void bg-slate-50 pt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-16 lg:py-24 space-y-20">

          {/* 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            aria-label="이전 페이지로 돌아가기"
            className="flex items-center gap-2 text-sm text-[#9090A8] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            뒤로가기
          </button>

          {/* 여행지 헤더 */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
              {dest.country} &nbsp;·&nbsp; {dest.region}
            </p>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white">
              {dest.name}
            </h1>
            <p className="text-[#9090A8] text-lg max-w-2xl mx-auto leading-relaxed">
              {dest.description}
            </p>
            {/* 태그 */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {dest.tags.map((tag) => (
                <span key={tag} className="tag-theme text-xs font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            {/* 주요 명소 링크 */}
            {Array.isArray(dest.highlight) && dest.highlight.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-1" aria-label="주요 명소">
                {dest.highlight.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} 정보 보기 (새 탭)`}
                    className="text-xs font-medium px-3 py-1 rounded-full glass border border-white/10 text-[#9090A8] hover:text-white hover:border-white/20 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* 위젯 그리드: 날씨(1/3) + 투어(2/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <ErrorBoundary section="날씨 위젯" minimal>
                <WeatherWidget city={dest.weatherCity} />
              </ErrorBoundary>
            </motion.div>
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ErrorBoundary section="투어 카드" minimal>
                <TourCards slug={dest.slug} destinationName={dest.name} />
              </ErrorBoundary>
            </motion.div>
          </div>

          {/* 브이로그 피드 */}
          <ErrorBoundary section="브이로그 피드">
            <VlogFeed slug={dest.slug} destinationName={dest.name} />
          </ErrorBoundary>

          {/* 실전 팁 아코디언 */}
          <ErrorBoundary section="여행 팁">
            <TipsAccordion slug={dest.slug} destinationName={dest.name} />
          </ErrorBoundary>

        </div>
      </main>

      <Footer />
    </>
  );
}
