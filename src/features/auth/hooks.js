'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export async function fetchSession() {
  try {
    const res = await fetch('/api/auth/session', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.authenticated ? data.user : null;
  } catch {
    return null;
  }
}

/**
 * React hook to retrieve current authenticated user session.
 * Automatically synchronizes whenever 'auth-change' event is dispatched.
 */
export function useSession() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleAuthChange = () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [queryClient]);

  return useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
    staleTime: 1000 * 60,
  });
}
