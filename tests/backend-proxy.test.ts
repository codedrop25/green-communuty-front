import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { NextRequest } from "next/server";
import { forwardBackend } from "../src/lib/server/backend-proxy";

afterEach(() => mock.restoreAll());

function request(path: string, method = "GET", cookie = "", body?: object) {
  return new NextRequest(`http://localhost:3000/api/backend/${path}`, {
    method,
    headers: { host: "localhost:3000", origin: "http://localhost:3000",
      cookie, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

test("anonymous service requests stop at Next without calling the backend", async () => {
  const upstream = mock.method(globalThis, "fetch", async () => { throw new Error("must not call"); });
  for (const path of ["menus", "posts", "posts/1/comments", "comments/1/replies", "users/me"]) {
    const response = await forwardBackend(request(path), path.split("/"));
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal(upstream.mock.callCount(), 0);
});

test("signup forwards the full JSON payload and backend validation errors", async () => {
  const payload = { user_email: "test@example.com", user_password: "test-password", user_nickname: "초록" };
  mock.method(globalThis, "fetch", async (url: string | URL | Request, init?: RequestInit) => {
    assert.ok(String(url).endsWith("/api/v1/auth/signup"));
    assert.deepEqual(JSON.parse(new TextDecoder().decode(init?.body as ArrayBuffer)), payload);
    return Response.json({ message: "이미 사용 중인 이메일입니다." }, { status: 409 });
  });
  const response = await forwardBackend(request("auth/signup", "POST", "", payload), ["auth", "signup"]);
  assert.equal(response.status, 409);
});

test("login stores tokens only in HttpOnly cookies and rewrites refresh path", async () => {
  mock.method(globalThis, "fetch", async () => Response.json(
    { access_token: "test-access", expires_in: 1800 },
    { headers: { "set-cookie": "refresh_token=test-refresh; Path=/api/v1/auth; HttpOnly; SameSite=lax; Max-Age=1209600" } },
  ));
  const response = await forwardBackend(request("auth/login", "POST", "", {}), ["auth", "login"]);
  assert.deepEqual(await response.json(), { expires_in: 1800 });
  const cookies = response.headers.getSetCookie().join(";");
  assert.match(cookies, /green_access=test-access/);
  assert.match(cookies, /httponly/i);
  assert.match(cookies, /Path=\/api\/backend\/auth/i);
  assert.doesNotMatch(cookies, /Path=\/api\/v1/);
});

test("refresh forwards only the refresh cookie and clears both cookies on expiry", async () => {
  mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    assert.equal(new Headers(init?.headers).get("cookie"), "refresh_token=expired");
    return Response.json({ message: "세션이 만료되었습니다." }, { status: 401 });
  });
  const response = await forwardBackend(request("auth/refresh", "POST", "refresh_token=expired; unrelated=private"), ["auth", "refresh"]);
  assert.equal(response.status, 401);
  assert.equal(response.cookies.get("green_access")?.maxAge, 0);
  assert.equal(response.cookies.get("refresh_token")?.maxAge, 0);
});

test("logout clears both cookies and service calls use server-side Authorization", async () => {
  mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-access");
    return Response.json({ message: "로그아웃되었습니다." });
  });
  const response = await forwardBackend(request("auth/logout", "POST", "green_access=test-access; refresh_token=test-refresh"), ["auth", "logout"]);
  assert.equal(response.cookies.get("green_access")?.maxAge, 0);
  assert.equal(response.cookies.get("refresh_token")?.maxAge, 0);
});

test("cross-site mutations and upstream redirects never reach the browser's backend URL", async () => {
  const upstream = mock.method(globalThis, "fetch", async () => new Response(null, {
    status: 307, headers: { location: "http://backend.internal/api/v1/posts/" },
  }));
  const crossSite = request("auth/signup", "POST", "", {});
  crossSite.headers.set("origin", "http://other.example.com");
  assert.equal((await forwardBackend(crossSite, ["auth", "signup"])).status, 403);
  assert.equal(upstream.mock.callCount(), 0);
  const response = await forwardBackend(request("posts", "GET", "green_access=test-access"), ["posts"]);
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("location"), null);
});
