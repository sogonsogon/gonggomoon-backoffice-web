'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Info } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { StringListInput } from '@/shared/components/ui/string-list-input';
import type { IndustryVersion, IndustryVersionStatus } from '@/features/industry/types';

interface IndustryVersionFormProps {
  industryId: number;
  industryName: string;
  initialData?: Partial<IndustryVersion>;
  mode: 'create' | 'edit';
}

const STATUS_LABEL: Record<IndustryVersionStatus, string> = {
  PUBLISHED: '발행됨',
  SAVED: '저장됨',
};

const INITIAL_FORM: Omit<IndustryVersion, 'versionId' | 'industryId'> = {
  analyzedYear: new Date().getFullYear(),
  keyword: [],
  marketSize: '',
  industryTrends: [],
  risk: [],
  rival: [],
  hiringTrends: [],
  investmentStrategy: [],
  status: 'SAVED',
};

export function IndustryVersionForm({
  industryId,
  industryName,
  initialData,
  mode,
}: IndustryVersionFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    ...initialData,
  });

  const handleChange = (key: keyof typeof form, value: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    // TODO: createIndustryVersion / updateIndustryVersion server action 연결
    router.push(`/industry/${industryId}`);
  };

  const handlePublish = async () => {
    // TODO: publishIndustryVersion server action 연결
    router.push(`/industry/${industryId}`);
  };

  const handleDelete = async () => {
    // TODO: deleteIndustryVersion server action 연결
    router.push(`/industry/${industryId}`);
  };

  const isEdit = mode === 'edit';
  const status = form.status ?? 'SAVED';

  return (
    <div className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
      {/* 페이지 타이틀 */}
      <div className="flex flex-col gap-1">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 w-fit"
        >
          <ChevronLeft size={20} className="text-ds-grey-900" />
          <span className="text-xl font-bold text-ds-grey-900">
            {isEdit ? '버전 수정' : '새 버전 등록'}
          </span>
        </button>
        <p className="text-[13px] text-ds-grey-500">
          {isEdit
            ? `${industryName} > ${form.analyzedYear} 분석`
            : `${industryName}의 새 분석 버전을 등록합니다`}
        </p>
      </div>

      {/* 바디 */}
      <div className="flex gap-5">
        {/* 폼 영역 */}
        <div className="flex-1 flex flex-col gap-0">
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-5 flex flex-col gap-5">
            <p className="text-[15px] font-semibold text-ds-grey-900">분석 항목</p>
            <div className="h-px bg-ds-grey-200" />

            {/* 1행: 핵심 산업 키워드 + 산업 규모 */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>핵심 산업 키워드</Label>
                <StringListInput
                  value={form.keyword}
                  onChange={(val) => handleChange('keyword', val)}
                  placeholder="키워드 입력 후 Enter 또는 추가"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>산업 규모</Label>
                <Input
                  placeholder="예: 글로벌 시장 규모 약 6,500조원 (2025년 기준)"
                  value={form.marketSize}
                  onChange={(e) => handleChange('marketSize', e.target.value)}
                />
              </div>
            </div>

            {/* 산업 트렌드 */}
            <div className="flex flex-col gap-1.5">
              <Label>산업 트렌드</Label>
              <StringListInput
                value={form.industryTrends}
                onChange={(val) => handleChange('industryTrends', val)}
                placeholder="트렌드 항목 입력 후 Enter 또는 추가"
              />
            </div>

            {/* 2행: 규제 리스크 + 경쟁 구도 */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>규제 리스크</Label>
                <StringListInput
                  value={form.risk}
                  onChange={(val) => handleChange('risk', val)}
                  placeholder="규제/리스크 입력 후 Enter 또는 추가"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>경쟁 구도</Label>
                <StringListInput
                  value={form.rival}
                  onChange={(val) => handleChange('rival', val)}
                  placeholder="경쟁사 입력 후 Enter 또는 추가"
                />
              </div>
            </div>

            {/* 3행: 채용 트렌드 + 투자 방향 */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>채용 트렌드</Label>
                <StringListInput
                  value={form.hiringTrends}
                  onChange={(val) => handleChange('hiringTrends', val)}
                  placeholder="채용 트렌드 입력 후 Enter 또는 추가"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label>투자 방향</Label>
                <StringListInput
                  value={form.investmentStrategy}
                  onChange={(val) => handleChange('investmentStrategy', val)}
                  placeholder="투자 방향 입력 후 Enter 또는 추가"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 사이드 영역 */}
        <div className="w-[280px] flex flex-col gap-3 shrink-0">
          {/* 액션 카드 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-4 flex flex-col gap-3">
            <Button className="w-full" onClick={handlePublish}>
              발행
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSave}
            >
              저장
            </Button>
            {isEdit && (
              <Button
                variant="outline"
                className="w-full text-red-500 border-ds-grey-200 hover:text-red-600 hover:bg-red-50"
                onClick={handleDelete}
              >
                삭제
              </Button>
            )}
          </div>

          {/* 버전 상태 카드 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-4 flex flex-col gap-3">
            <p className="text-[14px] font-semibold text-ds-grey-900">버전 상태</p>
            <div className="h-px bg-ds-grey-200" />
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ds-grey-600">현재 상태</span>
              <span
                className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${
                  status === 'PUBLISHED'
                    ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
                    : 'bg-ds-grey-100 text-ds-grey-600'
                }`}
              >
                {STATUS_LABEL[status]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ds-grey-600">분석 연도</span>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  className="w-20 h-7 text-[13px] text-right px-2"
                  value={form.analyzedYear}
                  onChange={(e) => handleChange('analyzedYear', Number(e.target.value))}
                />
                <span className="text-[13px] text-ds-grey-700">년</span>
              </div>
            </div>
          </div>

          {/* 안내 카드 */}
          <div className="rounded-lg bg-ds-grey-50 border border-ds-grey-200 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info size={14} className="text-ds-grey-900" />
              <span className="text-[13px] font-semibold text-ds-grey-900">등록 안내</span>
            </div>
            <div className="h-px bg-ds-grey-200" />
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <div className="mt-[5px] h-1 w-1 rounded-full bg-ds-grey-500 shrink-0" />
                <p className="text-xs text-ds-grey-500">발행 시 사용자 화면에 노출됩니다.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-[5px] h-1 w-1 rounded-full bg-ds-grey-500 shrink-0" />
                <p className="text-xs text-ds-grey-500">기존 Published 버전은 자동으로 비활성화됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
