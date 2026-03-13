import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveRecruitmentRequest,
  createRecruitment,
  deleteRecruitment,
  getRecruitmentDetail,
  getRecruitmentList,
  getRecruitmentRequestList,
  publishRecruitment,
  rejectRecruitmentRequest,
} from '@/features/recruitment/actions';
import type {
  CreateRecruitmentRequest,
  GetRecruitmentListParams,
  RecruitmentRequestListParams,
  RejectRecruitmentRequest,
} from '@/features/recruitment/types';
import type { ApiErrorResponse } from '@/shared/types/api';

export const recruitmentQueryKeys = {
  allSubmissions: ['recruitmentSubmissions'] as const,
  submissionList: (params?: RecruitmentRequestListParams) =>
    [...recruitmentQueryKeys.allSubmissions, params] as const,

  all: ['recruitmentList'] as const,
  list: (params?: GetRecruitmentListParams) => [...recruitmentQueryKeys.all, params] as const,
  detail: (postId: number) => ['recruitmentDetail', postId] as const,
};

// ============ 공고 게시 요청 (submissions) ============

// 공고 게시 요청 목록 조회 query options
export const recruitmentSubmissionListQueryOptions = (params?: RecruitmentRequestListParams) =>
  queryOptions({
    queryKey: recruitmentQueryKeys.submissionList(params),
    queryFn: async () => {
      const result = await getRecruitmentRequestList(params);
      if (!result.success) return Promise.reject(result);
      return result.data.contents;
    },
  });

// 공고 게시 요청 목록 조회 useQuery
export function useRecruitmentSubmissionList(params?: RecruitmentRequestListParams) {
  return useQuery(recruitmentSubmissionListQueryOptions(params));
}

// 공고 게시 요청 승인 useMutation
export function useApproveRecruitmentRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submissionId,
      data,
    }: {
      submissionId: number;
      data: CreateRecruitmentRequest;
    }) => {
      const result = await approveRecruitmentRequest(submissionId, data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.allSubmissions }),
        queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.all }),
      ]);
    },
    onError: (error: ApiErrorResponse) => {
      console.error('공고 게시 요청 승인 실패:', error);
    },
  });
}

// 공고 게시 요청 거절 useMutation
export function useRejectRecruitmentRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submissionId,
      data,
    }: {
      submissionId: number;
      data: RejectRecruitmentRequest;
    }) => {
      const result = await rejectRecruitmentRequest(submissionId, data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.allSubmissions });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('공고 게시 요청 거절 실패:', error);
    },
  });
}

// ============ 공고 (posts) ============

// 공고 목록 조회 query options
export const recruitmentListQueryOptions = (params?: GetRecruitmentListParams) =>
  queryOptions({
    queryKey: recruitmentQueryKeys.list(params),
    queryFn: async () => {
      const result = await getRecruitmentList(params);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
  });

// 공고 상세 조회 query options
export const recruitmentDetailQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: recruitmentQueryKeys.detail(postId),
    queryFn: async () => {
      const result = await getRecruitmentDetail(postId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
  });

// 공고 목록 조회 useQuery
export function useRecruitmentList(params?: GetRecruitmentListParams) {
  return useQuery(recruitmentListQueryOptions(params));
}

// 공고 상세 조회 useQuery
export function useRecruitmentDetail(postId: number | undefined) {
  return useQuery({
    ...recruitmentDetailQueryOptions(postId ?? 0),
    enabled: postId !== undefined && Number.isFinite(postId) && postId > 0,
  });
}

// 공고 등록 useMutation
export function useCreateRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRecruitmentRequest) => {
      const result = await createRecruitment(data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.all });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('공고 등록 실패:', error);
    },
  });
}

// 공고 발행 useMutation
export function usePublishRecruitment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await publishRecruitment(postId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.all });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('공고 발행 실패:', error);
    },
  });
}

// 공고 삭제 useMutation
export function useDeleteRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      const result = await deleteRecruitment(postId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentQueryKeys.all });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('공고 삭제 실패:', error);
    },
  });
}
