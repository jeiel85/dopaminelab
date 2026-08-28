// 2026 SNS 도파민 뇌 상태 진단 테스트 데이터

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "유튜브 / 릴스 / 쇼츠를 시청할 때 당신의 평소 배속은?",
    options: [
      { text: "1.0배속 (제작자의 호흡과 배경음악까지 온전히 음미한다)", dopamine: 10, lucky: 25, t: 15, brainrot: 5 },
      { text: "1.25배속 ~ 1.5배속 (살짝 답답해서 중요한 내용 위주로 본다)", dopamine: 20, lucky: 15, t: 25, brainrot: 15 },
      { text: "1.75배속 ~ 2.0배속 (결론만 빠르게 팍팍 나와야 직성이 풀림)", dopamine: 30, lucky: 10, t: 20, brainrot: 30 },
      { text: "배속도 느림. 10초씩 연타로 넘기면서 3초 만에 다음 영상으로 스크롤", dopamine: 40, lucky: 5, t: 5, brainrot: 45 }
    ]
  },
  {
    id: 2,
    question: "밤 11시 침대에 누워 '딱 10분만 폰 보고 자야지' 결심했을 때 실제로는?",
    options: [
      { text: "정확히 10분 뒤 알람 맞추고 단호하게 취침 모드 진입", dopamine: 5, lucky: 20, t: 35, brainrot: 5 },
      { text: "정신 차려보니 새벽 1시... '이 영상까지만 보고 잔다' 무한 루프", dopamine: 25, lucky: 15, t: 15, brainrot: 25 },
      { text: "새벽 3시 40분. 뜬금없이 '고대 로마 하수도 공법' 다큐 보면서 눈 충혈됨", dopamine: 40, lucky: 25, t: 10, brainrot: 40 },
      { text: "얼굴 위로 폰 떨어뜨려서 인중 맞고 나서야 겨우 잠듦", dopamine: 35, lucky: 10, t: 5, brainrot: 35 }
    ]
  },
  {
    id: 3,
    question: "친구가 10분 동안 일상 썰을 풀기 시작할 때 내 뇌의 상태는?",
    options: [
      { text: "눈을 반짝이며 리액션과 맞장구를 폭풍처럼 쏟아낸다", dopamine: 15, lucky: 35, t: 10, brainrot: 10 },
      { text: "속으로 '그래서 결론과 핵심이 뭐지?' 3줄 요약 각 재고 있음", dopamine: 10, lucky: 10, t: 40, brainrot: 15 },
      { text: "겉으론 '아 진짜?' 하면서 속으론 방금 본 릴스 챌린지 춤추고 있음", dopamine: 35, lucky: 20, t: 10, brainrot: 35 },
      { text: "친구 말 5초 듣고 나도 모르게 주머니 속 폰 만지작거림", dopamine: 40, lucky: 5, t: 5, brainrot: 45 }
    ]
  },
  {
    id: 4,
    question: "혼자 밥 먹을 때 볼 영상(유튜브/OTT)이 아직 로딩 중이라면?",
    options: [
      { text: "음식 식기 전에 그냥 밥부터 맛있게 먹는다", dopamine: 5, lucky: 30, t: 25, brainrot: 5 },
      { text: "밥 냄새 맡으면서 3분 동안 필사적으로 볼 영상을 고른다", dopamine: 25, lucky: 15, t: 20, brainrot: 20 },
      { text: "볼 영상 안 정해지면 숟가락 절대 안 듦. 밥이 식어도 영상이 먼저임", dopamine: 40, lucky: 10, t: 10, brainrot: 40 },
      { text: "결국 영상 15분 동안 고르다가 정작 영상 틀고 3분 만에 다 먹음", dopamine: 45, lucky: 20, t: 5, brainrot: 45 }
    ]
  },
  {
    id: 5,
    question: "주머니 속 폰 진동이 느껴져서 꺼냈는데 아무 알림도 없을 때 (팬텀 바이브레이션)?",
    options: [
      { text: "그런 적 거의 없음. 무음으로 해놔도 평온함", dopamine: 5, lucky: 25, t: 30, brainrot: 5 },
      { text: "가끔 흠칫하지만 '착각했네' 하고 다시 집어넣음", dopamine: 15, lucky: 20, t: 25, brainrot: 15 },
      { text: "알림 없어도 기왕 켠 김에 인스타, 카톡, 스레드, 유튜브 순회공연 돎", dopamine: 35, lucky: 15, t: 10, brainrot: 35 },
      { text: "하루에 20번 이상 겪음. 폰이 내 신체 장기 일부처럼 느껴짐", dopamine: 45, lucky: 5, t: 5, brainrot: 50 }
    ]
  },
  {
    id: 6,
    question: "새로운 초유행 밈이나 신조어(예: 럭키비키, 삐끼삐끼, 두바이 초콜릿 등)를 봤을 때 나는?",
    options: [
      { text: "'요즘은 이런 게 유행이구나' 하고 신기해하며 바로 유행어 씀", dopamine: 30, lucky: 35, t: 10, brainrot: 25 },
      { text: "유행의 기원과 바이럴 원리를 논리적으로 분석해 봄", dopamine: 15, lucky: 15, t: 40, brainrot: 15 },
      { text: "이미 3주 전에 유행 시작할 때부터 알고 즐기고 있었음 (트렌드 세터)", dopamine: 35, lucky: 25, t: 15, brainrot: 35 },
      { text: "내 대화의 80%가 밈과 유행어로만 구성되어 있음", dopamine: 45, lucky: 20, t: 5, brainrot: 45 }
    ]
  },
  {
    id: 7,
    question: "화장실 갈 때 스마트폰을 방에 깜빡 두고 들어갔다면?",
    options: [
      { text: "명상의 시간이라 생각하고 평온하게 볼일 보고 나옴", dopamine: 5, lucky: 35, t: 25, brainrot: 5 },
      { text: "샴푸통, 바디워시 뒷면의 전성분표(소듐라우레스설페이트 등)를 정독함", dopamine: 25, lucky: 25, t: 25, brainrot: 25 },
      { text: "너무 허전하고 불안해서 초스피드로 1분 만에 뛰쳐나옴", dopamine: 35, lucky: 10, t: 15, brainrot: 35 },
      { text: "문 살짝 열고 손 뻗어서 폰 가져오려고 서커스 곡예 시도함", dopamine: 45, lucky: 15, t: 5, brainrot: 45 }
    ]
  },
  {
    id: 8,
    question: "오늘 하루 나의 도파민 충전 목표는?",
    options: [
      { text: "산책, 독서, 운동으로 자연스러운 세로토닌 채우기", dopamine: 5, lucky: 35, t: 30, brainrot: 5 },
      { text: "할 일 빡세게 끝내고 밤에 꿀맛 같은 숏폼 30분 보상", dopamine: 25, lucky: 25, t: 30, brainrot: 20 },
      { text: "원영적 사고로 오늘 만난 억까들을 전부 럭키로 승화시키기", dopamine: 20, lucky: 50, t: 10, brainrot: 20 },
      { text: "알고리즘이 이끄는 대로 도파민 바다에 다이빙하기 🌊⚡", dopamine: 50, lucky: 20, t: 5, brainrot: 50 }
    ]
  }
];

