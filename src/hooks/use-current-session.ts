"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentSession } from "@/services/current-session.service";

export function useCurrentSession() {
  return useQuery({
    queryFn: getCurrentSession,
    queryKey: ["current-session"],
    retry: false,
    staleTime: 5 * 60_000,
  });
}
