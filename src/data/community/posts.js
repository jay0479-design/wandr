// 커뮤니티 게시글 Mock 데이터
const mockPosts = {
  japan: [
    {
      id: 'jp-001',
      roomId: 'japan',
      author: { name: '도쿄러버', avatar: 'https://i.pravatar.cc/40?img=1' },
      title: '도쿄 3박 4일 완벽 루트 공유합니다 (2026년 최신)',
      content: `작년 3월에 다녀온 도쿄 여행 루트 공유합니다!\n\n**1일차**: 나리타 → 신주쿠 호텔 체크인 → 골든가이 & 오모이데요코초 야경\n**2일차**: 아사쿠사 센소지 → 스카이트리 → 아키하바라 → 시부야 스크램블\n**3일차**: 하라주쿠 다케시타거리 → 메이지신궁 → 오다이바 → 신주쿠 이세탄 쇼핑\n**4일차**: 짐 픽업 → 나리타 공항\n\n항공권은 제주항공 직항으로 왕복 32만원에 잡았어요. 숙소는 신주쿠역 도보 5분 거리 비즈니스호텔 1박 9만원.\n\n환율 팁: 하나은행 앱에서 환전 예약하면 90% 우대 받을 수 있어요!`,
      thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format&fit=crop',
      tags: ['도쿄', '루트', '3박4일'],
      likeCount: 428,
      commentCount: 67,
      viewCount: '12.4만',
      publishedAt: '2026-03-10T10:30:00Z',
      comments: [
        { id: 'c1', author: { name: '여행고수', avatar: 'https://i.pravatar.cc/40?img=5' }, content: '루트 너무 알차네요! 골든가이 가격대도 알려주실 수 있나요?', likeCount: 23, publishedAt: '2026-03-10T12:00:00Z' },
        { id: 'c2', author: { name: '주니어여행러', avatar: 'https://i.pravatar.cc/40?img=9' }, content: '환전 팁 감사합니다! 저도 다음 달 갈 예정이라 참고할게요 🙏', likeCount: 15, publishedAt: '2026-03-10T14:30:00Z' },
        { id: 'c3', author: { name: '도쿄러버', avatar: 'https://i.pravatar.cc/40?img=1' }, content: '골든가이는 1잔에 500~800엔 정도 해요. 분위기 좋은 작은 바들이 밀집해 있어요!', likeCount: 19, publishedAt: '2026-03-10T15:45:00Z' },
      ],
    },
    {
      id: 'jp-002',
      roomId: 'japan',
      author: { name: '오사카미식', avatar: 'https://i.pravatar.cc/40?img=2' },
      title: '오사카 도톤보리 먹방 투어 완전 정복',
      content: `오사카 도톤보리에서 꼭 먹어야 할 것들 정리했어요!\n\n1. 이치란 라멘 - 1인 부스 독특한 경험\n2. 쿠레타케소 타코야키 - 줄서도 먹을 가치 있음\n3. 긴류 라멘 - 24시간 운영, 새벽에도 OK\n4. 몬자야키 - 오코노미야키와 달리 묽게 구워 먹는 것\n\n도톤보리 글리코 달리는 아저씨 앞은 항상 인산인해라 새벽이나 이른 아침에 사진 찍는 걸 추천!`,
      thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&auto=format&fit=crop',
      tags: ['오사카', '맛집', '도톤보리'],
      likeCount: 312,
      commentCount: 44,
      viewCount: '8.7만',
      publishedAt: '2026-03-08T09:00:00Z',
      comments: [
        { id: 'c4', author: { name: '맛있어', avatar: 'https://i.pravatar.cc/40?img=6' }, content: '이치란 라멘 정말 맛있죠! 저는 면 곱배기로 주문했어요 ㅎㅎ', likeCount: 12, publishedAt: '2026-03-08T11:00:00Z' },
        { id: 'c5', author: { name: '낭만여행자', avatar: 'https://i.pravatar.cc/40?img=10' }, content: '글리코 간판 새벽에 찍으러 가면 진짜 조용하더라고요. 좋은 팁이에요!', likeCount: 28, publishedAt: '2026-03-09T08:00:00Z' },
      ],
    },
    {
      id: 'jp-003',
      roomId: 'japan',
      author: { name: '교토힐링', avatar: 'https://i.pravatar.cc/40?img=3' },
      title: '교토 게이샤 지구 기온 산책 — 인파 피하는 시간대 공유',
      content: `교토 기온 거리, 사람 없을 때 가는 법!\n\n- 새벽 6~8시: 청소부 아저씨들만 있어요. 기온 골목이 내 것\n- 평일 이른 아침: 주말 대비 인파 50% 이하\n- 후시미이나리 새벽 등산: 해뜨기 전 출발하면 도리이 독점 가능\n\n미나미자 앞 가부키 공연은 12월이 제철이에요. 3~5월 벚꽃 시즌엔 예약 필수입니다.`,
      thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&auto=format&fit=crop',
      tags: ['교토', '기온', '사진명소'],
      likeCount: 256,
      commentCount: 31,
      viewCount: '6.2만',
      publishedAt: '2026-03-05T07:00:00Z',
      comments: [
        { id: 'c6', author: { name: '사진작가', avatar: 'https://i.pravatar.cc/40?img=7' }, content: '후시미이나리 새벽 등산 진짜 좋았어요. 빛도 예쁘고 사람도 없고!', likeCount: 34, publishedAt: '2026-03-05T10:00:00Z' },
      ],
    },
  ],
  domestic: [
    {
      id: 'dom-001',
      roomId: 'domestic',
      author: { name: '강릉커피', avatar: 'https://i.pravatar.cc/40?img=11' },
      title: '강릉 안목해변 카페거리 총정리 (2026 최신)',
      content: `강릉 안목해변 카페거리 최신 정보 업데이트!\n\n**놓치면 안 되는 TOP 3**\n1. 보헤미안 박이추 커피 — 한국 스페셜티 커피의 전설. 아메리카노 5,500원\n2. 테라로사 — 규모 있는 스페셜티 카페. 원두 쇼핑도 가능\n3. 강릉커피 — 로컬 분위기 살아있는 아담한 카페\n\n경포대까지 차로 10분, 정동진 일출은 새벽 5시 출발 추천. KTX 강릉역에서 택시로 15분 거리예요.`,
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
      tags: ['강릉', '카페', '커피여행'],
      likeCount: 534,
      commentCount: 89,
      viewCount: '18.3만',
      publishedAt: '2026-03-12T08:00:00Z',
      comments: [
        { id: 'c7', author: { name: '커피덕후', avatar: 'https://i.pravatar.cc/40?img=14' }, content: '보헤미안 박이추 원두 집에서도 내려 마시는데 진짜 최고예요!', likeCount: 41, publishedAt: '2026-03-12T10:00:00Z' },
        { id: 'c8', author: { name: '소도시탐험', avatar: 'https://i.pravatar.cc/40?img=15' }, content: '정동진 일출 보고 안목에서 커피 한 잔이 강릉 여행의 정석이죠 ☀️', likeCount: 67, publishedAt: '2026-03-12T14:00:00Z' },
      ],
    },
    {
      id: 'dom-002',
      roomId: 'domestic',
      author: { name: '통영탐험가', avatar: 'https://i.pravatar.cc/40?img=12' },
      title: '통영 동피랑 + 케이블카 + 충무김밥 당일치기 완벽 플랜',
      content: `서울에서 통영 당일치기 가능해요!\n\n**교통**: KTX 마산역 → 버스 1시간 (or 고속버스 통영터미널)\n\n**루트**\n09:00 통영터미널 도착 → 동피랑 벽화마을 (도보 15분)\n11:00 통영케이블카 미륵산 정상 → 한려수도 파노라마\n13:00 중앙시장 충무김밥 + 해산물\n15:00 통영항 유람선 (선택)\n17:00 귀경\n\n충무김밥은 꽤 작고 깍두기·꼴뚜기무침이 곁들여지는 형식이에요. 1인분에 5,000~7,000원!`,
      thumbnail: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80&auto=format&fit=crop',
      tags: ['통영', '당일치기', '동피랑'],
      likeCount: 389,
      commentCount: 52,
      viewCount: '11.4만',
      publishedAt: '2026-03-07T09:30:00Z',
      comments: [
        { id: 'c9', author: { name: '남해러버', avatar: 'https://i.pravatar.cc/40?img=16' }, content: '통영케이블카 날씨 좋을 때 가면 진짜 장관이에요! 바람은 쌀쌀하니 겉옷 챙기세요~', likeCount: 28, publishedAt: '2026-03-07T12:00:00Z' },
      ],
    },
    {
      id: 'dom-003',
      roomId: 'domestic',
      author: { name: '군산감성', avatar: 'https://i.pravatar.cc/40?img=13' },
      title: '군산 근대문화유산 투어 + 이성당 빵 구입 꿀팁',
      content: `군산은 일제강점기 근대 건축물이 잘 보존된 독특한 여행지예요.\n\n**근대문화유산 코스**\n1. 군산 근대역사박물관 (입장료 2,000원)\n2. 신흥동 일본식 가옥 히로쓰가옥 (무료)\n3. 경암동 철길마을 (무료)\n4. 이성당 빵집 (웨이팅 필수)\n\n**이성당 팁**\n- 오픈 30분 전 줄 서면 웨이팅 없이 입장 가능\n- 단팥빵과 야채빵이 대표 메뉴\n- 주말엔 빵이 일찍 매진되니 오전 방문 추천!`,
      thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&auto=format&fit=crop',
      tags: ['군산', '근대건축', '빵집'],
      likeCount: 267,
      commentCount: 38,
      viewCount: '7.8만',
      publishedAt: '2026-03-03T10:00:00Z',
      comments: [
        { id: 'c10', author: { name: '복고감성', avatar: 'https://i.pravatar.cc/40?img=17' }, content: '군산 진짜 좋았어요. 시간 여행하는 느낌!', likeCount: 22, publishedAt: '2026-03-03T13:00:00Z' },
      ],
    },
  ],
  'travel-tips': [
    {
      id: 'tip-001',
      roomId: 'travel-tips',
      author: { name: '항공권전문가', avatar: 'https://i.pravatar.cc/40?img=20' },
      title: '2026년 항공권 최저가 잡는 법 총정리',
      content: `항공권 싸게 사는 법 정리했어요!\n\n**1. 타이밍**\n- 국내선: 출발 2~3주 전 화요일 오전\n- 국제선: 출발 6~8주 전\n- 얼리버드: 성수기 노선은 6개월 전도 괜찮음\n\n**2. 플랫폼 비교**\n- 네이버 항공권: 국내 LCC 비교\n- Skyscanner: 환승 포함 최저가\n- Google Flights: 가격 추이 그래프 확인\n\n**3. 꿀팁**\n- 시크릿 모드(InPrivate)로 검색\n- VPN으로 출발국 변경 후 비교\n- 알림 설정 후 가격 드랍 시 즉시 구매`,
      thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop',
      tags: ['항공권', '특가', '꿀팁'],
      likeCount: 1240,
      commentCount: 183,
      viewCount: '42.7만',
      publishedAt: '2026-03-01T08:00:00Z',
      comments: [
        { id: 'c11', author: { name: '절약여행', avatar: 'https://i.pravatar.cc/40?img=21' }, content: 'Google Flights 가격 달력 기능 진짜 유용하더라고요!', likeCount: 87, publishedAt: '2026-03-01T10:00:00Z' },
        { id: 'c12', author: { name: '백팩커', avatar: 'https://i.pravatar.cc/40?img=22' }, content: 'VPN 팁은 실제로 도움 됐어요. 태국 발권으로 3만원 아꼈습니다 ㅎㅎ', likeCount: 54, publishedAt: '2026-03-01T15:00:00Z' },
      ],
    },
  ],
  europe: [
    {
      id: 'eu-001',
      roomId: 'europe',
      author: { name: '파리지앵꿈나무', avatar: 'https://i.pravatar.cc/40?img=30' },
      title: '파리 5박 6일 자유여행 — 소매치기 예방부터 맛집까지',
      content: `파리 자유여행 완전 가이드!\n\n**소매치기 예방**\n- 에펠탑·루브르 주변 항상 주의\n- 가방은 앞으로, 지갑은 앞주머니\n- 뮤지엄패스 사전 구매로 줄서기 최소화\n\n**꼭 가야 할 곳**\n1. 루브르 박물관 (수요일 야간 무료)\n2. 오르세 미술관\n3. 마레 지구 골목 카페\n4. 몽마르트르 언덕 일몰\n\n**현지 맛집**\n- 크레페: 몽파르나스 크레페 거리\n- 바게트: 동네 작은 불랑제리\n- 점심: 카페에서 플라 뒤 주르 (오늘의 메뉴) 12~15유로`,
      thumbnail: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=800&q=80&auto=format&fit=crop',
      tags: ['파리', '자유여행', '유럽'],
      likeCount: 678,
      commentCount: 94,
      viewCount: '22.1만',
      publishedAt: '2026-03-11T09:00:00Z',
      comments: [
        { id: 'c13', author: { name: '유럽덕후', avatar: 'https://i.pravatar.cc/40?img=31' }, content: '뮤지엄패스 사전 구매 진짜 필수예요. 루브르 대기줄이 장난 아니거든요!', likeCount: 45, publishedAt: '2026-03-11T11:30:00Z' },
      ],
    },
  ],
  'southeast-asia': [
    {
      id: 'sea-001',
      roomId: 'southeast-asia',
      author: { name: '발리홀릭', avatar: 'https://i.pravatar.cc/40?img=40' },
      title: '발리 5박 7일 신혼여행 후기 — 우붓 vs 스미냑 비교',
      content: `발리 신혼여행 다녀왔어요! 지역 비교 정리합니다.\n\n**우붓**\n- 분위기: 자연·힐링·논밭·원숭이 숲\n- 추천: 커플 스파·요가·트레킹\n- 숙소: 빌라 1박 15~25만원대\n\n**스미냑/꾸따**\n- 분위기: 해변·클럽·쇼핑·나이트라이프\n- 추천: 선셋바·서핑·쇼핑몰\n- 숙소: 리조트 1박 20~40만원대\n\n**팁**: 우붓 3일 + 스미냑 2일 조합 추천! 트랜스포트는 그랩 앱 사용하면 저렴해요.`,
      thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop',
      tags: ['발리', '신혼여행', '우붓'],
      likeCount: 892,
      commentCount: 124,
      viewCount: '31.5만',
      publishedAt: '2026-03-09T10:00:00Z',
      comments: [
        { id: 'c14', author: { name: '허니문계획', avatar: 'https://i.pravatar.cc/40?img=41' }, content: '저도 다음 달 발리 신혼여행 가는데 우붓+스미냑 조합으로 잡았어요! 도움 많이 됐습니다 💕', likeCount: 76, publishedAt: '2026-03-09T14:00:00Z' },
      ],
    },
  ],
  usa: [
    {
      id: 'usa-001',
      roomId: 'usa',
      author: { name: '뉴욕드림', avatar: 'https://i.pravatar.cc/40?img=50' },
      title: '뉴욕 7박 8일 자유여행 완벽 가이드 (2026년 최신)',
      content: `뉴욕 일주일 여행 루트 공유!\n\n**필수 코스**\n1. 맨해튼 — 타임스퀘어·엠파이어스테이트·센트럴파크\n2. 브루클린 — 브루클린브리지·덤보·윌리엄스버그\n3. 자유의 여신상 — 배 예약은 최소 3개월 전\n4. 메트로폴리탄 미술관 — 하루 종일 봐도 부족\n\n**교통**\n- 지하철 OMNY 카드 (탭으로 결제)\n- 공항 JFK→맨해튼: AirTrain + LIRR 추천\n\n**팁**: 팁 문화 있어요. 레스토랑 15~20%, 호텔 청소 $2~3/일`,
      thumbnail: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&auto=format&fit=crop',
      tags: ['뉴욕', '자유여행', '미국'],
      likeCount: 567,
      commentCount: 78,
      viewCount: '19.8만',
      publishedAt: '2026-03-06T09:00:00Z',
      comments: [
        { id: 'c15', author: { name: '미국유학생', avatar: 'https://i.pravatar.cc/40?img=51' }, content: '자유의 여신상 배 예약 진짜 일찍 해야 해요. 성수기엔 2~3개월 전도 마감돼요!', likeCount: 39, publishedAt: '2026-03-06T12:00:00Z' },
      ],
    },
  ],
};

export function getPostsForRoom(roomId) {
  return mockPosts[roomId] || [];
}

export function getPostById(roomId, postId) {
  const posts = mockPosts[roomId] || [];
  return posts.find((p) => p.id === postId) || null;
}
