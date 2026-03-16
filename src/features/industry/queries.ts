import { useQuery, useMutation, useQueryClient, queryOptions } from '@tanstack/react-query';
import {
  getIndustryCategoryList,
  getIndustryAnalysisList,
  getIndustryAnalysis,
  createIndustryCategory,
  updateIndustryCategory,
  deleteIndustryCategory,
  createIndustryAnalysis,
  publishIndustryAnalysis,
  deleteIndustryAnalysis,
} from '@/features/industry/actions';
import type {
  CreateIndustryCategoryRequest,
  UpdateIndustryCategoryRequest,
  CreateIndustryAnalysisRequest,
} from '@/features/industry/types';
import { ApiErrorResponse } from '@/shared/types/api';

export const industryQueryKeys = {
  categoryList: ['industry', 'categories'] as const,
  reportList: (industryId: number) => ['industry', industryId, 'reports'] as const,
  report: (reportId: number) => ['industry', 'reports', reportId] as const,
};

// 산업 카테고리 목록 조회 Query Options
export const industryCategoryListQueryOptions = queryOptions({
  queryKey: industryQueryKeys.categoryList,
  queryFn: async () => {
    const result = await getIndustryCategoryList();
    if (!result.success) return Promise.reject(result);
    return result.data.content;
  },
});

// 산업 분석 목록 조회 Query Options
export const industryAnalysisListQueryOptions = (industryId: number) =>
  queryOptions({
    queryKey: industryQueryKeys.reportList(industryId),
    queryFn: async () => {
      const result = await getIndustryAnalysisList(industryId);
      if (!result.success) return Promise.reject(result);
      return result.data.contents;
    },
  });

// 산업 분석 단건 조회 Query Options
export const industryAnalysisQueryOptions = (reportId: number) =>
  queryOptions({
    queryKey: industryQueryKeys.report(reportId),
    queryFn: async () => {
      const result = await getIndustryAnalysis(reportId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
  });

// 조회 useQuery 훅들

// 산업 카테고리 목록 조회 useQuery
export function useIndustryCategoryList() {
  return useQuery(industryCategoryListQueryOptions);
}

// 산업 분석 목록 조회 useQuery
export function useIndustryAnalysisList(industryId: number) {
  return useQuery({
    ...industryAnalysisListQueryOptions(industryId),
    enabled: Number.isFinite(industryId) && industryId > 0,
  });
}

// 산업 분석 단건 조회 useQuery (페이지 진입 시 Prefetch)
export function useIndustryAnalysis(reportId: number) {
  return useQuery({
    ...industryAnalysisQueryOptions(reportId),
    enabled: Number.isFinite(reportId) && reportId > 0,
  });
}

// 변이 useMutation 훅들

// 산업 카테고리 생성 useMutation
export function useCreateIndustryCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateIndustryCategoryRequest) => {
      const result = await createIndustryCategory(data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('산업 카테고리 생성 실패:', error);
    },
  });
}

// 산업 카테고리 수정 useMutation
export function useUpdateIndustryCategory(industryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateIndustryCategoryRequest) => {
      const result = await updateIndustryCategory(industryId, data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('산업 카테고리 수정 실패:', error);
    },
  });
}

// 산업 카테고리 삭제 useMutation
export function useDeleteIndustryCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (industryId: number) => {
      const result = await deleteIndustryCategory(industryId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('산업 카테고리 삭제 실패:', error);
    },
  });
}

// 산업 분석 생성 useMutation
export function useCreateIndustryAnalysis(industryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateIndustryAnalysisRequest) => {
      const result = await createIndustryAnalysis(industryId, data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.reportList(industryId) });
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('산업 분석 생성 실패:', error);
    },
  });
}

// 산업 분석 발행 useMutation
export function usePublishIndustryAnalysis(industryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportId: number) => {
      const result = await publishIndustryAnalysis(reportId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: (_, reportId) => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.reportList(industryId) });
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.report(reportId) });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('산업 분석 발행 실패:', error);
    },
  });
}

// 산업 분석 삭제 useMutation
export function useDeleteIndustryAnalysis(industryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reportId: number) => {
      const result = await deleteIndustryAnalysis(reportId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: (_, reportId) => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.reportList(industryId) });
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
      queryClient.removeQueries({ queryKey: industryQueryKeys.report(reportId) });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('산업 분석 삭제 실패:', error);
    },
  });
}
