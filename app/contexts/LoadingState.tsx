"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface LoadingStateValue {
  hasCompleted: boolean;
  completeLoading: () => void;
}

const LoadingStateContext = createContext<LoadingStateValue | null>(null);

export function LoadingStateProvider({ children }: { children: ReactNode }) {
  const [hasCompleted, setHasCompleted] = useState(false);
  const completeLoading = useCallback(() => setHasCompleted(true), []);
  const value = useMemo(
    () => ({ hasCompleted, completeLoading }),
    [hasCompleted, completeLoading],
  );

  return (
    <LoadingStateContext.Provider value={value}>
      {children}
    </LoadingStateContext.Provider>
  );
}

export function useLoadingState() {
  const context = useContext(LoadingStateContext);
  if (!context) {
    throw new Error("useLoadingState must be used within LoadingStateProvider");
  }
  return context;
}
