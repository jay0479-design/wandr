import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Droplets, Eye, Thermometer, RefreshCw, Clock, WifiOff } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

// ── Mock 날씨 데이터 (API 키 없이 동작) ──────────────────────
const MOCK_WEATHER = {
  Tokyo:      { temp: 18, feelsLike: 16, humidity: 62, windSpeed: 4.2, visibility: 10, condition: 'clear', description: '맑음', uvIndex: '보통', localTime: 'Asia/Tokyo' },
  Paris:      { temp: 14, feelsLike: 12, humidity: 74, windSpeed: 6.1, visibility: 9,  condition: 'cloudy', description: '흐림', uvIndex: '낮음', localTime: 'Europe/Paris' },
  Denpasar:   { temp: 29, feelsLike: 34, humidity: 85, windSpeed: 2.8, visibility: 8,  condition: 'rain', description: '소나기', uvIndex: '높음', localTime: 'Asia/Makassar' },
  'New York': { temp: 7,  feelsLike: 4,  humidity: 58, windSpeed: 9.5, visibility: 12, condition: 'clear', description: '맑음', uvIndex: '낮음', localTime: 'America/New_York' },
  Santorini:  { temp: 22, feelsLike: 21, humidity: 55, windSpeed: 5.4, visibility: 20, condition: 'clear', description: '화창', uvIndex: '높음', localTime: 'Europe/Athens' },
  Prague:     { temp: 10, feelsLike: 8,  humidity: 71, windSpeed: 4.0, visibility: 8,  condition: 'cloudy', description: '구름 많음', uvIndex: '낮음', localTime: 'Europe/Prague' },
  Dubai:      { temp: 35, feelsLike: 38, humidity: 40, windSpeed: 7.2, visibility: 15, condition: 'clear', description: '화창·더움', uvIndex: '매우 높음', localTime: 'Asia/Dubai' },
  Lisbon:     { temp: 19, feelsLike: 18, humidity: 65, windSpeed: 5.5, visibility: 12, condition: 'clear', description: '맑음', uvIndex: '보통', localTime: 'Europe/Lisbon' },
};

const FIVE_DAY_FORECAST = [
  { day: '오늘',   icon: 'clear',  high: '+2', low: '-2' },
  { day: '내일',   icon: 'cloudy', high: '+1', low: '-1' },
  { day: '모레',   icon: 'rain',   high: '+3', low: '+1' },
  { day: '3일 후', icon: 'cloudy', high: '+2', low: '-1' },
  { day: '4일 후', icon: 'clear',  high: '+4', low: '+1' },
];

const UV_COLOR = {
  '낮음': 'text-emerald-400', '보통': 'text-yellow-400',
  '높음': 'text-orange-400',  '매우 높음': 'text-red-400',
};

function useLocalTime(timezone) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('ko-KR', {
        timeZone: timezone,
        hour: '2-digit', minute: '2-digit', hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, [timezone]);
  return time;
}

function DetailItem({ icon: Icon, label, value, className = '' }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="flex items-center gap-1.5 text-[11px] text-[#5A5A70] font-medium uppercase tracking-wider">
        <Icon size={11} aria-hidden="true" />
        {label}
      </dt>
      <dd className={`text-sm font-bold text-white ${className}`}>{value}</dd>
    </div>
  );
}

