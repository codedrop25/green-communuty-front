"use client";

import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "@/lib/api/client";

export function useResource<T>(
  key: string,
  loader: (signal: AbortSignal) => Promise<T>,
  enabled = true,
) {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<{
    key: string;
    data?: T;
    error?: string;
    loading: boolean;
  }>({ key, loading: true });
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    loader(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setState({ key, data, loading: false });
      },
      (error: unknown) => {
        if (!controller.signal.aborted)
          setState({ key, error: errorMessage(error), loading: false });
      },
    );
    return () => controller.abort();
  }, [key, loader, enabled, version]);
  const reload = useCallback(() => {
    setState({ key, loading: true });
    setVersion((value) => value + 1);
  }, [key]);
  return {
    ...(state.key === key
      ? state
      : { loading: true, data: undefined, error: undefined }),
    reload,
  };
}
