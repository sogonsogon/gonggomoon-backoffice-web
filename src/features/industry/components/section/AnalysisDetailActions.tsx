'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { usePublishIndustryAnalysis, useDeleteIndustryAnalysis } from '@/features/industry/queries';

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
    publish(analysisId, { onSuccess: () => router.refresh() });
  };

  const handleDelete = () => {
    deleteAnalysis(analysisId, { onSuccess: () => router.push(`/industry/${industryId}`) });
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-ds-badge-red-text"
        disabled={isDeleting}
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
