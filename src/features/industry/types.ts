import { ElementType } from 'react';

export type IndustryType =
  | 'MEDIA_CONTENT'
  | 'COMMERCE'
  | 'FINTECH_FINANCIAL'
  | 'MOBILITY_LOGISTICS'
  | 'AI'
  | 'HEALTHCARE_BIO'
  | 'MANUFACTURING_INDUSTRY'
  | 'OTHER';

export type Industry = {
  industryId: number;
  industryName: string;
};

export type IndustryIconConfig = {
  icon: ElementType;
  iconColor: string;
  bgColor: string;
};

// ReportStatus
export type IndustryAnalysisStatus = 'PENDING' | 'PUBLISHED';
// GET /api/v1/admin/industries/{id}/reports — 목록 아이템
export type IndustryAnalysisListItem = {
  reportId: number;
  reportYear: number;
  reportStatus: IndustryAnalysisStatus;
  createdAt: string;
  updatedAt: string;
};

// GET /api/v1/admin/industries/{id}/reports — 응답 data
export type GetIndustryAnalysisListResponse = {
  industryId: number;
  industryName: string;
  content: IndustryAnalysisListItem[];
};

// GET /api/v1/admin/industries/reports/{id} — 단건
export type IndustryAnalysis = {
  reportId: number;
  industryId: number;
  industryName: string;
  reportYear: number;
  keyword: string[];
  marketSize: string;
  trend: string[];
  regulation: string[];
  competition: string;
  hiring: string[];
  investment: string[];
  reportStatus: IndustryAnalysisStatus;
  createdAt: string;
  updatedAt: string;
};

export type GetIndustryAnalysisResponse = IndustryAnalysis;

// GET /api/v1/admin/industries — 카테고리 목록 아이템
export type IndustryCategory = {
  industryId: number;
  industryName: string;
  reportCount: number;
};

export type GetIndustryCategoryListResponse = {
  content: IndustryCategory[];
};

// POST /api/v1/admin/industries — 카테고리 생성
export type CreateIndustryCategoryRequest = {
  name: string;
};

// PATCH /api/v1/admin/industries/{id} — 카테고리 수정
export type UpdateIndustryCategoryRequest = {
  name: string;
};

// POST /api/v1/admin/industries/{id}/reports — 산업 분석 생성
export type CreateIndustryAnalysisRequest = {
  reportYear: number;
  keyword: string[];
  marketSize: string;
  trend: string[];
  regulation: string[];
  competition: string;
  hiring: string[];
  investment: string[];
};
