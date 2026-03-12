'use server';

import { privateFetch } from '@/shared/api/httpClient';
import type {
  GetCompanyListParams,
  GetCompanyListResponse,
  GetCompanyDetailResponse,
  CompanyDetail,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from '@/features/company/types';

// 기업 목록 조회 — GET /api/v1/admin/companies
export async function getCompanyList(params?: GetCompanyListParams) {
  const searchParams = new URLSearchParams();
  if (params?.name) searchParams.set('name', params.name);
  if (params?.industryTypeId !== undefined) searchParams.set('industryTypeId', String(params.industryTypeId));
  if (params?.companyType) searchParams.set('companyType', params.companyType);
  if (params?.page !== undefined) searchParams.set('page', String(params.page));
  if (params?.size !== undefined) searchParams.set('size', String(params.size));

  const query = searchParams.toString();
  return privateFetch<GetCompanyListResponse>(`/api/v1/admin/companies${query ? `?${query}` : ''}`);
}

// 기업 상세 조회 — GET /api/v1/admin/companies/{id}
export async function getCompanyDetail(companyId: number) {
  return privateFetch<GetCompanyDetailResponse>(`/api/v1/admin/companies/${companyId}`);
}

// 기업 등록 — POST /api/v1/admin/companies
export async function createCompany(data: CreateCompanyRequest) {
  return privateFetch<CompanyDetail>('/api/v1/admin/companies', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 기업 수정 — PATCH /api/v1/admin/companies/{id}
export async function updateCompany(companyId: number, data: UpdateCompanyRequest) {
  return privateFetch<CompanyDetail>(`/api/v1/admin/companies/${companyId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// 기업 삭제 — DELETE /api/v1/admin/companies/{id}
export async function deleteCompany(companyId: number) {
  return privateFetch<void>(`/api/v1/admin/companies/${companyId}`, {
    method: 'DELETE',
  });
}
