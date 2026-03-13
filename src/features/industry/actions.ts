'use server';

import { privateFetch } from '@/shared/api/httpClient';
import type {
  GetIndustryCategoryListResponse,
  GetIndustryAnalysisListResponse,
  GetIndustryAnalysisResponse,
  IndustryAnalysis,
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
export async function getIndustryAnalysis(analysisId: number) {
  return privateFetch<GetIndustryAnalysisResponse>(
    `/api/v1/admin/industries/reports/${analysisId}`,
  );
}

// 산업 분석 생성 — POST /api/v1/admin/industries/{id}/reports
export async function createIndustryAnalysis(
  industryId: number,
  data: CreateIndustryAnalysisRequest,
) {
  return privateFetch<IndustryAnalysis>(`/api/v1/admin/industries/${industryId}/reports`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 산업 분석 발행 — PATCH /api/v1/admin/industries/reports/{id}/publish
export async function publishIndustryAnalysis(analysisId: number) {
  return privateFetch<void>(`/api/v1/admin/industries/reports/${analysisId}/publish`, {
    method: 'PATCH',
  });
}

// 산업 분석 삭제 — DELETE /api/v1/admin/industries/reports/{id}
export async function deleteIndustryAnalysis(analysisId: number) {
  return privateFetch<void>(`/api/v1/admin/industries/reports/${analysisId}`, {
    method: 'DELETE',
  });
}
