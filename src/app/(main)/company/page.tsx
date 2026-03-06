import Link from 'next/link';
import { Search } from 'lucide-react';
import { TopBar } from '@/shared/components/layout/TopBar';
import { ContentHeader } from '@/shared/components/layout/contentHeader';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { mockCompanies, mockIndustries } from '@/mocks';
import type { Company, CompanyType } from '@/features/company/types';

const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  LARGE_ENTERPRISE: '대기업',
  MID_SIZED_ENTERPRISE: '중견기업',
  SMALL_MEDIUM_ENTERPRISE: '중소기업',
  STARTUP: '스타트업',
};

export default function CompanyPage() {
  return (
    <>
      <TopBar title="기업 관리" breadcrumb="등록된 기업 정보를 관리합니다" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-5">
        <ContentHeader
          title="기업 목록"
          description="등록된 기업 정보를 관리합니다"
          actions={
            <Button asChild>
              <Link href="/company/create">+ 기업 등록</Link>
            </Button>
          }
        />

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-grey-400"
            />
            <Input
              type="text"
              placeholder="기업명을 검색..."
              className="h-10 w-70 border-ds-grey-200 bg-white pl-9 placeholder:text-ds-grey-400"
            />
          </div>
          <Select defaultValue="all-industries">
            <SelectTrigger className="h-10 w-40 border-ds-grey-200 bg-white text-ds-grey-600">
              <SelectValue placeholder="산업군 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-industries">산업군 전체</SelectItem>
              {mockIndustries.map((item) => (
                <SelectItem key={item.industryId} value={item.industryId.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all-company-types">
            <SelectTrigger className="h-10 w-40 border-ds-grey-200 bg-white text-ds-grey-600">
              <SelectValue placeholder="기업 유형 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-company-types">기업 유형 전체</SelectItem>
              {(Object.entries(COMPANY_TYPE_LABELS) as [CompanyType, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[10px] border border-ds-grey-200 overflow-hidden">
          {/* Header Row */}
          <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
            <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">번호</div>
            <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">기업명</div>
            <div className="w-36 px-3 text-[13px] font-medium text-ds-grey-600">사업 분야</div>
            <div className="w-28 px-3 text-[13px] font-medium text-ds-grey-600">기업 유형</div>
            <div className="w-28 px-3 text-[13px] font-medium text-ds-grey-600">임직원 수</div>
            <div className="w-24 px-3 text-[13px] font-medium text-ds-grey-600">설립연도</div>
            <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600">액션</div>
          </div>

          {/* Data Rows */}
          {mockCompanies.map((company, i) => {
            const industryName = mockIndustries.find(
              (ind) => ind.industryId === company.industryId,
            )?.name;
            return (
              <CompanyRow
                key={company.companyId}
                no={i + 1}
                company={company}
                industryName={industryName}
                last={i === mockCompanies.length - 1}
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
      </main>
    </>
  );
}

function CompanyRow({
  no,
  company,
  industryName,
  last = false,
}: {
  no: number;
  company: Company;
  industryName?: string;
  last?: boolean;
}) {
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
        <Button size="xs" variant="outline" className="text-ds-grey-700">
          상세보기
        </Button>
        <Button asChild size="xs" variant="outline" className="text-ds-grey-700">
          <Link href={`/company/edit/${company.companyId}`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
