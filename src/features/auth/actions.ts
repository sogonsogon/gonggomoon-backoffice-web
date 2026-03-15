'use server';
import { privateFetch, publicFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';
import { cookies } from 'next/headers';
import { LoginRequest, LoginResponse } from './types';

export async function login(data: LoginRequest) {
  const response = await publicFetch<LoginResponse>('/api/v1/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.success) {
    return response;
  }

  const cookieStore = await cookies();
  const isSecureCookie = process.env.NODE_ENV === 'production';

  cookieStore.set('accessToken', response.data.accessToken, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  });
  cookieStore.set('refreshToken', response.data.refreshToken, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
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
