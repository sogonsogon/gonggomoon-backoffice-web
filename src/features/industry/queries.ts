import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getIndustryCategoryList,
  createIndustryCategory,
  updateIndustryCategory,
  getIndustryAnalysisList,
  getIndustryAnalysis,
  createIndustryAnalysis,
  publishIndustryAnalysis,
  deleteIndustryAnalysis,
} from '@/features/industry/actions';
import type {
  CreateIndustryCategoryRequest,
  UpdateIndustryCategoryRequest,
  CreateIndustryAnalysisRequest,
} from '@/features/industry/types';

export const industryQueryKeys = {
  categoryList: ['industry', 'categories'] as const,
  analysisList: (industryId: number) => ['industry', industryId, 'analyses'] as const,
  analysis: (analysisId: number) => ['industry', 'analyses', analysisId] as const,
};

// 산업 카테고리 목록 조회 Query Options
export const industryCategoryListQueryOptions = {
  queryKey: industryQueryKeys.categoryList,
  queryFn: async () => {
    const result = await getIndustryCategoryList();
    if (!result.success) return Promise.reject(result);
    return result.data;
  },
};

// 산업 분석 목록 조회 Query Options
export const industryAnalysisListQueryOptions = (industryId: number) => ({
  queryKey: industryQueryKeys.analysisList(industryId),
  queryFn: async () => {
    const result = await getIndustryAnalysisList(industryId);
    if (!result.success) return Promise.reject(result);
    return result.data;
  },
});

// 산업 분석 단건 조회 Query Options
export const industryAnalysisQueryOptions = (analysisId: number) => ({
  queryKey: industryQueryKeys.analysis(analysisId),
  queryFn: async () => {
    const result = await getIndustryAnalysis(analysisId);
    if (!result.success) return Promise.reject(result);
    return result.data;
  },
});

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

// 산업 분석 단건 조회 useQuery
export function useIndustryAnalysis(analysisId: number) {
  return useQuery({
    ...industryAnalysisQueryOptions(analysisId),
    enabled: Number.isFinite(analysisId) && analysisId > 0,
  });
}

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
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.analysisList(industryId) });
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
    },
  });
}

// 산업 분석 발행 useMutation
export function usePublishIndustryAnalysis(industryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (analysisId: number) => {
      const result = await publishIndustryAnalysis(analysisId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: (_, analysisId) => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.analysisList(industryId) });
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.analysis(analysisId) });
    },
  });
}

// 산업 분석 삭제 useMutation
export function useDeleteIndustryAnalysis(industryId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (analysisId: number) => {
      const result = await deleteIndustryAnalysis(analysisId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.analysisList(industryId) });
      queryClient.invalidateQueries({ queryKey: industryQueryKeys.categoryList });
    },
  });
}
