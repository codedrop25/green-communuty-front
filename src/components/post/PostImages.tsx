"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { communityApi } from "@/lib/api/community";
import { errorMessage } from "@/lib/api/client";
import { useResource } from "@/hooks/useResource";

export function PostImages({
  postId,
  hasImages,
  canUpload,
  onUploaded,
}: {
  postId: number;
  hasImages: boolean;
  canUpload: boolean;
  onUploaded: () => void;
}) {
  const loader = useCallback(
    (signal: AbortSignal) => communityApi.images(postId, signal),
    [postId],
  );
  const {
    data,
    loading,
    error: loadError,
    reload,
  } = useResource(`images:${postId}`, loader, hasImages);
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  async function upload() {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError("이미지는 10MB 이하로 첨부해주세요.");
      return;
    }
    setPending(true);
    setError("");
    try {
      await communityApi.uploadImage(postId, file);
      setFile(null);
      if (input.current) input.current.value = "";
      reload();
      onUploaded();
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  return (
    <section aria-label="첨부 이미지" className="mt-6 space-y-4">
      {hasImages &&
        (loading ? (
          <p className="text-sm text-fg-muted">이미지를 불러오는 중…</p>
        ) : loadError ? (
          <div>
            <p role="alert" className="mb-2 text-sm text-danger">
              {loadError}
            </p>
            <Button onClick={reload}>다시 시도</Button>
          </div>
        ) : (
          data?.map((image) => (
            <Image
              key={image.image_id}
              unoptimized
              src={image.image_url}
              alt="게시글 첨부 이미지"
              width={1600}
              height={1000}
              className="h-auto w-full rounded-lg border border-border"
            />
          ))
        ))}
      {canUpload && (
        <form
          className="rounded-lg border border-border p-4"
          onSubmit={(event) => {
            event.preventDefault();
            void upload();
          }}
        >
          <label htmlFor="post-image" className="block text-sm font-medium">
            이미지 첨부
          </label>
          <p className="mt-1 text-xs text-fg-muted">이미지 한 장당 최대 10MB</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              ref={input}
              id="post-image"
              type="file"
              accept="image/*"
              disabled={pending}
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError("");
              }}
              className="max-w-full text-xs text-fg-muted"
            />
            <Button type="submit" size="sm" disabled={!file} loading={pending}>
              업로드
            </Button>
          </div>
          {error && (
            <p role="alert" className="mt-3 text-sm text-danger">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
