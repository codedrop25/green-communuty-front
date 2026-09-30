import type { Board, Comment, Notice, PostDetailData, PostSummary } from "@/types";

export const boards: Board[] = [
  { id: "all", name: "전체", description: "커뮤니티의 모든 이야기를 모아봐요.", count: 1284 },
  { id: "free", name: "자유게시판", description: "초록빛 일상을 자유롭게 나누는 공간입니다.", count: 642 },
  { id: "qna", name: "질문답변", description: "궁금한 점을 묻고 경험을 나눠요.", count: 318 },
  { id: "info", name: "정보공유", description: "유용한 생활 정보와 노하우를 나눠요.", count: 201 },
  { id: "review", name: "후기", description: "직접 경험한 솔직한 후기를 들려주세요.", count: 123 },
];

export const notices: Notice[] = [
  { id: 1, title: "[필독] 그린 커뮤니티 이용 규칙 안내 (2026.09 개정)" },
  { id: 2, title: "추석 연휴 고객센터 운영 시간 안내" },
];

export const posts: PostSummary[] = [
  { id: 1287, boardId: "info", title: "베란다 텃밭 6개월 차, 방울토마토 수확량 정리해봤어요", excerpt: "월별 수확량과 비료 주기를 정리했어요.", author: { id: "green-thumb", nickname: "초록손" }, createdAt: "2026-09-30T19:00:00+09:00", viewCount: 214, commentCount: 18, likeCount: 42, hasImage: true, isNew: true },
  { id: 1286, boardId: "qna", title: "몬스테라 잎 끝이 갈색으로 변하는데 과습일까요?", excerpt: "물은 일주일에 한 번 주고 있어요.", author: { id: "plant-3", nickname: "식집사3년" }, createdAt: "2026-09-30T18:38:00+09:00", viewCount: 98, commentCount: 7, likeCount: 3, hasImage: true, isNew: true },
  { id: 1285, boardId: "free", title: "오늘 출근길에 본 가로수 단풍이 벌써 들기 시작했네요", excerpt: "가을이 확실히 왔나 봐요.", author: { id: "walker", nickname: "산책러" }, createdAt: "2026-09-30T18:10:00+09:00", viewCount: 156, commentCount: 24, likeCount: 31, hasImage: false, isNew: true },
  { id: 1284, boardId: "review", title: "제로웨이스트 샵 3곳 다녀온 솔직 후기 (가격/품목 비교)", excerpt: "리필 스테이션 위주로 비교했습니다.", author: { id: "refiller", nickname: "리필러" }, createdAt: "2026-09-30T16:10:00+09:00", viewCount: 842, commentCount: 41, likeCount: 127, hasImage: true, isNew: false },
  { id: 1283, boardId: "info", title: "10월 지역별 플리마켓·나눔장터 일정 모음", excerpt: "서울, 경기, 부산 일정을 정리했습니다.", author: { id: "collector", nickname: "모아모아" }, createdAt: "2026-09-30T14:10:00+09:00", viewCount: 1203, commentCount: 36, likeCount: 88, hasImage: false, isNew: false },
  { id: 1282, boardId: "free", title: "분리수거 헷갈리는 품목 정리 짤 공유합니다", excerpt: "자주 묻는 품목만 모았어요.", author: { id: "recycle", nickname: "분리왕" }, createdAt: "2026-09-29T13:00:00+09:00", viewCount: 2310, commentCount: 52, likeCount: 204, hasImage: true, isNew: false },
  { id: 1281, boardId: "qna", title: "음식물 처리기 쓰시는 분들 전기요금 얼마나 나오나요?", excerpt: "건조식이랑 미생물식 고민 중입니다.", author: { id: "thinking", nickname: "고민중" }, createdAt: "2026-09-29T10:00:00+09:00", viewCount: 477, commentCount: 19, likeCount: 6, hasImage: false, isNew: false },
  { id: 1280, boardId: "review", title: "자전거 출퇴근 한 달 해본 결과 (체력, 비용, 현실)", excerpt: "편도 9km를 한 달 동안 달렸습니다.", author: { id: "bicycle", nickname: "두바퀴" }, createdAt: "2026-09-28T09:00:00+09:00", viewCount: 1580, commentCount: 29, likeCount: 96, hasImage: true, isNew: false },
  { id: 1279, boardId: "free", title: "동네 공원 줍깅 모임 같이 하실 분 계신가요?", excerpt: "매주 토요일 오전 8시에 만나요.", author: { id: "plogger", nickname: "줍깅러" }, createdAt: "2026-09-28T08:00:00+09:00", viewCount: 365, commentCount: 14, likeCount: 22, hasImage: false, isNew: false },
  { id: 1278, boardId: "info", title: "다회용 컵 보증금 제도 적용 매장 찾는 법", excerpt: "앱에서 바로 확인할 수 있어요.", author: { id: "green-thumb", nickname: "초록손" }, createdAt: "2026-09-27T08:00:00+09:00", viewCount: 690, commentCount: 8, likeCount: 34, hasImage: false, isNew: false },
];

export const featuredPost: PostDetailData = {
  ...posts[0],
  content: [
    "처음엔 화분 두 개로 시작했는데 지금은 선반 3단까지 늘었습니다. 월별 수확량과 비료 주기를 정리해봤어요.",
    "가장 효과가 컸던 건 순 따기와 지지대 보강이었고, 8월 폭염 때는 차광막이 필수였습니다.",
  ],
  tags: ["텃밭", "베란다", "방울토마토"],
};

export const comments: Comment[] = [
  { id: 1, author: { id: "plant-3", nickname: "식집사3년" }, createdAt: "2026-09-30T19:05:00+09:00", body: "정리 너무 잘하셨네요! 비료는 어떤 제품 쓰셨는지 궁금해요.", likeCount: 4, replies: [{ id: 2, author: { id: "green-thumb", nickname: "초록손" }, createdAt: "2026-09-30T19:08:00+09:00", body: "액비는 희석해서 2주에 한 번 줬어요. 제품명은 쪽지로 드릴게요!", likeCount: 1, replies: [] }] },
  { id: 3, author: { id: "walker", nickname: "산책러" }, createdAt: "2026-09-30T19:02:00+09:00", body: "선반 3단 사진도 보고 싶어요 ㅎㅎ", likeCount: 2, replies: [] },
];

export const popularPosts = [
  "분리수거 헷갈리는 품목 정리 짤 공유합니다",
  "10월 지역별 플리마켓·나눔장터 일정 모음",
  "자전거 출퇴근 한 달 해본 결과",
  "제로웨이스트 샵 3곳 다녀온 솔직 후기",
  "베란다 텃밭 6개월 차 수확량 정리",
];
