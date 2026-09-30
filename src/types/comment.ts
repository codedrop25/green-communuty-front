import type { Author } from "./board";

export type Comment = {
  id: number;
  author: Author;
  createdAt: string;
  body: string;
  likeCount: number;
  replies: Comment[];
};
