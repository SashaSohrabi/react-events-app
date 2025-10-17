import { useMemo } from 'react';

export function useAuthAlert({ status, error }) {
  return useMemo(() => {
    if (status !== 'error' || !error) return null;

    let message = typeof error === 'string' ? error : 'Request failed';
    if (typeof error === 'string') {
      try {
        const parsed = JSON.parse(error);
        message = parsed?.error ?? parsed?.message ?? message;
      } catch (parseError) {
        if (import.meta.env.DEV) {
          console.warn('Failed to parse auth error response:', parseError, error);
        }
      }
    }

    return {
      variant: 'error',
      text: message,
    };
  }, [status, error]);
}
