'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useUpdateIndustryCategory } from '@/features/industry/queries';
import { toast } from 'sonner';
import { ApiErrorResponse } from '@/shared/types/api';

interface IndustryBasicInfoCardProps {
  industryId: number;
  label: string;
}

export default function IndustryBasicInfoCard({ industryId, label }: IndustryBasicInfoCardProps) {
  const [industryName, setIndustryName] = useState(label);
  const { mutate: updateCategory, isPending } = useUpdateIndustryCategory(industryId);
  const trimmedIndustryName = industryName.trim();

  const handleSave = () => {
    if (trimmedIndustryName.length === 0) {
      toast.error('산업명은 공백일 수 없습니다.');

      return;
    }

    updateCategory(
      { industryName: trimmedIndustryName },
      {
        onSuccess: () => {
          toast.success('산업군 정보가 업데이트되었습니다.');
        },
        onError: (error: ApiErrorResponse) => {
          toast.error(error.message || '산업군 정보 업데이트에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ds-grey-900">기본 정보</span>
        <Button
          className="bg-ds-grey-900 text-white hover:bg-ds-grey-800"
          disabled={
            isPending || trimmedIndustryName.length === 0 || trimmedIndustryName === label.trim()
          }
          onClick={handleSave}
        >
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </div>
      <div className="h-px bg-ds-grey-200" />
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-ds-grey-900">산업명 *</Label>
        <Input
          type="text"
          value={industryName}
          onChange={(e) => setIndustryName(e.target.value)}
          className="h-10 border-ds-grey-200 text-ds-grey-900"
        />
      </div>
    </div>
  );
}
