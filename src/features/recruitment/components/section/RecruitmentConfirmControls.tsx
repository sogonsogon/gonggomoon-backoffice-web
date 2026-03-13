'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CardActionForm from '@/shared/components/ui/CardActionForm';
import { usePublishRecruitment, useDeleteRecruitment } from '@/features/recruitment/queries';
import type { ApiErrorResponse } from '@/shared/types/api';

interface RecruitmentConfirmControlsProps {
  postId: number;
}

export default function RecruitmentConfirmControls({ postId }: RecruitmentConfirmControlsProps) {
  const router = useRouter();
  const { mutate: publish, isPending: isPublishing } = usePublishRecruitment(postId);
  const { mutate: deleteRecruitment, isPending: isDeleting } = useDeleteRecruitment();

  const handlePublish = () => {
    publish(undefined, {
      onSuccess: () => {
        toast.success('공고가 발행되었습니다.');
        router.push('/recruitment');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '공고 발행에 실패했습니다.');
      },
    });
  };

  const handleDelete = () => {
    deleteRecruitment(postId, {
      onSuccess: () => {
        toast.success('공고가 삭제되었습니다.');
        router.push('/recruitment');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '공고 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <CardActionForm
      primaryLabel="발행"
      onPrimaryClick={handlePublish}
      primaryEnabled={!isPublishing && !isDeleting}
      secondaryLabel="삭제"
      secondaryButtonClassName="text-ds-badge-red-text"
      onSecondaryClick={handleDelete}
    />
  );
}
