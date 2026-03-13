import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { LoginRequest } from './types';
import { login, logout } from './actions';

export function useLogIn() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.clear();
        router.push('/industry');
      }
    },
  });
}

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
}
