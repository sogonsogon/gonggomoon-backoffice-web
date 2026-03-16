import { ReissueResponse } from '@/features/auth/types';
import { publicFetch } from '@/shared/api/httpClient';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 1. 토큰 갱신 필요 여부 판별 (만료되었고, 리프레시 토큰은 존재하는 경우)
  const isTokenExpired = !accessToken;

  if (isTokenExpired && refreshToken) {
    try {
      // 2. 토큰 재발급 API 호출
      const refreshApiUrl = `${BASE_API_URL}/api/v1/admin/auth/reissue`;
      const result = await publicFetch<ReissueResponse>(refreshApiUrl, {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (result.success && result.data) {
        const newAccessToken = result.data.accessToken;
        const newRefreshToken = result.data.refreshToken;

        // 3. 서버 컴포넌트(Server Action)가 참조할 내부 Request 헤더 조작
        request.cookies.set('accessToken', newAccessToken);
        request.cookies.set('refreshToken', newRefreshToken);

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('Cookie', request.cookies.toString());

        // 4. 조작된 헤더를 포함하여 요청 통과
        const response = NextResponse.next({
          request: { headers: requestHeaders },
        });

        // 5. 브라우저에 저장될 Response 쿠키 세팅
        response.cookies.set('accessToken', newAccessToken, {
          maxAge: 60 * 60,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          path: '/',
        });
        response.cookies.set('refreshToken', newRefreshToken, {
          maxAge: 60 * 60 * 24 * 14,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          path: '/',
        });

        return response;
      }
    } catch (error) {
      // 갱신 실패 시 조작 없이 통과 (이후 httpClient가 401/SESSION_EXPIRED 반환)
    }
  }

  return NextResponse.next();
}

// 정적 자원(이미지, 폰트 등) 요청에는 실행되지 않도록 최적화
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
