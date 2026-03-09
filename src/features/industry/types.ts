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
  industryId: number;
  analyzedYear: number;
  keyword: string[];
  marketSize: string;
  industryTrends: string[];
  risk: string[];
  rival: string[];
  hiringTrends: string[];
  investmentStrategy: string[];
  status?: IndustryVersionStatus;
  createdAt?: string;
  editedAt?: string;
};

export type IndustryVersionStatus = 'SAVED' | 'PUBLISHED';
