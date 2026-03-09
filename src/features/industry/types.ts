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

export type IndustryVersion = {
  versionId: number;
  industryId?: number;
  analyzedYear: number;
  keyword: string[];
  marketSize: string;
  trends: string[];
  regulation: string[];
  competition: string[];
  hiring: string[];
  investment: string[];
  status?: IndustryVersionStatus;
  createdAt?: string;
  editedAt?: string;
};

export type IndustryVersionStatus = 'SAVED' | 'PUBLISHED';

export type IndustryAnalysisListItem = {
  analysisId: number;
  analysisYear: number;
  analysisStatus: IndustryVersionStatus;
  createdAt: string;
  editedAt: string;
};

export type IndustryAnalysisList = IndustryAnalysisListItem[];

export type IndustryCategory = {
  industryCategoryId: number;
  industryCategoryName: string;
  analysisCount: number;
};

export type IndustryCategoryList = IndustryCategory[];

export type IndustryCategoryCreateRequest = {
  industryCategoryName: string;
};

export type IndustryCategoryUpdateRequest = {
  industryCategoryId: number;
  industryCategoryName: string;
};
