import { ReissueResponse } from '@/features/auth/types';
import { publicFetch } from '@/shared/api/httpClient';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

const PUBLIC_PATHS = ['/login'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!accessToken && refreshToken) {
    try {
      // 2. 토큰 재발급 API 호출
      const refreshApiUrl = `${BASE_API_URL}/api/v1/admin/auth/reissue`;
      const result = await publicFetch<ReissueResponse>(refreshApiUrl, {
        method: 'POST',
        body: JSON.stringify({ refreshToken: refreshToken }),
      });

      if (!result.success || !result.data) {
        throw new Error('토큰 재발급 실패');
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result.data;

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(
        'Cookie',
        `accessToken=${newAccessToken}; refreshToken=${newRefreshToken}`,
      );

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? ('none' as const) : ('lax' as const),
        path: '/',
      };

      response.cookies.set('accessToken', newAccessToken, { ...cookieOptions, maxAge: 60 * 60 });
      response.cookies.set('refreshToken', newRefreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 14,
      });

      return response;
    } catch (error) {
      const loginUrl = new URL('/login', request.url);
      const response = NextResponse.redirect(loginUrl);

      // 쿠키 삭제
      const deleteOptions = { path: '/', maxAge: 0 };
      response.cookies.set('accessToken', '', deleteOptions);
      response.cookies.set('refreshToken', '', deleteOptions);
      return response;
    }
  }

  // 비로그인 상태에서 보호된 경로 접근 → /login 리다이렉트
  if (!isPublic && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인 상태에서 /login 접근 → /recruitment 리다이렉트
  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL('/recruitment', request.url));
  }

  return NextResponse.next();
}

// 정적 자원(이미지, 폰트 등) 요청에는 실행되지 않도록 최적화
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf)$).*)',
  ],
};
