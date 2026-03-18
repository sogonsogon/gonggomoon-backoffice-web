'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import { usePublishIndustryAnalysis, useDeleteIndustryAnalysis } from '@/features/industry/queries';
import { toast } from 'sonner';
import { ApiErrorResponse } from '@/shared/types/api';

interface AnalysisDetailActionsProps {
  industryId: number;
  reportId: number;
  isPublished: boolean;
}

export default function AnalysisDetailActions({
  industryId,
  reportId,
  isPublished,
}: AnalysisDetailActionsProps) {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { mutate: publish, isPending: isPublishing } = usePublishIndustryAnalysis(industryId);
  const { mutate: deleteAnalysis, isPending: isDeleting } = useDeleteIndustryAnalysis(industryId);

  const handlePublish = () => {
    publish(reportId, {
      onSuccess: () => {
        toast.success('산업 분석이 발행되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 발행에 실패했습니다.');
      },
    });
  };

  const handleDeleteConfirm = (id: number) => {
    deleteAnalysis(id, {
      onSuccess: () => {
        toast.success('산업 분석이 삭제되었습니다.');
        setIsDeleteConfirmOpen(false);
        router.back();
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 삭제에 실패했습니다.');
        setIsDeleteConfirmOpen(false);
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-ds-badge-red-text"
        disabled={isDeleting || isPublishing}
        onClick={() => setIsDeleteConfirmOpen(true)}
      >
        삭제
      </Button>
      <Button
        className="bg-ds-grey-900 text-white hover:bg-ds-grey-800"
        disabled={isPublished || isPublishing}
        onClick={handlePublish}
      >
        발행
      </Button>

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        id={reportId}
        onOpenChange={setIsDeleteConfirmOpen}
        title="산업 분석 삭제"
        description="정말 삭제하시겠습니까? 삭제된 분석은 복구할 수 없습니다."
        onConfirm={handleDeleteConfirm}
        isPending={isDeleting}
      />
    </>
  );
}
