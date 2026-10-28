export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

let refreshing: Promise<boolean> | null = null;
let sessionQueue: Promise<unknown> = Promise.resolve();

// Serialize cookie changes, including login/logout racing with a token refresh.
export function withSessionLock<T>(action: () => Promise<T>): Promise<T> {
  const run = async (): Promise<T> => {
    if (typeof navigator !== "undefined" && navigator.locks)
      return await navigator.locks.request("green-session-refresh", action);
    return action();
  };
  const result = sessionQueue.then(run, run);
  sessionQueue = result.catch(() => undefined);
  return result;
}

async function refreshSession() {
  if (!refreshing) {
    const refresh = async () => {
      // A different tab may already have refreshed the shared HttpOnly cookie.
      const probe = await fetch("/api/backend/users/me", { cache: "no-store" });
      if (probe.ok) return true;
      if (probe.status !== 401)
        throw new ApiError(
          "로그인 상태를 확인하지 못했습니다. 다시 시도해주세요.",
          probe.status,
        );
      const response = await fetch("/api/backend/auth/refresh", {
        method: "POST",
      });
      if (response.ok) return true;
      if (response.status === 401) return false;
      throw new ApiError(
        "로그인 상태를 갱신하지 못했습니다. 다시 시도해주세요.",
        response.status,
      );
    };
    refreshing = withSessionLock(refresh).finally(() => {
      refreshing = null;
    });
  }
  return refreshing;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const send = () =>
    fetch(`/api/backend${path}`, {
      ...init,
      credentials: "same-origin",
      cache: "no-store",
    });
  let response: Response;
  try {
    response = await send();
    if (
      response.status === 401 &&
      !path.startsWith("/auth/") &&
      (await refreshSession())
    )
      response = await send();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new ApiError("네트워크 연결을 확인하고 다시 시도해주세요.", 0);
  }
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
      detail?: { field: string; message: string }[];
    } | null;
    const detail = Array.isArray(payload?.detail)
      ? payload.detail
          .map((item) => `${item.field}: ${item.message}`)
          .join(" · ")
      : "";
    if (response.status === 401 && !path.startsWith("/auth/"))
      window.dispatchEvent(new Event("green-session-expired"));
    throw new ApiError(
      detail || payload?.message || "요청을 처리하지 못했습니다.",
      response.status,
    );
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function jsonBody(method: string, data: unknown): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "요청을 처리하지 못했습니다.";
}
