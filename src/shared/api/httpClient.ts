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

      if (response.status === 401) {
        return createErrorResponse(
          'SESSION_EXPIRED',
          sessionExpiredMessage,
          result.errors ?? [],
          result.timestamp,
        );
      }

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

/**
 * [Token O] 인증이 필요한 공통 Fetch
 * - 로그인 후 쿠키에 저장된 accessToken을 읽어 요청에 사용
 * - 쿠키가 없으면 SESSION_EXPIRED 반환
 * - 401이 발생하면 토큰이 만료된 상태이므로 세션 만료 에러를 반환
 *
 */
export async function privateFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return createErrorResponse('SESSION_EXPIRED', '접근 권한이 없습니다. 다시 로그인해 주세요.');
  }

  return requestApi<T>(endpoint, options, {
    requireAuth: true,
    accessToken,
    sessionExpiredMessage: '세션이 만료되었습니다. 다시 로그인해 주세요.',
  });
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
