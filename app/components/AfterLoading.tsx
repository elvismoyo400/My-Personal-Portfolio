"use client";

import type { ReactNode } from "react";
import { useLoadingState } from "../contexts/LoadingState";

export default function AfterLoading({ children }: { children: ReactNode }) {
  const { hasCompleted } = useLoadingState();
  return hasCompleted ? children : null;
}
