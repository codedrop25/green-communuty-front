import { PostEditor } from "@/components/post/PostEditor";
import { RequireAuth } from "@/components/auth/RequireAuth";

export default function WritePage() {
  return (
    <RequireAuth>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <h1 className="text-xl font-semibold tracking-tight">새 글 작성</h1>
        <p className="mt-1 text-fg-muted">
          이웃과 나누고 싶은 이야기를 작성해주세요.
        </p>
        <PostEditor />
      </main>
    </RequireAuth>
  );
}
