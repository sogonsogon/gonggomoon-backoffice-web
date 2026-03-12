'use client';

import { useState } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { Info } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { mockIndustries, mockCompanies } from '@/mocks';
import type { CreateCompanyRequest } from '@/features/company/types';
import CardActionForm from '@/shared/components/ui/CardActionForm';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';

type CompanyFormState = CreateCompanyRequest;

const INITIAL_FORM: CompanyFormState = {
  companyName: '',
  companyType: 'LARGE_ENTERPRISE',
  industryId: 0,
  websiteUrl: '',
  foundedYear: 0,
  address: '',
  employeeCount: 0,
  description: '',
};

export default function CompanyForm() {
  const router = useRouter();
  const params = useParams<{ companyId?: string | string[] }>();
  const pathname = usePathname();

  const rawCompanyId = params.companyId;
  const companyIdParam = Array.isArray(rawCompanyId) ? rawCompanyId[0] : rawCompanyId;
  const parsedCompanyId = companyIdParam ? Number(companyIdParam) : undefined;
  const companyId =
    parsedCompanyId !== undefined && !Number.isNaN(parsedCompanyId) ? parsedCompanyId : undefined;
  const isEditMode = pathname.startsWith('/company/edit/') && companyId !== undefined;

  const company = isEditMode ? mockCompanies.find((c) => c.companyId === companyId) : undefined;

  const [form, setForm] = useState<CompanyFormState>({
    ...INITIAL_FORM,
    ...company,
    companyType: company?.companyType ?? INITIAL_FORM.companyType,
  });

  const isPrimaryEnabled =
    form.companyName.trim().length > 0 &&
    (form.foundedYear ?? 0) > 0 &&
    (form.industryId ?? 0) > 0 &&
    Boolean(form.companyType) &&
    (form.employeeCount ?? 0) > 0;

  const parseNumericInput = (value: string): number | undefined => {
    const digitsOnly = value.replace(/[^0-9]/g, '');

    if (!digitsOnly) {
      return undefined;
    }

    return Number(digitsOnly);
  };

  const handleChange = (key: keyof CompanyFormState, value: string) => {
    if (key === 'industryId') {
      setForm((prev) => ({ ...prev, industryId: Number(value) }));
      return;
    }

    if (key === 'foundedYear' || key === 'employeeCount') {
      setForm((prev) => ({ ...prev, [key]: parseNumericInput(value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (isEditMode && company !== undefined) {
      // TODO: updateCompany server action 연결
      // updateCompany 호출 시 companyId를 포함한 payload 전달
      await router.push('/company/edit/' + companyId);
      return;
    }

    // TODO: createCompany server action 연결
    // createCompany 호출 시 companyId를 제외한 payload 전달
    await router.push('/company/create');
  };

  return (
    <div className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
      <ContentHeader
        title={isEditMode ? '기업 정보 수정' : '기업 정보 등록'}
        description={isEditMode ? '기업 정보를 수정합니다' : '새로운 기업 정보를 등록합니다'}
        backHref="/company"
      />

      {/* 바디 */}
      <div className="flex gap-6">
        {/* 폼 영역 */}
        <div className="flex-1 flex flex-col gap-5">
          {/* 기본 정보 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-6 flex flex-col gap-5">
            <p className="text-[15px] font-semibold text-ds-grey-900">기본 정보</p>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>기업명</Label>
                <Input
                  placeholder="기업명을 입력하세요"
                  value={form.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>설립 연도</Label>
                <Input
                  placeholder="예: 2010"
                  value={form.foundedYear}
                  onChange={(e) => handleChange('foundedYear', e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>산업군</Label>
                <Select
                  value={form.industryId ? form.industryId.toString() : ''}
                  onValueChange={(v) => handleChange('industryId', v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="산업군 선택" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {mockIndustries.map((item) => (
                      <SelectItem key={item.industryId} value={item.industryId.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>기업 유형</Label>
                <Select
                  value={form.companyType ?? ''}
                  onValueChange={(v) => handleChange('companyType', v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="기업 유형 선택" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {COMPANY_TYPE_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>임직원 수</Label>
              <Input
                placeholder="예: 1,200"
                value={form.employeeCount}
                onChange={(e) => handleChange('employeeCount', e.target.value)}
              />
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-6 flex flex-col gap-5">
            <p className="text-[15px] font-semibold text-ds-grey-900">추가 정보</p>
            <div className="flex flex-col gap-1.5">
              <Label>웹사이트 URL</Label>
              <Input
                placeholder="https://example.com"
                value={form.websiteUrl}
                onChange={(e) => handleChange('websiteUrl', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>본사 주소</Label>
              <Input
                placeholder="주소를 입력하세요"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 사이드 영역 */}
        <div className="w-80 flex flex-col gap-4 shrink-0">
          {/* Action Card */}
          <CardActionForm
            primaryLabel={isEditMode ? '수정' : '저장'}
            onPrimaryClick={handleSubmit} //TODO : Create/Update API 연결
            primaryEnabled={isPrimaryEnabled}
            primaryButtonClassName="bg-black text-white"
            secondaryLabel="취소"
            onSecondaryClick={() => router.back()}
            secondaryButtonClassName="bg-ds-grey-200 text-ds-grey-500"
          />

          {/* 안내 카드 */}
          <div className="rounded-lg bg-ds-grey-50 border border-ds-grey-200 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-ds-grey-900" />
              <span className="text-[13px] font-semibold text-ds-grey-900">등록 안내</span>
            </div>
            <div className="h-px bg-ds-grey-200" />
            <div className="flex items-start gap-2">
              <div className="mt-1.5 h-1 w-1 rounded-full bg-ds-grey-500 shrink-0" />
              <p className="text-xs text-ds-grey-500">기업명과 산업군은 필수 입력 항목입니다</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1.5 h-1 w-1 rounded-full bg-ds-grey-500 shrink-0" />
              <p className="text-xs text-ds-grey-500">
                발행된 기업은 채용공고 등록 시 선택 가능합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
