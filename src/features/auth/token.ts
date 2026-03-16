import { cookies } from 'next/headers';
import type { ApiResponse } from '@/shared/types/api';

const BASE_API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const isSecureCookie = process.env.NODE_ENV === 'production';

/**
 * Server-side only: refreshToken으로 accessToken 재발급
 * Server Action이 아닌 순수 서버 함수 — httpClient에서 직접 호출 가능
 */
export async function reissueAccessToken(): Promise<
  ApiResponse<{ accessToken: string; refreshToken: string }>
> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const fail = (message: string): ApiResponse<{ accessToken: string; refreshToken: string }> => ({
    success: false,
    code: 'SESSION_EXPIRED',
    message,
    data: null,
    errors: [],
    timestamp: new Date().toISOString(),
  });

  if (!refreshToken) {
    return fail('세션이 만료되었습니다. 다시 로그인해 주세요.');
  }

  try {
    const response = await fetch(`${BASE_API_URL}/api/v1/admin/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return fail('세션이 만료되었습니다. 다시 로그인해 주세요.');
    }

    const data = await response.json();
    const accessToken: string = data?.data?.accessToken ?? data?.accessToken;
    const newRefreshToken: string = data?.data?.refreshToken ?? data?.refreshToken;

    if (!accessToken) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      return fail('토큰 재발급에 실패했습니다.');
    }

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isSecureCookie,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    });
    if (newRefreshToken) {
      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 14,
      });
    }

    return {
      success: true,
      code: 'SUCCESS',
      message: '토큰이 재발급되었습니다.',
      data: { accessToken, refreshToken: newRefreshToken },
      timestamp: new Date().toISOString(),
    };
  } catch {
    return fail('서버와의 통신에 실패했습니다.');
  }
}
