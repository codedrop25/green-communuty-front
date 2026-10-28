import { apiRequest, jsonBody, withSessionLock } from "./client";

export type User = {
  user_id: number;
  user_email: string;
  user_nickname: string;
  user_role: "USER" | "ADMIN";
  user_is_active: boolean;
  user_created_at: string;
};

export const authApi = {
  me: () => apiRequest<User>("/users/me"),
  login: (email: string, password: string) =>
    withSessionLock(() =>
      apiRequest("/auth/login", jsonBody("POST", { email, password })),
    ),
  signup: (email: string, password: string, nickname: string) =>
    apiRequest<User>(
      "/auth/signup",
      jsonBody("POST", {
        user_email: email,
        user_password: password,
        user_nickname: nickname,
      }),
    ),
  logout: () =>
    withSessionLock(() => apiRequest("/auth/logout", { method: "POST" })),
  update: (nickname: string) =>
    apiRequest<User>(
      "/users/me",
      jsonBody("PATCH", { user_nickname: nickname }),
    ),
};
