import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "green_access";
const API_PATH = "/api/backend";
const REFRESH_PATH = `${API_PATH}/auth`;

const routes: [RegExp, string[]][] = [
  [/^auth\/(signup|login|refresh|logout|logout-all)$/, ["POST"]],
  [/^users\/me$/, ["GET", "PATCH", "DELETE"]],
  [/^menus(?:\/\d+)?$/, ["GET"]],
  [/^posts$/, ["GET", "POST"]],
  [/^posts\/\d+$/, ["GET", "PATCH"]],
  [/^posts\/\d+\/delete$/, ["PATCH"]],
  [/^posts\/\d+\/likes$/, ["POST", "PUT"]],
  [/^posts\/\d+\/images$/, ["GET", "POST"]],
  [/^posts\/\d+\/comments$/, ["GET", "POST"]],
  [/^comments\/\d+$/, ["PATCH", "DELETE"]],
  [/^comments\/\d+\/replies$/, ["GET"]],
];

export async function forwardBackend(request: NextRequest, segments: string[]) {
  const path = segments.join("/");
  if (
    !routes.some(
      ([pattern, methods]) =>
        pattern.test(path) && methods.includes(request.method),
    )
  ) {
    return NextResponse.json(
      { message: "지원하지 않는 요청입니다." },
      { status: 404 },
    );
  }

  // Browser mutations must originate from this site, including login and logout.
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    let sameOrigin = false;
    try {
      sameOrigin =
        !!origin && new URL(origin).host === request.headers.get("host");
    } catch {
      /* Invalid Origin is rejected below. */
    }
    if (!sameOrigin || request.headers.get("sec-fetch-site") === "cross-site") {
      return NextResponse.json(
        { message: "허용되지 않은 요청입니다." },
        { status: 403 },
      );
    }
  }

  const headers = new Headers();
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  if (path.startsWith("auth/")) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (refreshToken) headers.set("Cookie", `refresh_token=${refreshToken}`);
  }
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const secure = request.nextUrl.protocol === "https:";
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: API_PATH,
  };
  try {
    const body =
      request.method === "GET" ? undefined : await request.arrayBuffer();
    if (body && body.byteLength > 11 * 1024 * 1024) {
      return NextResponse.json(
        { message: "파일 크기는 10MB 이하로 제한됩니다." },
        { status: 413 },
      );
    }
    const base = (
      process.env.BACKEND_API_URL ?? "http://127.0.0.1:8000/api/v1"
    ).replace(/\/$/, "");
    const upstream = await fetch(`${base}/${path}${request.nextUrl.search}`, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(30_000),
    });
    let response: NextResponse;
    if (upstream.ok && (path === "auth/login" || path === "auth/refresh")) {
      const tokens: { access_token: string; expires_in: number } =
        await upstream.json();
      response = NextResponse.json({ expires_in: tokens.expires_in });
      response.cookies.set(ACCESS_COOKIE, tokens.access_token, {
        ...cookieOptions,
        maxAge: tokens.expires_in,
      });
    } else {
      response = new NextResponse(
        upstream.status === 204 ? null : await upstream.arrayBuffer(),
        { status: upstream.status },
      );
      for (const name of ["content-type", "retry-after", "x-request-id"]) {
        const value = upstream.headers.get(name);
        if (value) response.headers.set(name, value);
      }
    }
    for (const cookie of upstream.headers.getSetCookie()) {
      if (cookie.startsWith("refresh_token=")) {
        const rewritten = cookie
          .replace(/;\s*Path=[^;]*/i, `; Path=${REFRESH_PATH}`)
          .replace(/;\s*Domain=[^;]*/i, "");
        response.headers.append(
          "Set-Cookie",
          secure && !/;\s*Secure/i.test(rewritten)
            ? `${rewritten}; Secure`
            : rewritten,
        );
      }
    }
    if (
      (upstream.ok && ["auth/logout", "auth/logout-all"].includes(path)) ||
      (path === "auth/refresh" && upstream.status === 401) ||
      (path === "users/me" && request.method === "DELETE" && upstream.ok)
    ) {
      response.cookies.set(ACCESS_COOKIE, "", { ...cookieOptions, maxAge: 0 });
      response.cookies.set("refresh_token", "", {
        ...cookieOptions,
        path: REFRESH_PATH,
        maxAge: 0,
      });
    }
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json(
      { message: "서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }
}
