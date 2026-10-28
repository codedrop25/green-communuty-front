"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { FieldLabel, Input } from "@/components/common/FormControls";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/lib/api/auth";
import { errorMessage } from "@/lib/api/client";

export function AuthForm({
  signup = false,
  next = "/community/all",
}: {
  signup?: boolean;
  next?: string;
}) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const destination =
    next.startsWith("/community/") && !next.includes("\\")
      ? next
      : "/community/all";
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      if (new TextEncoder().encode(password).length > 72)
        throw new Error("비밀번호는 UTF-8 기준 72바이트 이내로 입력해주세요.");
      if (signup && !registered) {
        await authApi.signup(email, password, nickname.trim());
        setRegistered(true);
      }
      await login(email, password);
      router.replace(destination);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/community/all" className="font-semibold text-brand">
        Green Community
      </Link>
      <h1 className="mt-8 text-2xl font-semibold">
        {signup ? "회원가입" : "로그인"}
      </h1>
      <p className="mt-2 text-sm text-fg-muted">
        이웃과 초록빛 일상을 나눠보세요.
      </p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        {signup && (
          <div>
            <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
            <Input
              id="nickname"
              className="mt-1.5"
              autoComplete="nickname"
              minLength={2}
              maxLength={50}
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={registered}
            />
          </div>
        )}
        <div>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input
            id="email"
            className="mt-1.5"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={registered}
          />
        </div>
        <div>
          <FieldLabel htmlFor="password">비밀번호</FieldLabel>
          <Input
            id="password"
            className="mt-1.5"
            type="password"
            autoComplete={signup ? "new-password" : "current-password"}
            minLength={8}
            maxLength={72}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-1 text-xs text-fg-muted">8자 이상 입력해주세요.</p>
        </div>
        {registered && (
          <p role="status" className="text-sm text-brand">
            가입이 완료됐어요. 로그인하여 계속해주세요.
          </p>
        )}
        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}
        <Button
          type="submit"
          variant="brand"
          size="lg"
          className="w-full"
          loading={pending}
        >
          {signup && !registered ? "가입하고 시작하기" : "로그인"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-fg-muted">
        {signup ? "이미 계정이 있나요?" : "처음 방문하셨나요?"}{" "}
        <Link
          className="font-medium text-fg underline"
          href={`${signup ? "/login" : "/signup"}?next=${encodeURIComponent(destination)}`}
        >
          {signup ? "로그인" : "회원가입"}
        </Link>
      </p>
    </main>
  );
}
