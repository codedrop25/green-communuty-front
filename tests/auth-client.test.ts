import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { apiRequest, ApiError, withSessionLock } from "../src/lib/api/client";
import { authApi } from "../src/lib/api/auth";

afterEach(() => mock.restoreAll());

test("signup and login only call same-origin Next routes with expected fields", async () => {
  const calls: string[] = [];
  mock.method(globalThis, "fetch", async (url: string | URL | Request, init?: RequestInit) => {
    calls.push(String(url));
    const body = JSON.parse(init?.body as string);
    if (String(url).endsWith("signup"))
      assert.deepEqual(body, { user_email: "test@example.com", user_password: "password123", user_nickname: "초록" });
    else assert.deepEqual(body, { email: "test@example.com", password: "password123" });
    return Response.json({});
  });
  await authApi.signup("test@example.com", "password123", "초록");
  await authApi.login("test@example.com", "password123");
  assert.deepEqual(calls, ["/api/backend/auth/signup", "/api/backend/auth/login"]);
});

test("concurrent unauthorized requests share one refresh and then retry", async () => {
  let refreshed = false;
  let refreshCount = 0;
  mock.method(globalThis, "fetch", async (url: string | URL | Request) => {
    assert.ok(String(url).startsWith("/api/backend/"));
    if (String(url).endsWith("auth/refresh")) {
      refreshCount++;
      refreshed = true;
      return Response.json({ expires_in: 1800 });
    }
    return Response.json(refreshed ? { ok: true } : {}, { status: refreshed ? 200 : 401 });
  });
  const values = await Promise.all([apiRequest("/posts"), apiRequest("/menus")]);
  assert.equal(refreshCount, 1);
  assert.deepEqual(values, [{ ok: true }, { ok: true }]);
});

test("a backend outage during refresh remains a retryable error, not a logout", async () => {
  let count = 0;
  mock.method(globalThis, "fetch", async () => Response.json({}, { status: ++count === 1 ? 401 : 502 }));
  await assert.rejects(apiRequest("/users/me"), (error: unknown) => error instanceof ApiError && error.status === 502);
});

test("login and logout wait for an in-flight session mutation", async () => {
  const order: string[] = [];
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  const pending = withSessionLock(async () => { order.push("refresh"); await gate; });
  mock.method(globalThis, "fetch", async (url: unknown) => {
    order.push(String(url).split("/").at(-1)!);
    return Response.json({});
  });
  const login = authApi.login("test@example.com", "password123");
  const logout = authApi.logout();
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.deepEqual(order, ["refresh"]);
  release();
  await Promise.all([pending, login, logout]);
  assert.deepEqual(order, ["refresh", "login", "logout"]);
});
