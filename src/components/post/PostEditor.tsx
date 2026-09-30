"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FieldLabel, FieldMessage, Input, Select, Textarea } from "@/components/common/FormControls";
import { boards } from "@/lib/mock-community";
import { cn } from "@/lib/utils";
import type { BoardId } from "@/types";

type Errors = { title?: string; content?: string };

export function PostEditor({ defaultBoard }: { defaultBoard: BoardId }) {
  const [boardId, setBoardId] = useState(defaultBoard);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(["텃밭", "베란다"]);
  const [tagInput, setTagInput] = useState("");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  function addTag() {
    const nextTag = tagInput.trim().replace(/^#/, "");
    if (!nextTag || tags.includes(nextTag) || tags.length >= 5) return;
    setTags((current) => [...current, nextTag]);
    setTagInput("");
  }

  function validate() {
    const nextErrors: Errors = {};
    if (!title.trim()) nextErrors.title = "제목을 입력해주세요.";
    if (!content.trim()) nextErrors.content = "본문을 입력해주세요.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  return (
    <form
      className="mt-6 space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!validate()) return;
        setStatus("게시글 작성 준비가 완료됐어요. API를 연결하면 바로 게시할 수 있어요.");
      }}
    >
      <div>
        <FieldLabel htmlFor="board">게시판</FieldLabel>
        <Select id="board" value={boardId} onChange={(event) => setBoardId(event.target.value as BoardId)} className="mt-1.5 sm:w-64">
          {boards.filter((board) => board.id !== "all").map((board) => <option key={board.id} value={board.id}>{board.name}</option>)}
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="post-title">제목</FieldLabel>
          <span className="text-xs tabular-nums text-fg-muted">{title.length}/100</span>
        </div>
        <Input id="post-title" value={title} maxLength={100} onChange={(event) => { setTitle(event.target.value); setErrors((current) => ({ ...current, title: undefined })); }} placeholder="제목을 입력해주세요" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} className={cn("mt-1.5", errors.title && "border-red-500 ring-4 ring-red-50")} />
        {errors.title && <FieldMessage id="title-error" error>{errors.title}</FieldMessage>}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="post-content">본문</FieldLabel>
          <div role="tablist" aria-label="본문 보기 방식" className="inline-flex rounded-lg bg-surface-muted p-0.5 text-xs">
            {(["write", "preview"] as const).map((value) => (
              <button key={value} type="button" role="tab" aria-selected={mode === value} onClick={() => setMode(value)} className={cn("rounded-md px-2 py-0.5", mode === value ? "bg-surface font-medium shadow-sm" : "text-fg-muted")}>
                {value === "write" ? "작성" : "미리보기"}
              </button>
            ))}
          </div>
        </div>
        {mode === "write" ? (
          <Textarea id="post-content" value={content} onChange={(event) => { setContent(event.target.value); setErrors((current) => ({ ...current, content: undefined })); }} rows={12} placeholder="나누고 싶은 이야기를 입력해주세요" aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? "content-error" : "content-helper"} className={cn("mt-1.5 leading-6", errors.content && "border-red-500 ring-4 ring-red-50")} />
        ) : (
          <div role="tabpanel" className="mt-1.5 min-h-72 whitespace-pre-wrap rounded-md border border-border p-3 text-[15px] leading-7 text-fg-body">
            {content || <span className="text-fg-muted">미리 볼 내용이 없어요.</span>}
          </div>
        )}
        {errors.content ? <FieldMessage id="content-error" error>{errors.content}</FieldMessage> : <FieldMessage id="content-helper">마크다운을 지원하며 이미지는 붙여넣을 수 있어요.</FieldMessage>}
      </div>

      <div>
        <FieldLabel htmlFor="tag-input">태그</FieldLabel>
        <div className="mt-1.5 flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-border px-2 py-1.5 focus-within:border-border-strong focus-within:ring-4 focus-within:ring-surface-muted">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-xs text-fg-secondary">
              #{tag}
              <button type="button" aria-label={`${tag} 태그 삭제`} onClick={() => setTags((current) => current.filter((item) => item !== tag))} className="rounded text-fg-muted hover:text-fg"><X aria-hidden="true" className="size-3" /></button>
            </span>
          ))}
          <input id="tag-input" value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addTag(); } }} disabled={tags.length >= 5} placeholder={tags.length >= 5 ? "태그는 5개까지 추가할 수 있어요" : "태그를 입력하고 Enter"} className="min-w-40 flex-1 bg-transparent py-0.5 text-sm outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed" />
        </div>
        <FieldMessage id="tag-helper">태그는 최대 5개까지 추가할 수 있어요.</FieldMessage>
      </div>

      {status && <p role="status" className="rounded-md bg-brand-soft px-3 py-2 text-[13px] text-brand">{status}</p>}

      <div className="flex justify-end gap-2 border-t border-border pt-5">
        <Link href={`/community/${boardId}`} className="inline-flex h-8 items-center rounded-md px-3 text-[13px] font-medium text-fg-secondary transition-colors duration-150 hover:bg-surface-muted">취소</Link>
        <Button type="button" variant="secondary">임시저장</Button>
        <Button type="submit" variant="brand">게시하기</Button>
      </div>
    </form>
  );
}
