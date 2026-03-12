import { IndustryType } from '@/features/industry/types';

export type CompanyType =
  | 'LARGE_ENTERPRISE'
  | 'MID_SIZED_ENTERPRISE'
  | 'SMALL_MEDIUM_ENTERPRISE'
  | 'STARTUP';

export type GetCompanyListParams = {
  name?: string;
  industryTypeId?: number;
  companyType?: CompanyType;
  page?: number;
  size?: number;
};

export type CompanyListItem = {
  companyId: number;
  companyName: string;
  companyType: CompanyType;
  industryType: IndustryType;
  industryId: number;
  employeeCount: number;
  foundedYear: number;
};

export type CompanyList = CompanyListItem[];

export type GetCompanyListResponse = CompanyList;

export type CompanyDetail = {
  companyId: number;
  companyName: string;
  companyType: CompanyType;
  industryId: number;
  industryType: IndustryType;
  websiteUrl: string;
  foundedYear: number;
  address: string;
  employeeCount: number;
  description: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
};

export type GetCompanyDetailResponse = CompanyDetail;

export type CreateCompanyRequest = {
  companyName: string;
  industryId: number;
  companyType: CompanyType;
  employeeCount: number;
  address: string;
  foundedYear: number;
  websiteUrl: string;
  description: string;
};

export type UpdateCompanyRequest = {
  companyName: string;
  industryId: number;
  companyType: CompanyType;
  employeeCount: number;
  address: string;
  foundedYear: number;
  websiteUrl: string;
  description: string;
};
