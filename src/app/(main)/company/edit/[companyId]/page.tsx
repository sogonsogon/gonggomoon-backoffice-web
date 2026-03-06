import Link from 'next/link';
import { Info } from 'lucide-react';
import { TopBar } from '@/shared/components/layout/TopBar';
import { ContentHeader } from '@/shared/components/layout/contentHeader';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { mockCompanies, mockIndustries } from '@/mocks';
import type { CompanyType } from '@/features/company/types';

const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  LARGE_ENTERPRISE: '대기업',
  MID_SIZED_ENTERPRISE: '중견기업',
  SMALL_MEDIUM_ENTERPRISE: '중소기업',
  STARTUP: '스타트업',
};

export default async function CompanyEditPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = mockCompanies.find((c) => c.companyId === Number(companyId));

  return (
    <>
      <TopBar title="기업 관리" breadcrumb="기업관리 > 기업 정보 수정" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
        <ContentHeader
          title="기업 정보 수정"
          description="기업 정보를 수정합니다"
          backHref="/company"
        />

        {/* Body Row */}
        <div className="flex gap-6 flex-1">
          {/* Form Col */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            {/* 기본 정보 Card */}
            <div className="bg-white rounded-[10px] border border-ds-grey-200 p-6 flex flex-col gap-5">
              <h2 className="text-[15px] font-semibold text-ds-grey-900">기본 정보</h2>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label className="text-ds-grey-900">기업명</Label>
                  <Input
                    type="text"
                    defaultValue={company?.companyName ?? ''}
                    className="h-10 border-ds-grey-200 text-ds-grey-900"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label className="text-ds-grey-900">설립 연도</Label>
                  <Input
                    type="text"
                    defaultValue={company?.foundedYear ?? ''}
                    className="h-10 border-ds-grey-200 text-ds-grey-900"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label className="text-ds-grey-900">산업군 선택</Label>
                  <Select defaultValue={company?.industryId?.toString() ?? 'none'}>
                    <SelectTrigger className="h-10 border-ds-grey-200 bg-white text-ds-grey-900">
                      <SelectValue placeholder="산업군 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">산업군 선택</SelectItem>
                      {mockIndustries.map((item) => (
                        <SelectItem key={item.industryId} value={item.industryId.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <Label className="text-ds-grey-900">기업 유형 선택</Label>
                  <Select defaultValue={company?.companyType ?? 'none'}>
                    <SelectTrigger className="h-10 border-ds-grey-200 bg-white text-ds-grey-900">
                      <SelectValue placeholder="유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">유형 선택</SelectItem>
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
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-ds-grey-900">임직원 수</Label>
                <Input
                  type="text"
                  defaultValue={company?.employeeCount ?? ''}
                  className="h-10 border-ds-grey-200 text-ds-grey-900"
                />
              </div>
            </div>

            {/* 추가 정보 Card */}
            <div className="bg-white rounded-[10px] border border-ds-grey-200 p-6 flex flex-col gap-5">
              <h2 className="text-[15px] font-semibold text-ds-grey-900">추가 정보</h2>

              <div className="flex flex-col gap-1.5">
                <Label className="text-ds-grey-900">웹사이트 URL</Label>
                <Input
                  type="text"
                  defaultValue={company?.websiteUrl ?? ''}
                  className="h-10 border-ds-grey-200 text-ds-grey-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-ds-grey-900">본사 주소</Label>
                <Input
                  type="text"
                  defaultValue={company?.address ?? ''}
                  className="h-10 border-ds-grey-200 text-ds-grey-900"
                />
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-80 shrink-0 flex flex-col gap-4">
            {/* Action Card */}
            <div className="bg-white rounded-[10px] border border-ds-grey-200 p-6 flex flex-col gap-4">
              <Button className="h-10 w-full bg-ds-grey-900 text-white hover:bg-ds-grey-800">저장</Button>
              <Button asChild variant="secondary" className="h-10 w-full bg-ds-grey-100 text-ds-grey-600 hover:bg-ds-grey-200">
                <Link href="/company">취소</Link>
              </Button>
            </div>

            {/* Guide Card */}
            <div className="bg-ds-grey-100 rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-ds-grey-900 shrink-0" />
                <span className="text-[13px] font-semibold text-ds-grey-900">등록 안내</span>
              </div>
              <div className="h-px bg-ds-grey-200" />
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-sm bg-ds-grey-500 mt-1.5 shrink-0" />
                  <p className="text-xs text-ds-grey-500 leading-relaxed">
                    기업명과 산업군은 필수 입력 항목입니다
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-sm bg-ds-grey-500 mt-1.5 shrink-0" />
                  <p className="text-xs text-ds-grey-500 leading-relaxed">
                    발행된 기업은 채용공고 등록 시 선택 가능합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
