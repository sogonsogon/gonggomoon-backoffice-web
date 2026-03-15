'use server';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { cookies } from 'next/headers';
import { LoginRequest, LoginResponse } from './types';

export async function login(data: LoginRequest) {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${BASE_API_URL}/api/v1/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const body: LoginResponse = await res.json();

    if (!res.ok || !body.accessToken) {
      return { success: false as const, code: 'LOGIN_FAILED', message: '로그인에 실패했습니다.', data: null, errors: [], timestamp: new Date().toISOString() };
    }

    const cookieStore = await cookies();
    const isSecureCookie = process.env.NODE_ENV === 'production';

    cookieStore.set('accessToken', body.accessToken, {
      httpOnly: true,
      secure: isSecureCookie,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set('refreshToken', body.refreshToken, {
      httpOnly: true,
      secure: isSecureCookie,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 14,
    });

    return { success: true as const, code: 'SUCCESS', message: '로그인 성공', data: body, errors: [], timestamp: new Date().toISOString() };
  } catch {
    return { success: false as const, code: 'NETWORK_ERROR', message: '서버와의 통신에 실패했습니다.', data: null, errors: [], timestamp: new Date().toISOString() };
  }
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
