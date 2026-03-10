'use client';

import { useState } from 'react';
import { mockCompanies } from '@/mocks';
import CardActionForm from '@/shared/components/ui/CardActionForm';
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
import { AlertTriangle, Info } from 'lucide-react';
import { JOB_TYPE_LABELS } from '@/features/recruitment/constants';
import type { JobType } from '@/features/recruitment/types';

const EXPERIENCE_OPTIONS = [
  { value: 0, label: '신입' },
  { value: 1, label: '1년 이상' },
  { value: 2, label: '2년 이상' },
  { value: 3, label: '3년 이상' },
  { value: 5, label: '5년 이상' },
  { value: 7, label: '7년 이상' },
  { value: 10, label: '10년 이상' },
];

interface RecruitmentCreateFormProps {
  defaultUrl?: string;
}

export default function RecruitmentCreateForm({ defaultUrl }: RecruitmentCreateFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<number | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [recruitmentUrl, setRecruitmentUrl] = useState(defaultUrl ?? '');
  const [postDescription, setPostDescription] = useState('');

  const isFormValid =
    companyName !== '' &&
    postTitle.trim() !== '' &&
    experienceLevel !== null &&
    selectedJobType !== null &&
    postDescription.trim() !== '';

  const companyNames = mockCompanies.map((company) => company.companyName);

  return (
    <div>
      {/* Body Row */}
      <div className="flex gap-4 flex-1">
        {/* Form Col */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* 기본 정보 Card */}
          <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[15px] font-semibold text-ds-grey-900">기본 정보 입력</h2>
              <p className="text-[13px] text-ds-grey-500">
                기업명, 공고 제목, 마감일, 원본 공고 URL을 입력하세요.
              </p>
            </div>

            {/* Row 1: 기업명 + 경력 */}
            <div className="flex gap-4">
              {/* Company Select */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-ds-grey-900">기업명 *</Label>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    기업 등록하기
                  </Button>
                </div>
                <Select
                  value={companyName || '__none__'}
                  onValueChange={(val) => setCompanyName(val === '__none__' ? '' : val)}
                >
                  <SelectTrigger
                    className={`h-10 border-ds-grey-200 w-full bg-white ${companyName ? 'text-ds-grey-900' : 'text-ds-grey-500'}`}
                  >
                    <SelectValue placeholder="기업을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="__none__">기업을 선택하세요</SelectItem>
                    {companyNames.map((name, index) => (
                      <SelectItem key={index} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 경력 Select */}
              <div className="flex-1 flex flex-col gap-1.5">
                <Label className="text-ds-grey-900">경력 *</Label>
                <Select
                  value={experienceLevel !== null ? String(experienceLevel) : 'none'}
                  onValueChange={(val) => setExperienceLevel(val === 'none' ? null : Number(val))}
                >
                  <SelectTrigger
                    className={`h-10 border-ds-grey-200 w-full bg-white ${experienceLevel !== null ? 'text-ds-grey-900' : 'text-ds-grey-500'}`}
                  >
                    <SelectValue placeholder="경력을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="none">경력을 선택하세요</SelectItem>
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 채용 기간 */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">채용 기간</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={startDate}
                  onChange={(e) => setStartDate(formatDateInput(e.target.value))}
                  placeholder="시작일 (YYYY.MM.DD)"
                  className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400 flex-1"
                />
                <span className="text-ds-grey-400 text-sm">~</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dueDate}
                  onChange={(e) => setDueDate(formatDateInput(e.target.value))}
                  placeholder="마감일 (YYYY.MM.DD)"
                  className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400 flex-1"
                />
              </div>
            </div>

            {/* 직무 */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">직무 *</Label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(JOB_TYPE_LABELS) as [JobType, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedJobType(key)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                      selectedJobType === key
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-ds-grey-700 border-ds-grey-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 공고 제목 */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">공고 제목 *</Label>
              <Input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="공고 제목을 입력하세요"
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-500"
              />
            </div>

            {/* 원본 공고 URL */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">원본 공고 URL</Label>
              <Input
                type="text"
                value={recruitmentUrl}
                onChange={(e) => setRecruitmentUrl(e.target.value)}
                placeholder="https://..."
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-500"
              />
            </div>

            {/* 공고 원문 */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">공고 원문 *</Label>
              <textarea
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                placeholder="공고 원문 전체를 붙여넣기 하세요. AI가 자동으로 요약 및 분석을 생성합니다."
                className="h-48 w-full resize-none rounded-md border border-ds-grey-200 bg-white p-3 text-[13px] text-ds-grey-900 leading-relaxed placeholder:text-ds-grey-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          {/* Action Card */}
          <CardActionForm
            primaryLabel="AI 분석 시작"
            primaryEnabled={isFormValid}
            onPrimaryClick={() => {
              // TODO: approveRecruitmentRequest(requestId) 호출
            }}
            secondaryLabel="취소"
          />

          {/* Guide Card */}
          <div className="bg-ds-btn-primary-weak rounded-lg border border-ds-blue-disabled p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Info size={16} className="text-primary shrink-0" />
              <span className="text-[13px] font-semibold text-primary">등록 절차 안내</span>
            </div>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              1. 기본 정보와 공고 원문을 입력합니다.
            </p>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              2. AI가 자동으로 요약 및 분석을 생성합니다.
            </p>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              3. 관리자가 AI 생성 내용을 검토합니다.
            </p>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              4. 검토 완료 후 공고가 게시됩니다.
            </p>
          </div>

          {/* Warning Card */}
          <div className="bg-ds-badge-yellow-bg rounded-lg border border-ds-badge-yellow-bg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-ds-badge-yellow-text shrink-0" />
              <span className="text-[13px] font-semibold text-ds-badge-yellow-text">주의 사항</span>
            </div>
            <p className="text-xs text-ds-grey-600 leading-relaxed">
              모든 필수 항목(*)을 입력해야 다음 단계로 진행할 수 있습니다.
            </p>
            <p className="text-xs text-ds-grey-600 leading-relaxed">
              AI 분석은 배치 작업으로 처리되며, 완료까지 시간이 소요될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
}
