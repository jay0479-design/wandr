// 실전 팁 데이터 — 여행지 slug별 맞춤 정보
export const tipsByDestination = {
  tokyo: {
    transport: {
      icon: '🚇',
      title: '대중교통 & 카드 호환 가이드',
      content: [
        {
          type: 'table',
          caption: '도쿄 지하철 카드 호환 정보',
          headers: ['카드명', '발급사', '도쿄 메트로', 'JR 노선', '수수료'],
          rows: [
            ['무신사 현대카드', '현대카드', '✅ Suica 연동', '✅', '0%'],
            ['신한 트래블리 플래티넘', '신한카드', '✅ EMV 탭앤고', '✅', '0%'],
            ['토스뱅크 체크카드', '토스뱅크', '⚠ 일부 노선', '⚠', '0%'],
            ['하나 트래블로그', '하나카드', '✅ IC 탑재', '✅', '0%'],
          ],
        },
        { type: 'tip', text: '📱 Suica 앱(Apple Wallet / Google Pay)으로 IC카드 없이도 이용 가능! 한국 신용카드 등록 지원.' },
        { type: 'tip', text: '🗺️ Google Maps 대신 "Yahoo! 乗換案内" 앱이 일본 환승 정보 훨씬 정확합니다.' },
        { type: 'tip', text: '💡 도쿄메트로 1일 패스 (24h ¥600 ≈ ₩5,500) — 3회 이상 탑승 시 이득.' },
      ],
    },
    voltage: {
      icon: '🔌',
      title: '전압 & 플러그 정보',
      content: [
        { type: 'info', label: '전압', value: '100V / 50-60Hz' },
        { type: 'info', label: '플러그 타입', value: 'A타입 (납작 2핀) — 한국과 동일!' },
        { type: 'info', label: '한국 가전', value: '대부분 이용 가능, 고전력 기기는 변압기 권장' },
        { type: 'tip', text: '✅ 스마트폰 충전기, 노트북은 100~240V 지원으로 별도 어댑터 불필요.' },
        { type: 'tip', text: '⚠ 드라이기, 고데기는 반드시 220V→100V 다운변압기 지참.' },
      ],
    },
    etiquette: {
      icon: '🎎',
      title: '현지 에티켓 & 문화 주의사항',
      content: [
        { type: 'tip', text: '🍜 라멘집·소바집: 큰 소리로 먹는 것 OK (맛있다는 표현). 음식 남기는 것은 실례.' },
        { type: 'tip', text: '🚇 지하철 내 통화 엄금. 우선석(노약자석) 근처에서 스마트폰도 진동으로.' },
        { type: 'tip', text: '♨️ 온천(오센): 타투 있으면 입장 불가인 곳 사전 확인 필수.' },
        { type: 'tip', text: '🚭 흡연은 지정 구역 외 절대 금지. 길거리 흡연 = 벌금.' },
        { type: 'tip', text: '💴 팁 문화 없음. 팁 주면 오히려 당황할 수 있음.' },
        { type: 'tip', text: '📸 신사·절: 사진 촬영 허용 구역 안내판 반드시 확인.' },
      ],
    },
    communication: {
      icon: '📱',
      title: '통신 & SIM 정보',
      content: [
        { type: 'tip', text: '🔥 IIJmio / Docomo eSIM — 7일 2GB ¥880 (약 ₩8,100). 출발 전 앱으로 개통.' },
        { type: 'tip', text: '📶 편의점(세븐일레븐, 로손) Wi-Fi 무료 제공. 등록 필요.' },
        { type: 'tip', text: '📡 포켓 와이파이 도쿄 공항 수령 → 반납 편리. 일행 3명 이상이면 추천.' },
      ],
    },
    emergency: {
      icon: '🆘',
      title: '비상 연락처 & 안전 정보',
      content: [
        { type: 'info', label: '경찰', value: '110' },
        { type: 'info', label: '소방/구급', value: '119' },
        { type: 'info', label: '주일 한국 대사관', value: '+81-3-3452-7611' },
        { type: 'info', label: '한국 외교부 영사콜센터', value: '+82-2-3210-0404 (24시간)' },
        { type: 'tip', text: '🌊 지진 대피: 건물 내 책상 아래, 이동 중이면 가방으로 머리 보호 후 건물 밖 대피.' },
      ],
    },
    finance: {
      icon: '💴',
      title: '환전 & 금융 팁',
      content: [
        { type: 'tip', text: '✅ 시내 환전(명동 환전소) > 공항 환전. 최대 3~4% 차이.' },
        { type: 'tip', text: '🏧 일본 7-Eleven ATM: 해외 카드 수수료 ¥110~220. 가장 저렴한 현금 인출 옵션.' },
        { type: 'tip', text: '💳 현금 문화 강함. 소규모 식당·신사 등은 현금만 가능 — 최소 ¥10,000 지참 권장.' },
        { type: 'tip', text: '📊 환율: 2025년 기준 ¥100 ≈ ₩920 (변동 있음 — 출발 전 재확인).' },
      ],
    },
  },
};

