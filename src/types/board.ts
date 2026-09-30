export type BoardId = "all" | "free" | "qna" | "info" | "review";

export type Board = {
  id: BoardId;
  name: string;
  description: string;
  count: number;
};

export type Author = {
  id: string;
  nickname: string;
  avatarUrl?: string;
};
