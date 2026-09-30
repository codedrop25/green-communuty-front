import { CommentItem } from "./CommentItem";
import type { Comment as CommentData } from "@/types";

export function CommentList({ comments }: { comments: CommentData[] }) {
  return (
    <ul className="mt-6 space-y-6">
      {comments.map((comment) => (
        <li key={comment.id}><CommentItem comment={comment} /></li>
      ))}
    </ul>
  );
}
