'use client';

import { useState } from 'react';
import { useIndustryCategoryList } from '@/features/industry/queries';
import { useCreateCompany } from '@/features/company/queries';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';
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
import { toast } from 'sonner';
import type { CompanyType } from '@/features/company/types';

interface CompanyQuickRegisterModalProps {
  onClose: () => void;
  onSuccess?: (companyId: number, companyName: string) => void;
}

export default function CompanyQuickRegisterModal({
  onClose,
  onSuccess,
}: CompanyQuickRegisterModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [address, setAddress] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(null);
  const [selectedCompanyType, setSelectedCompanyType] = useState<CompanyType | null>(null);

  const { data: industries, isLoading: isIndustryLoading } = useIndustryCategoryList();
  const { mutate: createCompany, isPending } = useCreateCompany();

  const isFormValid =
    companyName.trim() !== '' &&
    foundedYear.trim() !== '' &&
    employeeCount.trim() !== '' &&
    selectedIndustryId !== null &&
    selectedCompanyType !== null;

  const handleSubmit = () => {
    if (!isFormValid || selectedIndustryId === null || selectedCompanyType === null) return;

    const year = Number(foundedYear);
    if (!Number.isInteger(year) || year < 1800 || year > new Date().getFullYear()) {
      toast.error('올바른 설립 연도를 입력하세요.');
      return;
    }

    const count = Number(employeeCount.replace(/\D/g, ''));

    createCompany(
      {
        companyName: companyName.trim(),
        industryId: selectedIndustryId,
        companyType: selectedCompanyType,
        foundedYear: year,
        employeeCount: count,
        address: address.trim(),
        websiteUrl: websiteUrl.trim(),
        description: description.trim(),
      },
      {
        onSuccess: (data) => {
          toast.success('기업이 등록되었습니다.');
          onSuccess?.(data.companyId, companyName.trim());
          onClose();
        },
        onError: () => {
          toast.error('기업 등록에 실패하였습니다.');
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55">
      <div className="bg-white rounded-xl p-7 w-[480px] flex flex-col gap-5 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[17px] font-semibold text-ds-grey-900">기업 등록</h2>
          <p className="text-[13px] text-ds-grey-500">
            필수 정보를 입력하여 기업을 빠르게 등록하세요.
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          {/* 기업명 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">기업명 *</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="기업명을 입력하세요"
              className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
            />
          </div>

          {/* 설립 연도 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">설립 연도 *</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={foundedYear}
              onChange={(e) => setFoundedYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="예) 2010"
              className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
            />
          </div>

          {/* 임직원 수 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">임직원 수 *</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value.replace(/\D/g, ''))}
              placeholder="예) 100"
              className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
            />
          </div>

          {/* 산업군 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">산업군 *</Label>
            <Select
              value={selectedIndustryId !== null ? String(selectedIndustryId) : ''}
              onValueChange={(val) => setSelectedIndustryId(Number(val))}
            >
              <SelectTrigger
                className={`h-10 border-ds-grey-200 w-full bg-white ${selectedIndustryId !== null ? 'text-ds-grey-900' : 'text-ds-grey-500'}`}
              >
                <SelectValue placeholder="산업군을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper">
                {isIndustryLoading && (
                  <SelectItem value="loading" disabled>
                    불러오는 중...
                  </SelectItem>
                )}
                {industries?.map((industry) => (
                  <SelectItem key={industry.industryId} value={String(industry.industryId)}>
                    {industry.industryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 기업 유형 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">기업 유형 *</Label>
            <Select
              value={selectedCompanyType ?? ''}
              onValueChange={(val) => setSelectedCompanyType(val as CompanyType)}
            >
              <SelectTrigger
                className={`h-10 border-ds-grey-200 w-full bg-white ${selectedCompanyType !== null ? 'text-ds-grey-900' : 'text-ds-grey-500'}`}
              >
                <SelectValue placeholder="기업 유형을 선택하세요" />
              </SelectTrigger>
              <SelectContent position="popper">
                {COMPANY_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 본사 주소 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">본사 주소</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="주소를 입력하세요"
              className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
            />
          </div>

          {/* 웹사이트 URL */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">웹사이트 URL</Label>
            <Input
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
            />
          </div>

          {/* 기업 소개 */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-ds-grey-900">기업 소개</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="기업 소개를 입력하세요"
              className="h-20 w-full resize-none rounded-md border border-ds-grey-200 bg-white p-3 text-[13px] text-ds-grey-900 placeholder:text-ds-grey-400 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="border-ds-grey-200 text-ds-grey-700"
          >
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid || isPending}>
            {isPending ? '등록 중...' : '저장'}
          </Button>
        </div>
      </div>
    </div>
  );
}
