// 시안 공용 더미 데이터 (실제 구현 시 src/types + API 응답으로 대체)
window.BOARD = {
  categories: [
    { id: "all", name: "전체", count: 1284 },
    { id: "free", name: "자유게시판", count: 642 },
    { id: "qna", name: "질문답변", count: 318 },
    { id: "info", name: "정보공유", count: 201 },
    { id: "review", name: "후기", count: 123 },
  ],
  notices: [
    { id: 1, title: "[필독] 그린 커뮤니티 이용 규칙 안내 (2026.09 개정)", author: "운영팀", date: "2026.09.01", views: 12840 },
    { id: 2, title: "추석 연휴 고객센터 운영 시간 안내", author: "운영팀", date: "2026.09.24", views: 3120 },
  ],
  posts: [
    { id: 1287, cat: "info", title: "베란다 텃밭 6개월 차, 방울토마토 수확량 정리해봤어요", excerpt: "처음엔 화분 두 개로 시작했는데 지금은 선반 3단까지 늘었습니다. 월별 수확량과 비료 주기를 표로 정리했어요.", author: "초록손", avatar: "초", date: "10분 전", views: 214, comments: 18, likes: 42, img: true, hot: true, isNew: true },
    { id: 1286, cat: "qna", title: "몬스테라 잎 끝이 갈색으로 변하는데 과습일까요?", excerpt: "물은 일주일에 한 번 주고 있고 창가에서 두 칸 떨어진 곳에 둡니다. 사진 첨부해요.", author: "식집사3년", avatar: "식", date: "32분 전", views: 98, comments: 7, likes: 3, img: true, isNew: true },
    { id: 1285, cat: "free", title: "오늘 출근길에 본 가로수 단풍이 벌써 들기 시작했네요", excerpt: "가을이 확실히 왔나 봐요. 다들 주말 계획 있으신가요?", author: "산책러", avatar: "산", date: "1시간 전", views: 156, comments: 24, likes: 31, isNew: true },
    { id: 1284, cat: "review", title: "제로웨이스트 샵 3곳 다녀온 솔직 후기 (가격/품목 비교)", excerpt: "리필 스테이션 위주로 비교했습니다. 세제류는 두 번째 가게가 제일 저렴했어요.", author: "리필러", avatar: "리", date: "3시간 전", views: 842, comments: 41, likes: 127, img: true, hot: true },
    { id: 1283, cat: "info", title: "10월 지역별 플리마켓·나눔장터 일정 모음", excerpt: "서울/경기/부산 일정 정리했습니다. 추가 제보는 댓글로 부탁드려요.", author: "모아모아", avatar: "모", date: "5시간 전", views: 1203, comments: 36, likes: 88, hot: true },
    { id: 1282, cat: "free", title: "분리수거 헷갈리는 품목 정리 짤 공유합니다", excerpt: "영수증, 컵라면 용기, 아이스팩 등 자주 묻는 것들만 모았어요.", author: "분리왕", avatar: "분", date: "어제", views: 2310, comments: 52, likes: 204, img: true, hot: true },
    { id: 1281, cat: "qna", title: "음식물 처리기 쓰시는 분들 전기요금 얼마나 나오나요?", excerpt: "건조식이랑 미생물식 고민 중입니다.", author: "고민중", avatar: "고", date: "어제", views: 477, comments: 19, likes: 6 },
    { id: 1280, cat: "review", title: "자전거 출퇴근 한 달 해본 결과 (체력, 비용, 현실)", excerpt: "편도 9km, 한 달 동안 비 오는 날 빼고 매일 탔습니다.", author: "두바퀴", avatar: "두", date: "2026.09.28", views: 1580, comments: 29, likes: 96, img: true },
    { id: 1279, cat: "free", title: "동네 공원 줍깅 모임 같이 하실 분 계신가요?", excerpt: "매주 토요일 오전 8시, 한 시간 정도 생각하고 있어요.", author: "줍깅러", avatar: "줍", date: "2026.09.28", views: 365, comments: 14, likes: 22 },
    { id: 1278, cat: "info", title: "다회용 컵 보증금 제도 적용 매장 찾는 법", excerpt: "앱에서 바로 확인 가능한 방법 공유드립니다.", author: "초록손", avatar: "초", date: "2026.09.27", views: 690, comments: 8, likes: 34 },
  ],
  popular: [
    "분리수거 헷갈리는 품목 정리 짤 공유합니다",
    "10월 지역별 플리마켓·나눔장터 일정 모음",
    "자전거 출퇴근 한 달 해본 결과",
    "제로웨이스트 샵 3곳 다녀온 솔직 후기",
    "베란다 텃밭 6개월 차 수확량 정리",
  ],
  comments: [
    { author: "식집사3년", avatar: "식", date: "5분 전", body: "정리 너무 잘하셨네요! 비료는 어떤 제품 쓰셨는지 궁금해요.", likes: 4,
      replies: [{ author: "초록손", avatar: "초", date: "2분 전", body: "액비는 희석해서 2주에 한 번 줬어요. 제품명은 쪽지로 드릴게요!", likes: 1 }] },
    { author: "산책러", avatar: "산", date: "8분 전", body: "선반 3단 사진도 보고 싶어요 ㅎㅎ", likes: 2, replies: [] },
  ],
};
window.catName = (id) => (window.BOARD.categories.find((c) => c.id === id) || {}).name;
