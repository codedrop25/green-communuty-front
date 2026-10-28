"use client";

import { useId, useState } from "react";
import { Button } from "@/components/common/Button";
import { errorMessage } from "@/lib/api/client";

export function CommentForm({
  onSubmit,
  initialBody = "",
  label = "댓글",
  onCancel,
}: {
  onSubmit: (body: string) => Promise<void>;
  initialBody?: string;
  label?: string;
  onCancel?: () => void;
}) {
  const id = useId();
  const [body, setBody] = useState(initialBody);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      className="mt-4 rounded-lg border border-border focus-within:border-border-strong"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!body.trim()) return;
        setPending(true);
        setError("");
        try {
          await onSubmit(body.trim());
          setBody("");
        } catch (error) {
          setError(errorMessage(error));
        } finally {
          setPending(false);
        }
      }}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        maxLength={1000}
        disabled={pending}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={2}
        placeholder={`${label}을 입력해주세요`}
        className="w-full resize-y rounded-lg bg-transparent p-3 text-sm outline-none"
      />
      {error && (
        <p role="alert" className="px-3 text-sm text-danger">
          {error}
        </p>
      )}
      <div className="flex items-center justify-end gap-2 p-2">
        <span className="mr-auto text-xs text-fg-muted">
          {body.length}/1000
        </span>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pending}
            onClick={onCancel}
          >
            취소
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          loading={pending}
          disabled={!body.trim()}
        >
          {initialBody ? "저장" : "등록"}
        </Button>
      </div>
    </form>
  );
}
