export const quizPool = [
  {
    id: 'quiz-001',
    question: '대만 지우펀은 어떤 애니메이션의 배경지로 알려져 있을까요?',
    options: ['하울의 움직이는 성', '센과 치히로의 행방불명', '이웃집 토토로', '천공의 성 라퓨타'],
    answer: 1,
    hint: '산비탈 골목에 홍등이 늘어선 마을입니다',
    reward: { correct: 2000, wrong: 500 },
  },
  {
    id: 'quiz-002',
    question: '영국 해리포터 스튜디오에서 9¾ 플랫폼이 있는 역은?',
    options: ['패딩턴역', '빅토리아역', '킹스크로스역', '워털루역'],
    answer: 2,
    hint: '런던 북부에 위치한 기차역입니다',
    reward: { correct: 2000, wrong: 500 },
  },
  {
    id: 'quiz-003',
    question: '스페인 바르셀로나의 사그라다 파밀리아를 설계한 건축가는?',
    options: ['르 코르뷔지에', '안토니 가우디', '프랭크 게리', '자하 하디드'],
    answer: 1,
    hint: '구엘공원도 그의 작품입니다',
    reward: { correct: 2000, wrong: 500 },
  },
  {
    id: 'quiz-004',
    question: '묵호는 일본의 어떤 도시에 비유되어 "한국의 ○○○"라 불릴까요?',
    options: ['산토리니', '나폴리', '가마쿠라', '포르토'],
    answer: 2,
    hint: '일본의 해안 도시입니다',
    reward: { correct: 2000, wrong: 500 },
  },
  {
    id: 'quiz-005',
    question: '대만 타이베이 101의 높이는 약 몇 미터일까요?',
    options: ['408m', '458m', '508m', '558m'],
    answer: 2,
    hint: '한때 세계에서 가장 높은 빌딩이었습니다',
    reward: { correct: 2000, wrong: 500 },
  },
  {
    id: 'quiz-006',
    question: '강릉 안목해변은 어떤 음료로 유명한 거리가 있을까요?',
    options: ['맥주', '와인', '커피', '전통차'],
    answer: 2,
    hint: '바다를 보며 즐기는 이 음료의 거리입니다',
    reward: { correct: 2000, wrong: 500 },
  },
  {
    id: 'quiz-007',
    question: '대만에서 천등(스카이랜턴)을 날릴 수 있는 대표 명소는?',
    options: ['지우펀', '단수이', '스펀', '베이터우'],
    answer: 2,
    hint: '기찻길 위에서 천등을 날리는 이색 체험으로 유명합니다',
    reward: { correct: 2000, wrong: 500 },
  },
];

export function getTodayQuiz() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000
  );
  return quizPool[dayOfYear % quizPool.length];
}