// 결과 아키타입 유형
export const QUIZ_RESULTS = [
  {
    type: "dopamine_overlord",
    title: "👑 도파민 슬라임 3세 (뇌 2배속 사이보그)",
    subtitle: "순도 99.8% 숏폼 중독자 & 알고리즘의 총애를 받는 자",
    badge: "도파민 지수 95%",
    color: "#FF5E97",
    bgGradient: "from-pink-500/20 via-purple-500/20 to-cyan-500/20",
    description: "당신의 뇌는 0.1초 만에 재미 여부를 판단하는 초고속 AI 엔진입니다. 1배속 영상은 슬로우 모션처럼 느껴지며, 침대에 누우면 알고리즘의 따뜻한 품에서 새벽 4시까지 헤엄칩니다.",
    prescription: "💊 [처방전] 하루 1시간 폰을 서랍에 넣고 멍때리기 or 럭키비키 긍정 마인드로 현실 세상 탐험하기!",
    stats: { dopamine: 95, focus: 25, lucky: 70, meme: 98, algo: 96 }
  },
  {
    type: "lucky_fairy",
    title: "🍀 원영적 사고 만렙 럭키 요정",
    subtitle: "어떤 억까도 황금빛 행운으로 바꾸는 기적의 멘탈술사",
    badge: "럭키 지수 99%",
    color: "#CCFF00",
    bgGradient: "from-lime-500/20 via-yellow-500/20 to-pink-500/20",
    description: "지하철을 놓치면 '사람 적은 다음 차 탈 찬스!', 커피를 쏟으면 '옷 쇼핑할 명분!'을 외치는 초긍정의 화신입니다. 세상 모든 고난이 당신을 빛나게 해주는 빌드업입니다.",
    prescription: "💊 [처방전] 완벽한 마인드셋! 당신의 긍정 바이러스를 주변 사람들에게 무한 복사-붙여넣기 하세요.",
    stats: { dopamine: 65, focus: 75, lucky: 99, meme: 88, algo: 60 }
  },
  {
    type: "fact_cyborg",
    title: "🤖 극T 팩폭 냉혈 사이보그",
    subtitle: "감정보다 효율! 도파민보다 손익 계산이 먼저인 이성 종결자",
    badge: "이성/효율 97%",
    color: "#00F0FF",
    bgGradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
    description: "쇼츠를 볼 때도 '이 크리에이터의 CPM 수익은 얼마일까?', '이 영상의 정보 밀도는 30% 미만이군' 분석하는 뇌 구조를 지녔습니다. 낭비되는 시간과 감정 소모를 극도로 혐오합니다.",
    prescription: "💊 [처방전] 가끔은 뇌 빼고 아무 생각 없이 웃긴 밈이나 고양이 릴스를 보며 감성 수치를 +10% 충전하세요.",
    stats: { dopamine: 40, focus: 92, lucky: 45, meme: 65, algo: 40 }
  },
  {
    type: "zen_monk",
    title: "🧘 디지털 자연인 해탈 수도승",
    subtitle: "도파민의 유혹을 초월하여 마음의 평정을 얻은 은둔 고수",
    badge: "평정심 99%",
    color: "#FFDF00",
    bgGradient: "from-yellow-500/20 via-emerald-500/20 to-teal-500/20",
    description: "폰 알림이 100개 쌓여 있어도 평온하며, 화장실에 폰 없이 들어가 샴푸통 전성분을 읽으며 삼라만상의 이치를 깨닫습니다. 스마트폰의 노예가 아닌 주인이 된 진정한 현자입니다.",
    prescription: "💊 [처방전] 훌륭한 디지털 디톡스 상태! 가끔 친구들과 유행어 퀴즈를 풀며 현세와의 소통 끈을 유지하세요.",
    stats: { dopamine: 25, focus: 90, lucky: 80, meme: 40, algo: 20 }
  },
  {
    type: "meme_creator",
    title: "⚡ 트렌드 도파민 롤러코스터 광인",
    subtitle: "세상의 모든 유행과 밈을 씹어 삼키는 핵인싸 크리에이터",
    badge: "밈력 100%",
    color: "#A855F7",
    bgGradient: "from-purple-500/20 via-pink-500/20 to-yellow-500/20",
    description: "유행하는 챌린지와 밈이 나오면 온몸으로 흡수하고 친구들에게 전파해야 직성이 풀립니다. 일상의 모든 순간이 릴스 썸네일이자 쇼츠 각으로 보입니다.",
    prescription: "💊 [처방전] 당신의 미친 센스로 직접 짤을 생성해 SNS 스토리에 박제하고 도파민을 수확하세요!",
    stats: { dopamine: 90, focus: 55, lucky: 85, meme: 100, algo: 92 }
  }
];

export function calculateQuizResult(answers) {
  let totalDopamine = 0;
  let totalLucky = 0;
  let totalT = 0;
  let totalBrainrot = 0;

  answers.forEach((ans) => {
    totalDopamine += ans.dopamine;
    totalLucky += ans.lucky;
    totalT += ans.t;
    totalBrainrot += ans.brainrot;
  });

  if (totalLucky >= 230) return QUIZ_RESULTS[1]; // lucky fairy
  if (totalT >= 200) return QUIZ_RESULTS[2]; // fact cyborg
  if (totalDopamine <= 120) return QUIZ_RESULTS[3]; // zen monk
  if (totalBrainrot >= 250) return QUIZ_RESULTS[0]; // dopamine overlord
  return QUIZ_RESULTS[4]; // meme creator
}
