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

// AnalysisStatus
export type IndustryAnalysisStatus = 'SAVED' | 'PUBLISHED';

// GET /api/v1/admin/industries/{id}/reports — 목록 아이템
export type IndustryAnalysisListItem = {
  analysisId: number;
  analysisYear: number;
  analysisStatus: IndustryAnalysisStatus;
  createdAt: string;
  updatedAt: string;
};

export type IndustryAnalysisList = IndustryAnalysisListItem[];

export type GetIndustryAnalysisListResponse = IndustryAnalysisList;

// GET /api/v1/admin/industries/reports/{id} — 단건
export type IndustryAnalysis = {
  analysisId: number;
  industryId: number;
  industryName: string;
  analysisYear: number;
  keyword: string[];
  marketSize: string;
  trend: string[];
  regulation: string[];
  competition: string;
  hiring: string[];
  investment: string[];
  analysisStatus: IndustryAnalysisStatus;
  createdAt: string;
  updatedAt: string;
};

export type GetIndustryAnalysisResponse = IndustryAnalysis;

// GET /api/v1/admin/industries — 카테고리 목록 아이템
export type IndustryCategory = {
  industryId: number;
  industryName: string;
  analysisCount?: number;
};

export type GetIndustryCategoryListResponse = {
  contents: IndustryCategory[];
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
  analysisYear: number;
  keyword: string[];
  marketSize: string;
  trend: string[];
  regulation: string[];
  competition: string;
  hiring: string[];
  investment: string[];
};
