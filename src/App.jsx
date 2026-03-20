import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import DestinationDashboard from './components/DestinationDashboard/DestinationDashboard';
import WeatherWidget from './components/WeatherWidget/WeatherWidget';
import TourCards from './components/TourCards/TourCards';
import VlogFeed from './components/VlogFeed/VlogFeed';
import TipsAccordion from './components/TipsAccordion/TipsAccordion';
import DomesticCities from './components/DomesticCities/DomesticCities';
import CouponFAB from './components/CouponSystem/CouponFAB';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import CommunityPage from './components/Community/CommunityPage';
import VlogPage from './components/VlogPage/VlogPage';
import DestinationDetailPage from './components/DestinationDetail/DestinationDetailPage';
import EventPage from './components/Event/EventPage';
import MyPage from './components/MyPage/MyPage';
import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

function HomePage({ isCouponOpen, setIsCouponOpen }) {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <>
      <main id="main-content">
        {/* S01 — 풀스크린 히어로 */}
        <Hero onDestinationSelect={setSelectedDestination} />

        {/* S02 — 여행지 큐레이션 대시보드 */}
        <DestinationDashboard
          selectedDestination={selectedDestination}
          onSelect={setSelectedDestination}
        />

        {/* S03 — 국내 소도시 섹션 */}
        <DomesticCities
          selectedDestination={selectedDestination}
          onSelect={setSelectedDestination}
        />

        {/* S05 — 상세 정보 패널 (여행지 선택 시 표시) */}
        <AnimatePresence>
          {selectedDestination && (
            <motion.section
              key={selectedDestination.id}
              id="detail-panel"
              aria-label={`${selectedDestination.name} 상세 정보`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="dark:bg-void bg-slate-50"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24 py-16 lg:py-24 space-y-20">

                {/* 선택된 여행지 헤더 */}
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <p className="text-xs font-bold tracking-[0.22em] uppercase text-aurora-1">
                    {selectedDestination.country} &nbsp;·&nbsp; {selectedDestination.region}
                  </p>
                  <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white">
                    {selectedDestination.name}
                  </h2>
                  <p className="text-[#9090A8] text-lg max-w-2xl mx-auto leading-relaxed">
                    {selectedDestination.description}
                  </p>
                  {/* 하이라이트 태그 */}
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {selectedDestination.tags.map((tag) => (
                      <span key={tag} className="tag-theme text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* 주요 명소 링크 */}
                  {Array.isArray(selectedDestination.highlight) && selectedDestination.highlight.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 pt-1" aria-label="주요 명소">
                      {selectedDestination.highlight.map((item) => (
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
                    transition={{ delay: 0.25, duration: 0.6 }}
                  >
                    <ErrorBoundary section="날씨 위젯" minimal>
                      <WeatherWidget city={selectedDestination.weatherCity} />
                    </ErrorBoundary>
                  </motion.div>
                  <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                  >
                    <ErrorBoundary section="투어 카드" minimal>
                      <TourCards
                        slug={selectedDestination.slug}
                        destinationName={selectedDestination.name}
                      />
                    </ErrorBoundary>
                  </motion.div>
                </div>

                {/* 유튜브 브이로그 피드 */}
                <ErrorBoundary section="브이로그 피드">
                  <VlogFeed
                    slug={selectedDestination.slug}
                    destinationName={selectedDestination.name}
                  />
                </ErrorBoundary>

                {/* 실전 팁 아코디언 */}
                <ErrorBoundary section="여행 팁">
                  <TipsAccordion
                    slug={selectedDestination.slug}
                    destinationName={selectedDestination.name}
                  />
                </ErrorBoundary>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* 플로팅 쿠폰 버튼 + 모달 */}
      <CouponFAB
        isOpen={isCouponOpen}
        onToggle={() => setIsCouponOpen((p) => !p)}
      />
    </>
  );
}

function AppContent() {
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  return (
    <>
      {/* 접근성: 본문 바로가기 */}
      <a href="#main-content" className="skip-link">
        본문 바로가기
      </a>

      {/* 고정 글래스 네비게이션 */}
      <Header onCouponClick={() => setIsCouponOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isCouponOpen={isCouponOpen}
              setIsCouponOpen={setIsCouponOpen}
            />
          }
        />
        <Route path="/destination/:slug" element={<DestinationDetailPage />} />
        <Route
          path="/community"
          element={
            <main id="main-content" className="min-h-screen dark:bg-void bg-slate-50 pt-16">
              <CommunityPage />
            </main>
          }
        />
        <Route
          path="/vlog"
          element={
            <main id="main-content" className="min-h-screen dark:bg-void bg-slate-50 pt-16">
              <VlogPage />
            </main>
          }
        />
        <Route
          path="/event"
          element={
            <main id="main-content" className="min-h-screen dark:bg-void bg-slate-50 pt-16">
              <EventPage />
            </main>
          }
        />
        <Route
          path="/mypage"
          element={
            <main id="main-content" className="min-h-screen dark:bg-void bg-slate-50 pt-16">
              <MyPage />
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AppProvider>
  );
}
