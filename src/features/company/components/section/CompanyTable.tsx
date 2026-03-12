'use client';

import { useSearchParams } from 'next/navigation';
import { useCompanyList } from '@/features/company/queries';
import CompanyRow from '@/features/company/components/ui/CompanyRow';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';
import { INDUSTRY_CONFIG } from '@/features/industry/constants';
import type { GetCompanyListParams, CompanyType } from '@/features/company/types';
import type { IndustryType } from '@/features/industry/types';

const validIndustryTypes = new Set<IndustryType>(Object.keys(INDUSTRY_CONFIG) as IndustryType[]);
const validCompanyTypes = new Set<CompanyType>(COMPANY_TYPE_OPTIONS.map((option) => option.value));

export default function CompanyTable() {
  const searchParams = useSearchParams();

  const rawIndustryType = searchParams.get('industryType');
  const rawCompanyType = searchParams.get('companyType');
  const industryType =
    rawIndustryType &&
    rawIndustryType !== 'all' &&
    validIndustryTypes.has(rawIndustryType as IndustryType)
      ? (rawIndustryType as IndustryType)
      : undefined;
  const companyType =
    rawCompanyType &&
    rawCompanyType !== 'all' &&
    validCompanyTypes.has(rawCompanyType as CompanyType)
      ? (rawCompanyType as CompanyType)
      : undefined;

  const params: GetCompanyListParams = {
    name: searchParams.get('search') ?? undefined,
    industryType,
    companyType,
  };

  const { data: companies, isLoading, isError, error } = useCompanyList(params);

  if (isLoading) {
    return (
      <div className="bg-white rounded-[10px] border border-ds-grey-200 overflow-hidden">
        {headerRow}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 border-b border-ds-grey-200 animate-pulse bg-ds-grey-100" />
        ))}
      </div>
    );
  }

  if (isError || !companies) {
    return (
      <p className="text-sm text-ds-grey-500">기업 목록을 불러오지 못했습니다. {error?.message}</p>
    );
  }

  return (
    <div className="bg-white rounded-[10px] border border-ds-grey-200 overflow-hidden">
      {headerRow}

      {companies.map((company, i) => {
        const industryName = INDUSTRY_CONFIG[company.industryType]?.label;
        return (
          <CompanyRow
            key={company.companyId}
            no={i + 1}
            company={company}
            industryName={industryName}
            last={i === companies.length - 1}
          />
        );
      })}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}

const headerRow = (
  <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
    <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
    <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">기업명</div>
    <div className="w-56 px-4 text-[13px] font-medium text-ds-grey-600">사업 분야</div>
    <div className="w-56 px-4 text-[13px] font-medium text-ds-grey-600">기업 유형</div>
    <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600">임직원 수</div>
    <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600">설립연도</div>
    <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600">액션</div>
  </div>
);
