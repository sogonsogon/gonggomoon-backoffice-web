'use client';

import CardActionForm from '@/shared/components/ui/CardActionForm';

interface RecruitmentConfirmActionsProps {
  recruitmentId: number;
}

export default function RecruitmentConfirmActions({
  recruitmentId,
}: RecruitmentConfirmActionsProps) {
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
