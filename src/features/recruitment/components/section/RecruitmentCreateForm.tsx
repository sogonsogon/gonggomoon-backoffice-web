'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAllCompanyList } from '@/features/company/queries';
import { useApproveRecruitmentRequest, useCreateRecruitment } from '@/features/recruitment/queries';
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
import { AlertTriangle, Info, PlusCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { JobType } from '@/features/recruitment/types';
import { JOB_TYPE_LABELS } from '@/features/recruitment/constants';
import { useRecruitmentCreateStore } from '@/features/recruitment/store';
import CompanyQuickRegisterModal from '@/features/company/components/ui/CompanyQuickRegisterModal';

export default function RecruitmentCreateForm() {
  const router = useRouter();
  const pendingSubmissionId = useRecruitmentCreateStore((s) => s.pendingSubmissionId);
  const pendingPlatformId = useRecruitmentCreateStore((s) => s.pendingPlatformId);
  const pendingUrl = useRecruitmentCreateStore((s) => s.pendingUrl);
  const clearPending = useRecruitmentCreateStore((s) => s.clearPending);

  const { mutate: create, isPending: isCreating } = useCreateRecruitment();
  const { mutate: approve, isPending: isApproving } = useApproveRecruitmentRequest();
  const isSubmitting = isCreating || isApproving;

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [companySearch, setCompanySearch] = useState('');
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(-1);
  const companyListboxId = 'company-listbox';
  const [postTitle, setPostTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<number | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [recruitmentUrl, setRecruitmentUrl] = useState(pendingUrl ?? '');
  const [description, setDescription] = useState('');
  const [newlyRegisteredCompanyName, setNewlyRegisteredCompanyName] = useState<string | null>(null);

  useEffect(() => {
    if (pendingSubmissionId === null) {
      clearPending();
      setRecruitmentUrl('');
    }
  }, []);

  const isFormValid =
    selectedCompanyId !== null &&
    postTitle.trim() !== '' &&
    experienceLevel !== null &&
    selectedJobType !== null &&
    description.trim() !== '';

  const {
    companies: allCompanies,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useAllCompanyList();

  useEffect(() => {
    if (newlyRegisteredCompanyName === null) return;
    const matched = allCompanies.find((c) => c.companyName === newlyRegisteredCompanyName);
    if (matched) {
      setSelectedCompanyId(matched.companyId);
      setNewlyRegisteredCompanyName(null);
    }
  }, [allCompanies, newlyRegisteredCompanyName]);
  const searchedCompanies = companySearch.trim()
    ? allCompanies.filter((c) =>
        c.companyName.toLowerCase().includes(companySearch.trim().toLowerCase()),
      )
    : [];

  const handleSubmit = () => {
    if (selectedCompanyId === null || selectedJobType === null || experienceLevel === null) return;

    const data = {
      companyId: selectedCompanyId,
      platformId: pendingSubmissionId !== null ? pendingPlatformId : null,
      title: postTitle.trim(),
      url: recruitmentUrl,
      jobType: selectedJobType,
      originalContent: description.trim(),
      experienceLevel,
      startDate: startDate ? `${startDate.replace(/\./g, '-')}T00:00:00Z` : null,
      dueDate: dueDate ? `${dueDate.replace(/\./g, '-')}T00:00:00Z` : null,
    };

    const callbacks = {
      onSuccess: () => {
        toast.success(
          pendingSubmissionId !== null
            ? '공고 등록 요청이 승인 되었습니다. AI 공고 분석이 시작되었습니다.'
            : 'AI 공고 분석이 시작되었습니다',
        );
        clearPending();
        router.push(
          pendingSubmissionId !== null ? '/recruitment?tab=requests' : '/recruitment?tab=analysis',
        );
      },
      onError: () => {
        toast.error(
          pendingSubmissionId !== null
            ? '공고 등록 요청 승인이 실패하였습니다'
            : '공고 등록에 실패하였습니다.',
        );
      },
    };

    if (pendingSubmissionId !== null) {
      approve({ submissionId: pendingSubmissionId, data }, callbacks);
    } else {
      create(data, callbacks);
    }
  };

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
              {/* Company Search */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-ds-grey-900">기업명 *</Label>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-primary"
                    onClick={() => setIsCompanyModalOpen(true)}
                  >
                    <PlusCircleIcon size={16} className="mr-1" />
                    기업 등록하기
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    role="combobox"
                    aria-expanded={showCompanyDropdown && companySearch.trim() !== ''}
                    aria-autocomplete="list"
                    aria-controls={companyListboxId}
                    aria-activedescendant={
                      activeCompanyIndex >= 0
                        ? `company-option-${searchedCompanies[activeCompanyIndex]?.companyId}`
                        : undefined
                    }
                    value={companySearch}
                    onChange={(e) => {
                      setCompanySearch(e.target.value);
                      setShowCompanyDropdown(true);
                      setActiveCompanyIndex(-1);
                      if (!e.target.value) setSelectedCompanyId(null);
                    }}
                    onFocus={() => {
                      if (companySearch.trim()) setShowCompanyDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowCompanyDropdown(false), 150)}
                    onKeyDown={(e) => {
                      if (!showCompanyDropdown || searchedCompanies.length === 0) return;
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setActiveCompanyIndex((i) => Math.min(i + 1, searchedCompanies.length - 1));
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setActiveCompanyIndex((i) => Math.max(i - 1, 0));
                      } else if (e.key === 'Enter' && activeCompanyIndex >= 0) {
                        e.preventDefault();
                        const company = searchedCompanies[activeCompanyIndex];
                        setSelectedCompanyId(company.companyId);
                        setCompanySearch(company.companyName);
                        setShowCompanyDropdown(false);
                        setActiveCompanyIndex(-1);
                      } else if (e.key === 'Escape') {
                        setShowCompanyDropdown(false);
                        setActiveCompanyIndex(-1);
                      }
                    }}
                    placeholder="기업명을 검색하세요"
                    className={`h-10 border-ds-grey-200 placeholder:text-ds-grey-400 ${selectedCompanyId !== null ? 'text-ds-grey-900' : ''}`}
                  />
                  {showCompanyDropdown && companySearch.trim() && (
                    <ul
                      id={companyListboxId}
                      role="listbox"
                      aria-label="기업 검색 결과"
                      className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-ds-grey-200 rounded-md shadow-md max-h-52 overflow-y-auto"
                    >
                      {isCompanyLoading && (
                        <li className="px-3 py-2 text-[13px] text-ds-grey-500" aria-live="polite">
                          검색 중...
                        </li>
                      )}
                      {isCompanyError && searchedCompanies.length === 0 && (
                        <li className="px-3 py-2 text-[13px] text-red-500" aria-live="assertive">
                          검색에 실패했습니다.
                        </li>
                      )}
                      {!isCompanyLoading && searchedCompanies.length === 0 && !isCompanyError && (
                        <li className="px-3 py-2 text-[13px] text-ds-grey-500" aria-live="polite">
                          검색 결과가 없습니다.
                        </li>
                      )}
                      {searchedCompanies.map((company, index) => (
                        <li
                          key={company.companyId}
                          id={`company-option-${company.companyId}`}
                          role="option"
                          aria-selected={selectedCompanyId === company.companyId}
                          className={`w-full text-left px-3 py-2 text-sm text-ds-grey-900 cursor-pointer hover:bg-ds-grey-50 ${activeCompanyIndex === index ? 'bg-ds-grey-50' : ''}`}
                          onMouseDown={() => {
                            setSelectedCompanyId(company.companyId);
                            setCompanySearch(company.companyName);
                            setShowCompanyDropdown(false);
                            setActiveCompanyIndex(-1);
                          }}
                        >
                          {company.companyName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
                    aria-pressed={selectedJobType === key}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            primaryEnabled={isFormValid && !isSubmitting}
            onPrimaryClick={handleSubmit}
            secondaryLabel="취소"
            onSecondaryClick={() => {
              clearPending();
              router.back();
            }}
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

      {isCompanyModalOpen && (
        <CompanyQuickRegisterModal
          onClose={() => setIsCompanyModalOpen(false)}
          onSuccess={(companyName) => {
            setCompanySearch(companyName);
            setNewlyRegisteredCompanyName(companyName);
          }}
        />
      )}
    </div>
  );
}

function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
}

const EXPERIENCE_OPTIONS = [
  { value: 0, label: '신입' },
  { value: 1, label: '1년 이상' },
  { value: 2, label: '2년 이상' },
  { value: 3, label: '3년 이상' },
  { value: 5, label: '5년 이상' },
  { value: 7, label: '7년 이상' },
  { value: 10, label: '10년 이상' },
];
