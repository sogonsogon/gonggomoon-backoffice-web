'use server';

import { privateFetch } from '@/shared/api/httpClient';
import type {
  RecruitmentRequestListParams,
  RecruitmentRequestListResponse,
  CreateRecruitmentRequest,
  RejectRecruitmentRequest,
  GetRecruitmentListParams,
  RecruitmentListResponse,
  RecruitmentDetail,
} from '@/features/recruitment/types';

// 공고 게시 요청 목록 조회 — GET /api/v1/admin/posts/submissions
export async function getRecruitmentRequestList(params?: RecruitmentRequestListParams) {
  const searchParams = new URLSearchParams();
  if (params?.submissionStatus) searchParams.set('submissionStatus', params.submissionStatus);

  const query = searchParams.toString();
  return privateFetch<RecruitmentRequestListResponse>(
    `/api/v1/admin/posts/submissions${query ? `?${query}` : ''}`,
  );
}

// 공고 게시 요청 승인 (AI 분석 대기) — POST /api/v1/admin/posts/submissions/{submissionId}/approve
export async function approveRecruitmentRequest(
  submissionId: number,
  data: CreateRecruitmentRequest,
) {
  return privateFetch<void>(`/api/v1/admin/posts/submissions/${submissionId}/approve`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 공고 게시 요청 거절 — PATCH /api/v1/admin/posts/submissions/{submissionId}/reject
export async function rejectRecruitmentRequest(
  submissionId: number,
  data: RejectRecruitmentRequest,
) {
  return privateFetch<void>(`/api/v1/admin/posts/submissions/${submissionId}/reject`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// 공고 등록 (AI 분석 대기) — POST /api/v1/admin/posts
export async function createRecruitment(data: CreateRecruitmentRequest) {
  return privateFetch<void>('/api/v1/admin/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 공고 목록 조회 — GET /api/v1/admin/posts
export async function getRecruitmentList(params?: GetRecruitmentListParams) {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.set('page', String(params.page));
  if (params?.size !== undefined) searchParams.set('size', String(params.size));
  if (params?.status) searchParams.set('status', params.status);
  if (params?.title) searchParams.set('title', params.title);

  const query = searchParams.toString();
  return privateFetch<RecruitmentListResponse>(`/api/v1/admin/posts${query ? `?${query}` : ''}`);
}

// 공고 분석 목록 조회 - GET /api/v1/admin/posts?statuses=ANALYZING,ANALYZED
export async function getRecruitmentAnalysisStatusList(params?: GetRecruitmentListParams) {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.set('page', String(params.page));
  if (params?.size !== undefined) searchParams.set('size', String(params.size));
  if (params?.title) searchParams.set('title', params.title);

  const query = searchParams.toString();
  const statusPart = params?.status
    ? `status=${params.status}`
    : `statuses=ANALYZING,ANALYZED,ANALYSIS_FAILED`;
  return privateFetch<RecruitmentListResponse>(
    `/api/v1/admin/posts?${statusPart}${query ? `&${query}` : ''}`,
  );
}

// 공고 상세 조회 — GET /api/v1/admin/posts/{postId}
export async function getRecruitmentDetail(postId: number) {
  return privateFetch<RecruitmentDetail>(`/api/v1/admin/posts/${postId}`);
}

// 공고 발행 — PATCH /api/v1/admin/posts/{postId}/publish
export async function publishRecruitment(postId: number) {
  return privateFetch<void>(`/api/v1/admin/posts/${postId}/publish`, {
    method: 'PATCH',
  });
}

// 공고 삭제 — DELETE /api/v1/admin/posts/{postId}
export async function deleteRecruitment(postId: number) {
  return privateFetch<void>(`/api/v1/admin/posts/${postId}`, {
    method: 'DELETE',
  });
}
