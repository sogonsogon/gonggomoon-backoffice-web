import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

const PUBLIC_PATHS = ['/login'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 비로그인 상태에서 보호된 경로 접근 → /login 리다이렉트
  if (!isPublic && !refreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인 상태에서 /login 접근 → /industry 리다이렉트
  if (isPublic && refreshToken) {
    return NextResponse.redirect(new URL('/industry', request.url));
  }

  // 1. 토큰 갱신 필요 여부 판별 (만료되었고, 리프레시 토큰은 존재하는 경우)
  const isTokenExpired = !accessToken;

  if (isTokenExpired && refreshToken) {
    try {
      // 2. 토큰 재발급 API 직접 호출 (Edge Runtime — next/headers 사용 불가)
      const reissueRes = await fetch(`${BASE_API_URL}/api/v1/admin/auth/reissue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (reissueRes.ok) {
        const body = await reissueRes.json();
        const newAccessToken: string = body?.data?.accessToken;
        const newRefreshToken: string = body?.data?.refreshToken;

        if (newAccessToken && newRefreshToken) {
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
          const isSecure = process.env.NODE_ENV === 'production';
          response.cookies.set('accessToken', newAccessToken, {
            maxAge: 60 * 60,
            httpOnly: true,
            secure: isSecure,
            sameSite: 'strict',
            path: '/',
          });
          response.cookies.set('refreshToken', newRefreshToken, {
            maxAge: 60 * 60 * 24 * 14,
            httpOnly: true,
            secure: isSecure,
            sameSite: 'strict',
            path: '/',
          });

          return response;
        }
      }
    } catch {
      // 네트워크 오류는 아래 리다이렉트 로직으로 fall-through
    }

    // 재발급 실패 → refreshToken 만료로 간주, 로그인 페이지로 리다이렉트
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete('accessToken');
    redirectResponse.cookies.delete('refreshToken');
    return redirectResponse;
  }

  return NextResponse.next();
}

// 정적 자원(이미지, 폰트 등) 요청에는 실행되지 않도록 최적화
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
