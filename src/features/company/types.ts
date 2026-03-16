export type CompanyType =
  | 'LARGE_ENTERPRISE'
  | 'MID_SIZED_ENTERPRISE'
  | 'SMALL_MEDIUM_ENTERPRISE'
  | 'STARTUP';

export type GetCompanyListParams = {
  name?: string;
  industryId?: number;
  page?: number;
  size?: number;
};

export type CompanyListItem = {
  companyId: number;
  companyName: string;
  companyType: CompanyType;
  industryId: number;
  industryName: string;
  employeeCount: number;
  foundedYear: number;
};

export type CompanyList = CompanyListItem[];

export type PageInfo = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
};

export type GetCompanyListResponse = {
  content: CompanyList;
  size: number;
  pageInfo: PageInfo;
};

export type CompanyDetail = {
  companyId: number;
  name: string;
  companyType: CompanyType;
  industryId: number;
  industryName: string;
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
  name: string;
  industryId: number;
  companyType: CompanyType;
  employeeCount: number;
  address: string;
  foundedYear: number;
  websiteUrl: string;
  description: string;
};

export type UpdateCompanyRequest = {
  name: string;
  industryId: number;
  companyType: CompanyType;
  employeeCount: number;
  address: string;
  foundedYear: number;
  websiteUrl: string;
  description: string;
};

export type UpdateCompanyResponse = {
  companyId: number;
};
