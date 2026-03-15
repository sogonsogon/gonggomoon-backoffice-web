'use client';

import { useRecruitmentDetail } from '@/features/recruitment/queries';
import RecruitmentBasicInfo from '@/features/recruitment/components/section/RecruitmentBasicInfo';
import RecruitmentAnalysisInfo from '@/features/recruitment/components/section/RecruitmentAnalysisInfo';
import RecruitmentConfirmControls from '@/features/recruitment/components/section/RecruitmentConfirmControls';

interface RecruitmentConfirmSectionProps {
  postId: number;
}

export default function RecruitmentConfirmSection({ postId }: RecruitmentConfirmSectionProps) {
  const { data: detail } = useRecruitmentDetail(postId);

  return (
    <div className="flex gap-5 items-start">
      <RecruitmentBasicInfo item={detail} />
      <div className="flex-1 flex flex-col gap-3">
        <RecruitmentAnalysisInfo analysis={detail?.analysis} />
        <RecruitmentConfirmControls postId={postId} />
      </div>
    </div>
  );
}
