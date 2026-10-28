import { redirect } from "next/navigation";
import { BoardFeed } from "@/components/community/BoardFeed";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { board } = await params;
  if (board !== "all") redirect("/community/all");
  const requestedPage = Number((await searchParams).page ?? 1);
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  return <BoardFeed page={page} />;
}
