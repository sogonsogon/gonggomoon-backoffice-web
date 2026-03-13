import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    }),
);
