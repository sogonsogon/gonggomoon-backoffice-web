import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginRequest, LoginResponse } from '@/features/auth/types';
import { login, logout } from '@/features/auth/actions';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/shared/types/api';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<ApiSuccessResponse<LoginResponse>, ApiErrorResponse, LoginRequest>({
    mutationFn: (data: LoginRequest) =>
      login(data).then((result) => {
        if (!result.success) return Promise.reject(result);
        return result;
      }),
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/industry';
    },
    onError: (error: ApiErrorResponse) => {
      console.error('로그인 실패:', error);
    },
  });
}

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    },
  });
}
