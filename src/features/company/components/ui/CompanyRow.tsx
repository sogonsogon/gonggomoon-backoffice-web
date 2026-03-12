import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import type { CompanyListItem } from '@/features/company/types';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';

interface CompanyRowProps {
  no: number;
  company: CompanyListItem;
  industryName?: string;
  last?: boolean;
}

export default function CompanyRow({ no, company, industryName, last = false }: CompanyRowProps) {
  const companyTypeLabel = company.companyType
    ? COMPANY_TYPE_OPTIONS.find((option) => option.value === company.companyType)?.label
    : '-';

  return (
    <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}>
      <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{no}</div>
      <div className="flex-1 px-4 text-sm font-medium text-ds-grey-900">{company.companyName}</div>
      <div className="w-56 px-4 text-sm text-ds-grey-900">{industryName ?? '-'}</div>
      <div className="w-56 px-4">
        <span className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-ds-badge-blue-bg text-ds-badge-blue-text">
          {companyTypeLabel}
        </span>
      </div>
      <div className="w-48 px-4 text-[13px] text-ds-grey-700">
        {company.employeeCount != null ? `${company.employeeCount.toLocaleString()}명` : '-'}
      </div>
      <div className="w-28 px-4 text-[13px] text-ds-grey-700">{company.foundedYear ?? '-'}</div>
      <div className="w-48 px-4 flex items-center gap-1.5">
        <Link
          href={`https://gonggomoon.com/company/${company.companyId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center justify-center rounded-md border border-ds-grey-200 bg-white px-4 text-sm font-medium text-ds-grey-700 no-underline visited:text-ds-grey-700 hover:bg-ds-grey-50"
        >
          상세보기
        </Link>
        <Button asChild size="sm" variant="outline" className="text-ds-grey-700">
          <Link href={`/company/edit/${company.companyId}`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
