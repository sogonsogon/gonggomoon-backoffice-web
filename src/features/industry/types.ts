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

export type IndustryAnalysis = {
  analysisId: number;
  industryId?: number;
  analysisYear: number;
  keyword: string[];
  marketSize: string;
  trend: string[];
  regulation: string[];
  competition: string[];
  hiring: string[];
  investment: string[];
  status?: IndustryAnalysisStatus;
  createdAt?: string;
  editedAt?: string;
};

export type IndustryAnalysisStatus = 'SAVED' | 'PUBLISHED';

export type IndustryAnalysisListItem = {
  analysisId: number;
  analysisYear: number;
  analysisStatus: IndustryAnalysisStatus;
  createdAt: string;
  editedAt: string;
};

export type IndustryAnalysisList = IndustryAnalysisListItem[];

export type IndustryCategory = {
  industryId: number;
  industryName: string;
  analysisCount: number;
};

export type IndustryCategoryList = IndustryCategory[];

export type GetIndustryCategoryListResponse = IndustryCategoryList;

export type CreateIndustryCategoryRequest = {
  industryName: string;
};
export type UpdateIndustryCategoryRequest = {
  // TODO: industry`Id: number; 명세서 변경 확인 후 추가
  industryName: string;
};
