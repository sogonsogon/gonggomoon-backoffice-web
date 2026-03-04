'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Info } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { mockIndustries} from '../../../../../gonggomoon-backoffice/src/mock/industry.mock';
import type { Company } from '@/features/company/types';

const COMPANY_TYPES = ['대기업', '중견기업', '중소기업', '스타트업', '공공기관'];

const INITIAL_FORM: Company = {
  companyName: '',
  companyId: 0,
  foundedYear: 0,
  industryId: 0,
  companyType: 'MIDDLE',
  employeeCount: 0,
  websiteUrl: '',
  address: '',
  description: '',
};

export function CompanyCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState<Company>(INITIAL_FORM);

  const handleChange = (key: keyof Company, value: string) => {
    if (key === 'foundedYear' || key === 'employeeCount') {
      setForm(prev => ({ ...prev, [key]: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async () => {
    // TODO: createCompany server action 연결
    router.push('/company');
  };

  return (
    <div className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
      {/* 페이지 타이틀 */}
      <div className="flex flex-col gap-1">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 w-fit"
        >
          <ChevronLeft size={20} className="text-ds-grey-900" />
          <span className="text-xl font-bold text-ds-grey-900">기업 정보 등록</span>
        </button>
        <p className="text-[13px] text-ds-grey-500">새로운 기업 정보를 등록합니다</p>
      </div>

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
                  onChange={e => handleChange('companyName', e.target.value)}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>설립 연도</Label>
                <Input
                  placeholder="예: 2010"
                  value={form.foundedYear}
                  onChange={e => handleChange('foundedYear', e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>산업군</Label>
                <Select onValueChange={v => handleChange('industryId', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="산업군 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockIndustries.map(item => (
                      <SelectItem key={item.industryId} value={item.industryId.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>기업 유형</Label>
                <Select onValueChange={v => handleChange('companyType', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="기업 유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_TYPES.map(t => (
                      <SelectItem key={t} value={t}>
                        {t}
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
                onChange={e => handleChange('employeeCount', e.target.value)}
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
                onChange={e => handleChange('websiteUrl', e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>본사 주소</Label>
              <Input
                placeholder="주소를 입력하세요"
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* 기업 소개 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-6 flex flex-col gap-4">
            <p className="text-[15px] font-semibold text-ds-grey-900">기업 소개</p>
            <div className="flex flex-col gap-1.5">
              <Label>기업 소개</Label>
              <textarea
                className="min-h-[120px] w-full rounded-md border border-ds-grey-200 bg-white px-3 py-2 text-sm text-ds-grey-900 placeholder:text-ds-grey-500 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="기업 소개 내용을 입력하세요..."
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 사이드 영역 */}
        <div className="w-80 flex flex-col gap-4 shrink-0">
          {/* 액션 카드 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-6 flex flex-col gap-4">
            <Button className="w-full" onClick={handleSubmit}>
              저장
            </Button>
            <Button
              variant="ghost"
              className="w-full bg-ds-grey-100 text-ds-grey-600 hover:bg-ds-grey-100"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </div>

          {/* 안내 카드 */}
          <div className="rounded-lg bg-ds-grey-50 border border-ds-grey-200 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-ds-grey-900" />
              <span className="text-[13px] font-semibold text-ds-grey-900">등록 안내</span>
            </div>
            <div className="h-px bg-ds-grey-200" />
            <div className="flex items-start gap-2">
              <div className="mt-[5px] h-1 w-1 rounded-full bg-ds-grey-500 shrink-0" />
              <p className="text-xs text-ds-grey-500">기업명과 산업군은 필수 입력 항목입니다</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-[5px] h-1 w-1 rounded-full bg-ds-grey-500 shrink-0" />
              <p className="text-xs text-ds-grey-500">발행된 기업은 채용공고 등록 시 선택 가능합니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
