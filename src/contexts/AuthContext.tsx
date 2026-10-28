"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi, type User } from "@/lib/api/auth";
import { ApiError, errorMessage } from "@/lib/api/client";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  reload: () => Promise<void>;
};
const AuthContext = createContext<AuthState | null>(null);
let initialRequest: Promise<User> | null = null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setUser(await authApi.me());
    } catch (error) {
      setUser(null);
      if (!(error instanceof ApiError && error.status === 401))
        setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    let active = true;
    initialRequest ??= authApi.me().finally(() => {
      initialRequest = null;
    });
    initialRequest.then(
      (user) => {
        if (active) {
          setUser(user);
          setLoading(false);
        }
      },
      (error: unknown) => {
        if (active) {
          setLoading(false);
          if (!(error instanceof ApiError && error.status === 401))
            setError(errorMessage(error));
        }
      },
    );
    const expired = () => {
      setUser(null);
      setError("");
    };
    window.addEventListener("green-session-expired", expired);
    return () => {
      active = false;
      window.removeEventListener("green-session-expired", expired);
    };
  }, []);
  async function login(email: string, password: string) {
    await authApi.login(email, password);
    setUser(await authApi.me());
    setError("");
    setLoading(false);
  }
  async function logout() {
    await authApi.logout();
    setUser(null);
    setError("");
  }
  return (
    <AuthContext.Provider
      value={{ user, loading, error, reload, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider가 필요합니다.");
  return context;
}
