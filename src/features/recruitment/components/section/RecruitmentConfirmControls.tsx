'use client';
import CardActionForm from '@/shared/components/ui/CardActionForm';

interface RecruitmentConfirmControlsProps {
  postId: number;
}

export default function RecruitmentConfirmControls({ postId }: RecruitmentConfirmControlsProps) {
  return (
    <CardActionForm
      primaryLabel="발행"
      onPrimaryClick={() => {
        // TODO: publishRecruitment(postId) 호출
        void postId;
      }}
      secondaryLabel="삭제"
      secondaryButtonClassName="text-ds-badge-red-text"
      onSecondaryClick={() => {
        // TODO: deleteRecruitment(postId) 호출
        void postId;
      }}
      secondaryUseBack
    />
  );
}
