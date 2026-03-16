'use server';

import { privateFetch } from '@/shared/api/httpClient';
import type {
  GetIndustryCategoryListResponse,
  GetIndustryAnalysisListResponse,
  GetIndustryAnalysisResponse,
  CreateIndustryCategoryRequest,
  UpdateIndustryCategoryRequest,
  CreateIndustryAnalysisRequest,
} from '@/features/industry/types';

// 산업 카테고리 목록 조회 — GET /api/v1/admin/industries
export async function getIndustryCategoryList() {
  return privateFetch<GetIndustryCategoryListResponse>('/api/v1/admin/industries');
}

// 산업 카테고리 생성 — POST /api/v1/admin/industries
export async function createIndustryCategory(data: CreateIndustryCategoryRequest) {
  return privateFetch<null>('/api/v1/admin/industries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 산업 카테고리 삭제 — DELETE /api/v1/admin/industries/{id}
export async function deleteIndustryCategory(industryId: number) {
  return privateFetch<null>(`/api/v1/admin/industries/${industryId}`, {
    method: 'DELETE',
  });
}

// 산업 카테고리 수정 — PATCH /api/v1/admin/industries/{id}
export async function updateIndustryCategory(
  industryId: number,
  data: UpdateIndustryCategoryRequest,
) {
  return privateFetch<null>(`/api/v1/admin/industries/${industryId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// 산업 분석 목록 조회 — GET /api/v1/admin/industries/{id}/reports
export async function getIndustryAnalysisList(industryId: number) {
  return privateFetch<GetIndustryAnalysisListResponse>(
    `/api/v1/admin/industries/${industryId}/reports`,
  );
}

// 산업 분석 단건 조회 — GET /api/v1/admin/industries/reports/{id}
export async function getIndustryAnalysis(reportId: number) {
  return privateFetch<GetIndustryAnalysisResponse>(
    `/api/v1/admin/industries/reports/${reportId}`,
  );
}

// 산업 분석 생성 — POST /api/v1/admin/industries/{id}/reports
export async function createIndustryAnalysis(
  industryId: number,
  data: CreateIndustryAnalysisRequest,
) {
  return privateFetch<null>(`/api/v1/admin/industries/${industryId}/reports`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 산업 분석 발행 — PATCH /api/v1/admin/industries/reports/{id}/publish
export async function publishIndustryAnalysis(reportId: number) {
  return privateFetch<void>(`/api/v1/admin/industries/reports/${reportId}/publish`, {
    method: 'PATCH',
  });
}

// 산업 분석 삭제 — DELETE /api/v1/admin/industries/reports/{id}
export async function deleteIndustryAnalysis(reportId: number) {
  return privateFetch<void>(`/api/v1/admin/industries/reports/${reportId}`, {
    method: 'DELETE',
  });
}