export default function WeatherWidget({ city }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const fetchWeather = useCallback(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const data = MOCK_WEATHER[city];
      if (!data) {
        setError('날씨 정보를 불러오지 못했습니다.');
        setLoading(false);
        return;
      }
      setWeather(data);
      setUpdatedAt(new Date());
      setLoading(false);
    }, 600);
  }, [city]);

  useEffect(() => { fetchWeather(); }, [fetchWeather]);

  const localTime = useLocalTime(weather?.localTime ?? 'Asia/Seoul');
  const updatedStr = updatedAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  // 5일 예보: 기온 오프셋 적용
  const forecast = weather
    ? FIVE_DAY_FORECAST.map((f, i) => ({
        ...f,
        high: weather.temp + parseInt(f.high) + (i === 0 ? 0 : -1),
        low:  weather.temp + parseInt(f.low)  + (i === 0 ? 0 : -2),
      }))
    : [];

  return (
    <article
      aria-label={`${city} 현지 실시간 날씨`}
      className="glass rounded-3xl overflow-hidden h-full"
    >
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-aurora-1">현지 날씨</p>
          <h3 className="text-base font-semibold text-white mt-0.5">{city}</h3>
        </div>
        <div className="flex items-center gap-2">
          <time
            dateTime={updatedAt.toISOString()}
            className="text-[11px] text-[#5A5A70]"
            aria-label={`마지막 업데이트: ${updatedStr}`}
          >
            {updatedStr} 업데이트
          </time>
          <button
            onClick={fetchWeather}
            aria-label="날씨 정보 새로고침"
            className="w-7 h-7 rounded-full glass flex items-center justify-center text-[#9090A8] hover:text-white transition-colors"
          >
            <RefreshCw
              size={12}
              aria-hidden="true"
              className={loading ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {/* 에러 상태 */}
        {!loading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-8 flex flex-col items-center justify-center gap-4 text-center"
            role="alert"
            aria-live="assertive"
          >
            <div className="w-14 h-14 rounded-full bg-[rgba(255,107,107,0.12)] border border-[rgba(255,107,107,0.25)] flex items-center justify-center mt-4">
              <WifiOff size={24} aria-hidden="true" className="text-[#FF6B6B]" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">{error}</p>
              <p className="text-xs text-[#5A5A70]">네트워크 상태를 확인하고 다시 시도해 주세요.</p>
            </div>
            <button
              onClick={fetchWeather}
              aria-label="날씨 정보 다시 불러오기"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-aurora-h text-white text-xs font-bold hover:shadow-glow-sm transition-shadow"
            >
              <RefreshCw size={12} aria-hidden="true" />
              다시 시도
            </button>
          </motion.div>
        )}

        {/* 정상 데이터 상태 */}
        {!loading && !error && weather && (
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-6 space-y-5"
          >
            {/* 메인 온도 + 아이콘 */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-6xl font-black text-white leading-none tracking-tighter"
                  aria-label={`현재 기온 ${weather.temp}도`}
                >
                  {weather.temp}
                  <span className="text-2xl font-bold text-[#9090A8] ml-1">°C</span>
                </div>
                <p className="text-sm text-[#9090A8] mt-1.5 font-medium">{weather.description}</p>
              </div>
              <WeatherIcon condition={weather.condition} size={72} />
            </div>

            {/* 상세 그리드 */}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 pt-2 border-t border-white/8">
              <DetailItem icon={Thermometer} label="체감 온도" value={`${weather.feelsLike}°C`} />
              <DetailItem icon={Droplets}    label="습도"      value={`${weather.humidity}%`} />
              <DetailItem icon={Wind}        label="풍속"      value={`${weather.windSpeed} m/s`} />
              <DetailItem icon={Eye}         label="가시거리"  value={`${weather.visibility} km`} />
              <DetailItem
                icon={Clock}
                label="현지 시각"
                value={localTime}
                className="tabular-nums"
              />
              <div className="flex flex-col gap-1">
                <dt className="text-[11px] text-[#5A5A70] font-medium uppercase tracking-wider">
                  자외선 지수
                </dt>
                <dd className={`text-sm font-bold ${UV_COLOR[weather.uvIndex] || 'text-white'}`}>
                  {weather.uvIndex}
                </dd>
              </div>
            </dl>

            {/* 5일 예보 */}
            <div
              className="pt-3 border-t border-white/8"
              aria-label="5일 예보"
            >
              <p className="text-[11px] font-bold text-[#5A5A70] uppercase tracking-wider mb-3">
                5일 예보
              </p>
              <div role="list" className="flex justify-between gap-1">
                {forecast.map((f) => (
                  <div
                    key={f.day}
                    role="listitem"
                    className="flex flex-col items-center gap-1.5"
                    aria-label={`${f.day}: ${f.high}도 / ${f.low}도`}
                  >
                    <span className="text-[10px] text-[#5A5A70] font-medium">{f.day}</span>
                    <WeatherIcon condition={f.icon} size={20} animated={false} />
                    <span className="text-[11px] font-bold text-white">{f.high}°</span>
                    <span className="text-[10px] text-[#5A5A70]">{f.low}°</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pb-6 space-y-4"
            aria-busy="true"
            aria-label="날씨 정보 로딩 중"
          >
            {[72, 48, 32, 32].map((w, i) => (
              <div
                key={i}
                className={`skeleton rounded-xl h-6 w-${w === 72 ? 32 : w === 48 ? 24 : 20}`}
                style={{ height: i === 0 ? '56px' : '20px', width: `${w}%` }}
                aria-hidden="true"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
