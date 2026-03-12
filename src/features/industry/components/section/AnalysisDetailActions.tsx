'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { usePublishIndustryAnalysis, useDeleteIndustryAnalysis } from '@/features/industry/queries';
import { on } from 'events';
import { toast } from 'sonner';
import { ApiErrorResponse } from '@/shared/types/api';

interface AnalysisDetailActionsProps {
  industryId: number;
  analysisId: number;
  isPublished: boolean;
}

export default function AnalysisDetailActions({
  industryId,
  analysisId,
  isPublished,
}: AnalysisDetailActionsProps) {
  const router = useRouter();
  const { mutate: publish, isPending: isPublishing } = usePublishIndustryAnalysis(industryId);
  const { mutate: deleteAnalysis, isPending: isDeleting } = useDeleteIndustryAnalysis(industryId);

  const handlePublish = () => {
    publish(analysisId, {
      onSuccess: () => {
        toast.success('산업 분석이 발행되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 발행에 실패했습니다.');
      },
    });
  };

  const handleDelete = () => {
    deleteAnalysis(analysisId, {
      onSuccess: () => {
        toast.success('산업 분석이 삭제되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-ds-badge-red-text"
        disabled={isDeleting || isPublishing}
        onClick={handleDelete}
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
    </>
  );
}
