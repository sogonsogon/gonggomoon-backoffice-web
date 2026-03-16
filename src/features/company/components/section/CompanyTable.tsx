'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCompanyList } from '@/features/company/queries';
import CompanyRow from '@/features/company/components/ui/CompanyRow';
import type { GetCompanyListParams } from '@/features/company/types';

interface CompanyTableProps {
  params: GetCompanyListParams;
}

export default function CompanyTable({ params }: CompanyTableProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = params.page ?? 0;

  const { data, isLoading, isError, error } = useCompanyList(params);

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[10px] border border-ds-grey-200 overflow-hidden shrink-0">
        {headerRow}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 border-b border-ds-grey-200 animate-pulse bg-ds-grey-100" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-ds-grey-500">
        {error?.message || '기업 목록을 불러오지 못했습니다.'}
      </p>
    );
  }

  const { content: companies, pageInfo } = data;

  return (
    <div className="bg-white rounded-[10px] border border-ds-grey-200 overflow-hidden shrink-0">
      {headerRow}

      {companies.map((company, i) => (
        <CompanyRow
          key={company.companyId}
          no={page * 10 + i + 1}
          company={company}
          industryName={company.industryName}
          last={i === companies.length - 1}
        />
      ))}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        {Array.from({ length: pageInfo.totalPages ?? 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
              i === page ? 'bg-ds-grey-900 text-white' : 'text-ds-grey-600 hover:bg-ds-grey-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const headerRow = (
  <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
    <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
    <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">기업명</div>
    <div className="w-56 px-4 text-[13px] font-medium text-ds-grey-600">사업 분야</div>
    <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600">기업 유형</div>
    <div className="w-32 px-4 text-[13px] font-medium text-ds-grey-600">임직원 수</div>
    <div className="w-32 px-4 text-[13px] font-medium text-ds-grey-600">설립연도</div>
    <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600">액션</div>
  </div>
);
