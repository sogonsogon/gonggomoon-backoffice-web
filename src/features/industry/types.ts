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
  name: string;
  industryType?: IndustryType;
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
  analysisYear: string;
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
  status: IndustryAnalysisStatus;
  createdAt: string;
  updatedAt: string;
};

export type GetIndustryAnalysisResponse = IndustryAnalysis;

// GET /api/v1/admin/industries — 카테고리 목록 아이템
export type IndustryCategory = {
  industryId: number;
  industryName: string;
  analysisCount: number;
};

export type IndustryCategoryList = IndustryCategory[];

export type GetIndustryCategoryListResponse = IndustryCategoryList;

// POST /api/v1/admin/industries — 카테고리 생성
export type CreateIndustryCategoryRequest = {
  industryName: string;
};

// PATCH /api/v1/admin/industries/{id} — 카테고리 수정
export type UpdateIndustryCategoryRequest = {
  industryName: string;
};
