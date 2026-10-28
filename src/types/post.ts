import type { Author, BoardId } from "./board";

export type Notice = {
  id: number;
  title: string;
};

export type PostSummary = {
  id: number;
  boardId: BoardId;
  title: string;
  excerpt?: string;
  author: Author;
  createdAt: string;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  isNew?: boolean;
  hasImage?: boolean;
};

export type PostDetailData = PostSummary & {
  isLiked?: boolean;
  content: string[];
  tags: string[];
};