// 기본 팁 (여행지별 데이터 없을 때)
export const defaultTips = {
  transport: {
    icon: '🚇',
    title: '대중교통 & 카드 호환 가이드',
    content: [
      { type: 'tip', text: '💳 무신사 현대카드, 신한 트래블리 플래티넘 — 대부분 국가 EMV 컨택트리스 결제 지원.' },
      { type: 'tip', text: '📱 구글맵으로 현지 대중교통 경로 검색 시 "대중교통" 탭 활용.' },
      { type: 'tip', text: '🎫 도착 후 공항에서 교통카드 구매 or 앱으로 사전 구매 권장.' },
    ],
  },
  voltage: {
    icon: '🔌',
    title: '전압 & 플러그 정보',
    content: [
      { type: 'tip', text: '🌍 유럽 대부분: 220V C/E 타입 (한국과 전압 동일, 핀 모양 다름 → 어댑터 필요).' },
      { type: 'tip', text: '🇺🇸 미국/캐나다/일본: 110-120V A 타입 → 고전력 기기 변압기 지참.' },
      { type: 'tip', text: '✅ 노트북·스마트폰 충전기는 보통 100~240V 지원 — 충전기 뒷면 확인!' },
    ],
  },
  etiquette: {
    icon: '🌐',
    title: '현지 에티켓 & 문화 주의사항',
    content: [
      { type: 'tip', text: '💵 팁 문화 국가(미국 등): 식당 15~20%, 택시 10~15% 기본.' },
      { type: 'tip', text: '📸 종교 시설(모스크·사원·성당): 복장 규정 및 사진 촬영 제한 확인 필수.' },
      { type: 'tip', text: '🤫 공공장소 큰 소리 대화 자제 — 유럽·일본·싱가포르 등 특히 중요.' },
    ],
  },
  communication: {
    icon: '📱',
    title: '통신 & SIM 정보',
    content: [
      { type: 'tip', text: '📶 eSIM 추천: Airalo, Roamless — 출발 전 앱에서 구매, 도착 즉시 활성화.' },
      { type: 'tip', text: '🔁 통신 3사 로밍 (SKT/KT/LGU+): 하루 ₩9,900~12,000, 편하지만 비쌈.' },
      { type: 'tip', text: '☁ 구글 포토 자동 백업 설정 — Wi-Fi 연결 시 여행 사진 실시간 백업.' },
    ],
  },
  emergency: {
    icon: '🆘',
    title: '비상 연락처 & 안전 정보',
    content: [
      { type: 'info', label: '한국 외교부 영사콜센터', value: '+82-2-3210-0404 (24시간)' },
      { type: 'info', label: '해외 긴급전화', value: '112 (EU 공통) / 911 (미국·캐나다)' },
      { type: 'tip', text: '🛡️ 여행자 보험 필수 가입 — 질병·사고·도난 모두 커버되는 상품 선택.' },
      { type: 'tip', text: '📋 여권 사진 페이지, 보험 증서 — 구글 드라이브에 사전 업로드.' },
    ],
  },
  finance: {
    icon: '💰',
    title: '환전 & 금융 팁',
    content: [
      { type: 'tip', text: '✅ 명동 환전소 or 하나은행 "환전 지갑" 앱 — 공항 대비 최대 4% 우대.' },
      { type: 'tip', text: '🏧 현지 ATM 수수료: 거래당 ₩2,000~5,000. 대량 1회 인출 추천.' },
      { type: 'tip', text: '💳 해외 결제 수수료 0% 카드: 토스뱅크, 신한 트래블리, 하나 트래블로그.' },
    ],
  },
};

export const getTipsForDestination = (slug) =>
  tipsByDestination[slug] || defaultTips;
