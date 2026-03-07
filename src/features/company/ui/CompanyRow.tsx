import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import type { Company } from '@/features/company/types';
import { COMPANY_TYPE_LABELS } from '@/features/company/constants';

interface CompanyRowProps {
  no: number;
  company: Company;
  industryName?: string;
  last?: boolean;
}

export default function CompanyRow({ no, company, industryName, last = false }: CompanyRowProps) {
  const companyTypeLabel = company.companyType ? COMPANY_TYPE_LABELS[company.companyType] : '-';

  return (
    <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}>
      <div className="w-14 px-3 text-[13px] text-ds-grey-600 shrink-0">{no}</div>
      <div className="flex-1 px-3 text-sm font-medium text-ds-grey-900">{company.companyName}</div>
      <div className="w-36 px-3 text-sm text-ds-grey-900">{industryName ?? '-'}</div>
      <div className="w-28 px-3">
        <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-ds-badge-blue-bg text-ds-badge-blue-text">
          {companyTypeLabel}
        </span>
      </div>
      <div className="w-28 px-3 text-[13px] text-ds-grey-700">
        {company.employeeCount != null ? `${company.employeeCount.toLocaleString()}명` : '-'}
      </div>
      <div className="w-24 px-3 text-[13px] text-ds-grey-700">{company.foundedYear ?? '-'}</div>
      <div className="w-48 px-3 flex items-center gap-1.5">
        <Button size="sm" variant="outline" className="text-ds-grey-700">
          상세보기
        </Button>
        <Button asChild size="sm" variant="outline" className="text-ds-grey-700">
          <Link href={`/company/edit/${company.companyId}`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
