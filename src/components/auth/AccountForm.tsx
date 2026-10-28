"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RequireAuth } from "./RequireAuth";
import { authApi } from "@/lib/api/auth";
import { errorMessage } from "@/lib/api/client";
import { Button } from "@/components/common/Button";
import { FieldLabel, Input } from "@/components/common/FormControls";

export function AccountForm() {
  const { user, reload } = useAuth();
  const [nickname, setNickname] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  return (
    <RequireAuth>
      <main className="mx-auto max-w-xl px-6 py-8">
        <h1 className="text-xl font-semibold">내 정보</h1>
        <p className="mt-3 text-sm text-fg-muted">{user?.user_email}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setPending(true);
            setError("");
            setMessage("");
            try {
              await authApi.update(
                (nickname ?? user?.user_nickname ?? "").trim(),
              );
              await reload();
              setMessage("닉네임을 변경했어요.");
            } catch (error) {
              setError(errorMessage(error));
            } finally {
              setPending(false);
            }
          }}
        >
          <div>
            <FieldLabel htmlFor="profile-nickname">닉네임</FieldLabel>
            <Input
              id="profile-nickname"
              className="mt-2"
              required
              minLength={2}
              maxLength={50}
              value={nickname ?? user?.user_nickname ?? ""}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="text-sm text-brand">
              {message}
            </p>
          )}
          <Button type="submit" loading={pending}>
            저장
          </Button>
        </form>
      </main>
    </RequireAuth>
  );
}
