import {
  queryOptions,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  createCompany,
  deleteCompany,
  getCompanyDetail,
  getCompanyList,
  updateCompany,
} from '@/features/company/actions';
import {
  CreateCompanyRequest,
  GetCompanyListParams,
  UpdateCompanyRequest,
} from '@/features/company/types';
import { ApiErrorResponse } from '@/shared/types/api';
import { isError } from 'util';

export const companyQueryKeys = {
  all: ['companyList'] as const,
  list: (params?: GetCompanyListParams) => [...companyQueryKeys.all, params] as const,
  detail: (companyId: number) => ['companyDetail', companyId] as const,
};

// 기업 목록 조회 query options
export const companyListQueryOptions = (params?: GetCompanyListParams) =>
  queryOptions({
    queryKey: companyQueryKeys.list(params),
    queryFn: async () => {
      const result = await getCompanyList(params);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
  });

// 기업 상세 조회 query options
export const companyDetailQueryOptions = (companyId: number) =>
  queryOptions({
    queryKey: companyQueryKeys.detail(companyId),
    queryFn: async () => {
      const result = await getCompanyDetail(companyId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
  });

// 기업 목록 조회 useQuery
export function useCompanyList(params?: GetCompanyListParams) {
  return useQuery({
    ...companyListQueryOptions(params),
    placeholderData: keepPreviousData,
  });
}

// 전체 기업 목록 조회 (모든 페이지 합산)
export function useAllCompanyList() {
  const {
    data: companies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...companyQueryKeys.all, 'allPages'] as const,
    queryFn: async () => {
      const firstResult = await getCompanyList({ page: 0 });
      if (!firstResult.success) {
        return Promise.reject(firstResult);
      }
      const firstPageData = firstResult.data;
      const totalPages = firstPageData.pageInfo?.totalPages ?? 1;
      let allContent = [...(firstPageData.content ?? [])];

      for (let page = 1; page < totalPages; page += 1) {
        const result = await getCompanyList({ page });
        if (!result.success) {
          return Promise.reject(result);
        }
        allContent = allContent.concat(result.data.content ?? []);
      }
      return allContent;
    },
  });
  return { companies: companies ?? [], isLoading, isError };
}

// 기업 상세 조회 useQuery
export function useCompanyDetail(companyId: number | undefined) {
  return useQuery({
    ...companyDetailQueryOptions(companyId ?? 0),
    enabled: companyId !== undefined && Number.isFinite(companyId) && companyId > 0,
  });
}

// 기업 등록 useMutation
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCompanyRequest) => {
      const result = await createCompany(data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('기업 등록 실패:', error);
    },
  });
}

// 기업 수정 useMutation
export function useUpdateCompany(companyId: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCompanyRequest) => {
      if (companyId === undefined) return Promise.reject(new Error('companyId가 없습니다.'));
      const result = await updateCompany(companyId, data);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      if (companyId !== undefined) {
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.detail(companyId) });
      }
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('기업 수정 실패:', error);
    },
  });
}

// 기업 삭제 useMutation
export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (companyId: number) => {
      const result = await deleteCompany(companyId);
      if (!result.success) return Promise.reject(result);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    },
    onError: (error: ApiErrorResponse) => {
      console.error('기업 삭제 실패:', error);
    },
  });
}
