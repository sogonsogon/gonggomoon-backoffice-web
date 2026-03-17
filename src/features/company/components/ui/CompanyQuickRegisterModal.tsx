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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { toast } from 'sonner';
import type { CompanyType } from '@/features/company/types';

interface CompanyQuickRegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (companyName: string) => void;
}

export default function CompanyQuickRegisterModal({
  open,
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
    companyName.trim() !== '' && selectedIndustryId !== null && selectedCompanyType !== null;

  const handleSubmit = () => {
    if (!isFormValid || selectedIndustryId === null || selectedCompanyType === null) return;

    const year = Number(foundedYear);

    const count = Number(employeeCount.replace(/\D/g, ''));

    createCompany(
      {
        name: companyName.trim(),
        industryId: selectedIndustryId,
        companyType: selectedCompanyType,
        foundedYear: year,
        employeeCount: count,
        address: address.trim(),
        websiteUrl: websiteUrl.trim(),
        description: description.trim(),
      },
      {
        onSuccess: () => {
          toast.success('기업이 등록되었습니다.');
          onSuccess?.(companyName.trim());
          onClose();
        },
        onError: () => {
          toast.error('기업 등록에 실패하였습니다.');
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>기업 등록</DialogTitle>
          <DialogDescription>필수 정보를 입력하여 기업을 빠르게 등록하세요.</DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}
