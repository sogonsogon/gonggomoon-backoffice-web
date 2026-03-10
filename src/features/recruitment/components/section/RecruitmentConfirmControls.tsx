'use client';
import CardActionForm from '@/shared/components/ui/CardActionForm';

interface RecruitmentConfirmControlsProps {
  recruitmentId: number;
}

export default function RecruitmentConfirmControls({
  recruitmentId,
}: RecruitmentConfirmControlsProps) {
  return (
    <CardActionForm
      primaryLabel="발행"
      onPrimaryClick={() => {
        // TODO: publishRecruitment(recruitmentId) 호출
        void recruitmentId;
      }}
      secondaryLabel="삭제"
      secondaryButtonClassName="text-ds-badge-red-text"
      onSecondaryClick={() => {
        // TODO: deleteRecruitment(recruitmentId) 호출
        void recruitmentId;
      }}
    />
  );
}
