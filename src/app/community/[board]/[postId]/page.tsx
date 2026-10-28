import { notFound, redirect } from "next/navigation";
import { PostScreen } from "@/components/post/PostScreen";

export default async function PostPage({
  params,
}: {
  params: Promise<{ board: string; postId: string }>;
}) {
  const { board, postId } = await params;
  const id = Number(postId);
  if (!Number.isSafeInteger(id) || id < 1) notFound();
  if (board !== "all") redirect(`/community/all/${id}`);
  return <PostScreen postId={id} />;
}
