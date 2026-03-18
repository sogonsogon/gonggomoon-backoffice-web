'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CardActionForm from '@/shared/components/ui/CardActionForm';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import { usePublishRecruitment, useDeleteRecruitment } from '@/features/recruitment/queries';
import type { ApiErrorResponse } from '@/shared/types/api';

interface RecruitmentConfirmControlsProps {
  postId: number;
}

export default function RecruitmentConfirmControls({ postId }: RecruitmentConfirmControlsProps) {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { mutate: publish, isPending: isPublishing } = usePublishRecruitment(postId);
  const { mutate: deleteRecruitment, isPending: isDeleting } = useDeleteRecruitment();

  const handlePublish = () => {
    if (isPublishing || isDeleting) {
      return;
    }
    publish(undefined, {
      onSuccess: () => {
        toast.success('공고가 발행되었습니다.');
        router.back();
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '공고 발행에 실패했습니다.');
      },
    });
  };

  const handleDeleteConfirm = (_id: number) => {
    deleteRecruitment(postId, {
      onSuccess: () => {
        toast.success('공고가 삭제되었습니다.');
        setIsDeleteConfirmOpen(false);
        router.push('/recruitment?tab=analysis');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '공고 삭제에 실패했습니다.');
        setIsDeleteConfirmOpen(false);
      },
    });
  };

  return (
    <>
      <CardActionForm
        primaryLabel="발행"
        onPrimaryClick={handlePublish}
        primaryEnabled={!isPublishing && !isDeleting}
        secondaryLabel="삭제"
        secondaryButtonClassName="text-ds-badge-red-text"
        onSecondaryClick={() => setIsDeleteConfirmOpen(true)}
      />

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        id={postId}
        onOpenChange={setIsDeleteConfirmOpen}
        title="공고 삭제"
        description="정말 삭제하시겠습니까? 삭제된 공고는 복구할 수 없습니다."
        onConfirm={handleDeleteConfirm}
        isPending={isDeleting}
      />
    </>
  );
}
