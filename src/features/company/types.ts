import { IndustryType } from '../industry/types';

export type CompanyType =
  | 'LARGE_ENTERPRISE'
  | 'MID_SIZED_ENTERPRISE'
  | 'SMALL_MEDIUM_ENTERPRISE'
  | 'STARTUP';

export type Company = {
  companyId?: number;
  companyName: string;
  companyType: CompanyType;
  industryId?: number;
  industryType: IndustryType; // 추후 제거 예정?
  websiteUrl?: string;
  foundedYear?: number;
  address?: string;
  employeeCount?: number;
  description?: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
};
