'use server';
import { privateFetch, publicFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { cookies } from 'next/headers';
import { LoginRequest, LoginResponse } from '@/features/auth/types';

export async function login(data: LoginRequest) {
  const res = await publicFetch<LoginResponse>('/api/v1/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.success || !res.data.accessToken) {
    return {
      success: false as const,
      code: 'LOGIN_FAILED',
      message: '로그인에 실패했습니다.',
      data: null,
      errors: [],
      timestamp: new Date().toISOString(),
    };
  }

  const cookieStore = await cookies();
  const isSecureCookie = process.env.NODE_ENV === 'production';

  try {
    cookieStore.set('accessToken', res.data.accessToken, {
      httpOnly: true,
      secure: isSecureCookie,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set('refreshToken', res.data.refreshToken, {
      httpOnly: true,
      secure: isSecureCookie,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 14,
    });
  } catch {
    return {
      success: false as const,
      code: 'NETWORK_ERROR',
      message: '서버와의 통신에 실패했습니다.',
      data: null,
      errors: [],
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true as const,
    code: 'SUCCESS',
    message: '로그인 성공',
    data: res.data,
    errors: [],
    timestamp: new Date().toISOString(),
  };
}

export async function logout(): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>('/api/v1/admin/auth/logout', {
    method: 'POST',
  });

  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return response;
}
