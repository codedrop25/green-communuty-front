import { CommentItem } from "./CommentItem";
import type { Comment } from "@/types";

export function CommentList({
  comments,
  postId,
  onChanged,
}: {
  comments: Comment[];
  postId: number;
  onChanged: () => void;
}) {
  return (
    <ul className="mt-6 space-y-6">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            comment={comment}
            postId={postId}
            onChanged={onChanged}
          />
        </li>
      ))}
    </ul>
  );
}
