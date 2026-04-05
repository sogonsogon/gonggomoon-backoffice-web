import type {
  ApiResponse,
  ApiErrorResponse,
  ApiSuccessResponse,
  ApiErrorDetail,
} from '@/shared/types/api';
import {
  createFetchDebugInfo,
  fillResponseDebugInfo,
  logApiFailure,
  logConfigError,
  logRequestFailed,
  logRequestSuccess,
  logUnexpectedError,
  parseResponseBody,
} from '@/shared/api/httpClient.debug';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReissueResponse } from '@/features/auth/types';
const BASE_API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
// 로컬 테스트를 위한 14일 기간의 엑세스 토큰
const ACCESS_TOKEN = process.env.DEV_ACCESS_TOKEN;

/**
 * 내부 헬퍼 함수: 예상치 못한 시스템/네트워크 에러를 표준 실패 포맷으로 규격화
 */
function createErrorResponse(
  code: string,
  message: string,
  errors: ApiErrorDetail[] = [],
  timestamp: string = new Date().toISOString(),
): ApiErrorResponse {
  return {
    success: false,
    code,
    message,
    data: null,
    errors,
    timestamp,
  };
}

function createSuccessResponse<T>(
  data: T,
  code: string = 'SUCCESS',
  message: string = '요청에 성공했습니다.',
  timestamp: string = new Date().toISOString(),
): ApiSuccessResponse<T> {
  return {
    success: true,
    code,
    message,
    data,
    timestamp,
  };
}

async function requestApi<T>(
  endpoint: string,
  options: RequestInit = {},
  config?: {
    requireAuth?: boolean;
    accessToken?: string;
    sessionExpiredMessage?: string;
  },
): Promise<ApiResponse<T>> {
  const requireAuth = config?.requireAuth ?? false;
  const accessToken = config?.accessToken;
  const sessionExpiredMessage =
    config?.sessionExpiredMessage ?? '세션이 만료되었습니다. 다시 로그인해 주세요.';

  if (!BASE_API_URL && !endpoint.startsWith('http')) {
    logConfigError(endpoint, options);
    return createErrorResponse('CONFIG_ERROR', 'NEXT_PUBLIC_API_URL이 설정되지 않았습니다.');
  }

  if (requireAuth && !accessToken) {
    return createErrorResponse('SESSION_EXPIRED', '접근 권한이 없습니다. 다시 로그인해 주세요.');
  }

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const headers = new Headers(options.headers);

  if (requireAuth && accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  if (!isFormData) {
    if (!headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  } else {
    headers.delete('Content-Type');
  }

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_API_URL}${endpoint}`;
  const debugInfo = createFetchDebugInfo(url, options, headers, isFormData);

  try {
    const response = await fetch(url, {
      ...options,
      method: options.method || 'GET',
      headers,
    });

    fillResponseDebugInfo(debugInfo, response);

    const result = await parseResponseBody<T>(response, debugInfo);

    if (!response.ok) {
      logRequestFailed(debugInfo);

      return createErrorResponse(
        result.code || 'HTTP_ERROR',
        result.message || '요청 처리에 실패했습니다.',
        result.errors ?? [],
        result.timestamp,
      );
    }

    if (result.success === false) {
      logApiFailure(debugInfo, result.message);

      return createErrorResponse(
        result.code || 'HTTP_ERROR',
        result.message || '요청 처리에 실패했습니다.',
        result.errors ?? [],
        result.timestamp,
      );
    }

    logRequestSuccess(debugInfo);

    // success 필드가 있는 표준 포맷이면 data 필드를, 없으면 응답 전체를 data로 사용
    const data = result.success === true ? (result.data as T) : (result as T);

    return createSuccessResponse<T>(
      data,
      result.code ?? 'SUCCESS',
      result.message ?? '요청에 성공했습니다.',
      result.timestamp ?? new Date().toISOString(),
    );
  } catch (error) {
    logUnexpectedError(debugInfo, error);
    return createErrorResponse('NETWORK_ERROR', '서버와의 통신에 실패했습니다.');
  }
}

async function reissueAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) return null;

  const BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${BASE_URL}/api/v1/admin/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    if (!res.ok) return null;
    const body = await res.json() as { data: ReissueResponse };
    const newAccessToken = body?.data?.accessToken;
    const newRefreshToken = body?.data?.refreshToken;
    if (!newAccessToken || !newRefreshToken) return null;

    const isSecure = process.env.NODE_ENV === 'production';
    cookieStore.set('accessToken', newAccessToken, {
      maxAge: 60 * 60,
      httpOnly: true,
      secure: isSecure,
      sameSite: 'strict',
      path: '/',
    });
    cookieStore.set('refreshToken', newRefreshToken, {
      maxAge: 60 * 60 * 24 * 14,
      httpOnly: true,
      secure: isSecure,
      sameSite: 'strict',
      path: '/',
    });
    return newAccessToken;
  } catch (error) {
    console.error('[reissueAccessToken] 재발급 실패:', error);
    return null;
  }
}

/**
 * [Token O] 인증이 필요한 공통 Fetch
 * - 쿠키의 accessToken으로 요청
 * - TOKEN_EXPIRED 응답 시 refreshToken으로 재발급 후 1회 재시도
 * - 재발급 실패 시 쿠키 삭제 후 /login 리다이렉트
 */
export async function privateFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const result = await requestApi<T>(endpoint, options, {
    requireAuth: true,
    accessToken,
    sessionExpiredMessage: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  });

  if (!result.success && result.code === 'TOKEN_EXPIRED') {
    const newToken = await reissueAccessToken();
    if (!newToken) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      redirect('/login');
    }
    return requestApi<T>(endpoint, options, {
      requireAuth: true,
      accessToken: newToken,
      sessionExpiredMessage: '세션이 만료되었습니다. 다시 로그인해 주세요.',
    });
  }

  return result;
}

/**
 * [Token X] 인증이 필요 없는 공통 Fetch
 */
export async function publicFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  return requestApi<T>(endpoint, options, {
    requireAuth: false,
  });
}
