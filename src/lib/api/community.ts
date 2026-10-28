import { apiRequest, jsonBody } from "./client";
import type { PostSummary, PostDetailData, Comment } from "@/types";

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
};
type PostDto = {
  post_id: number;
  post_title: string;
  author: { user_id: number; user_nickname: string };
  created_at: string;
  post_view_count?: number;
};
type DetailDto = PostDto & {
  post_content: string;
  post_like_count: number;
  is_liked: boolean;
  has_images: boolean;
};
type CommentDto = {
  comment_id: number;
  author_id: number;
  comment_content: string;
  created_at: string;
  parent_comment_id: number | null;
  reply_count: number;
};
export type PostImage = {
  image_id: number;
  post_id: number;
  image_url: string;
};
export type Menu = { menu_id: number; menu_name: string; children: Menu[] };

// MySQL timestamps are UTC but the current API serializes them without an offset.
const utcDate = (value: string) =>
  /(?:Z|[+-]\d{2}:\d{2})$/i.test(value) ? value : `${value}Z`;
const postFromDto = (post: PostDto): PostSummary => ({
  id: post.post_id,
  title: post.post_title,
  boardId: "all",
  author: {
    id: String(post.author.user_id),
    nickname: post.author.user_nickname,
  },
  createdAt: utcDate(post.created_at),
  viewCount: post.post_view_count,
});
const commentFromDto = (comment: CommentDto): Comment => ({
  id: comment.comment_id,
  author: {
    id: String(comment.author_id),
    nickname: `회원 ${comment.author_id}`,
  },
  createdAt: utcDate(comment.created_at),
  body: comment.comment_content,
  replyCount: comment.reply_count,
  replies: [],
});

export const communityApi = {
  async posts(page: number, signal?: AbortSignal) {
    const result = await apiRequest<Page<PostDto> & { notices: PostDto[] }>(
      `/posts?page=${page}&size=20`,
      { signal },
    );
    return {
      ...result,
      items: result.items.map(postFromDto),
      notices: result.notices.map(postFromDto),
    };
  },
  async post(id: number, signal?: AbortSignal): Promise<PostDetailData> {
    const post = await apiRequest<DetailDto>(`/posts/${id}`, { signal });
    return {
      ...postFromDto(post),
      content: [post.post_content],
      tags: [],
      likeCount: post.post_like_count,
      isLiked: post.is_liked,
      hasImage: post.has_images,
    };
  },
  async create(title: string, content: string) {
    return postFromDto(
      await apiRequest<PostDto>(
        "/posts",
        jsonBody("POST", { post_title: title, post_content: content }),
      ),
    );
  },
  update: (id: number, title: string, content: string) =>
    apiRequest(
      `/posts/${id}`,
      jsonBody("PATCH", { post_title: title, post_content: content }),
    ),
  remove: (id: number) =>
    apiRequest<void>(`/posts/${id}/delete`, { method: "PATCH" }),
  like: (id: number, liked: boolean) =>
    apiRequest<void>(`/posts/${id}/likes`, { method: liked ? "POST" : "PUT" }),
  async comments(id: number, page: number, signal?: AbortSignal) {
    const result = await apiRequest<Page<CommentDto>>(
      `/posts/${id}/comments?page=${page}&size=20`,
      { signal },
    );
    return { ...result, items: result.items.map(commentFromDto) };
  },
  async replies(id: number) {
    return (await apiRequest<CommentDto[]>(`/comments/${id}/replies`)).map(
      commentFromDto,
    );
  },
  comment: (id: number, content: string, parentId?: number) =>
    apiRequest(
      `/posts/${id}/comments`,
      jsonBody("POST", {
        comment_content: content,
        parent_comment_id: parentId ?? null,
      }),
    ),
  updateComment: (id: number, content: string) =>
    apiRequest(
      `/comments/${id}`,
      jsonBody("PATCH", { comment_content: content }),
    ),
  removeComment: (id: number) =>
    apiRequest<void>(`/comments/${id}`, { method: "DELETE" }),
  images: (id: number, signal?: AbortSignal) =>
    apiRequest<PostImage[]>(`/posts/${id}/images`, { signal }),
  uploadImage(id: number, file: File) {
    const body = new FormData();
    body.set("image", file);
    return apiRequest<PostImage>(`/posts/${id}/images`, {
      method: "POST",
      body,
    });
  },
  menus: (signal?: AbortSignal) => apiRequest<Menu[]>("/menus", { signal }),
};
