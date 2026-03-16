'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import { useUpdateIndustryCategory, useDeleteIndustryCategory } from '@/features/industry/queries';
import { toast } from 'sonner';
import { ApiErrorResponse } from '@/shared/types/api';

interface IndustryBasicInfoCardProps {
  industryId: number;
  label: string;
}

export default function IndustryBasicInfoCard({ industryId, label }: IndustryBasicInfoCardProps) {
  const router = useRouter();
  const [industryName, setIndustryName] = useState(label);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: updateCategory, isPending } = useUpdateIndustryCategory(industryId);
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteIndustryCategory();

  const handleSave = () => {
    if (industryName.trim().length === 0) {
      toast.error('산업명은 공백일 수 없습니다.');

      return;
    }

    updateCategory(
      { industryName: industryName },
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

  const handleDeleteConfirm = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success('산업군이 삭제되었습니다.');
        setIsDeleteModalOpen(false);
        router.replace('/industry');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업군 삭제에 실패했습니다.');
        setIsDeleteModalOpen(false);
      },
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold text-ds-grey-900">기본 정보</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="text-ds-badge-red-text border-ds-grey-200"
              disabled={isPending || isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              산업 삭제
            </Button>
            <Button
              className="bg-ds-grey-900 text-white hover:bg-ds-grey-800"
              disabled={
                isPending ||
                isDeleting ||
                industryName.trim().length === 0 ||
                industryName.trim() === label.trim()
              }
              onClick={handleSave}
            >
              {isPending ? '저장 중...' : '이름 변경'}
            </Button>
          </div>
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

      <ConfirmDialog
        open={isDeleteModalOpen}
        id={industryId}
        onOpenChange={setIsDeleteModalOpen}
        title="산업군 삭제"
        description="정말 삭제하시겠습니까? 삭제된 산업군은 복구할 수 없습니다."
        onConfirm={() => handleDeleteConfirm(industryId)}
        isPending={isDeleting}
      />
    </>
  );
}
