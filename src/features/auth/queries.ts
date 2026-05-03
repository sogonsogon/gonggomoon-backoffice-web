import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginRequest, LoginResponse } from '@/features/auth/types';
import { login, logout } from '@/features/auth/actions';
import type { ApiErrorResponse, ApiSuccessResponse } from '@/shared/types/api';
import { useAuthStore } from '@/shared/store/authStore';

export function useLogin() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<ApiSuccessResponse<LoginResponse>, ApiErrorResponse, LoginRequest>({
    mutationFn: (data: LoginRequest) =>
      login(data).then((result) => {
        if (!result.success) return Promise.reject(result);
        return result;
      }),
    onSuccess: (result) => {
      if (result.data.user) {
        setUser(result.data.user);
      }
      queryClient.clear();
    },

    onError: (error: ApiErrorResponse) => {
      console.error('로그인 실패:', error);
    },
  });
}

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      window.location.href = '/login';
    },
  });
}
