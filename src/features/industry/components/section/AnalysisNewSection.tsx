'use client';

import TopBar from '@/shared/components/layout/TopBar';
import { useIndustryCategoryList } from '@/features/industry/queries';
import IndustryAnalysisNewForm from '@/features/industry/components/section/IndustryAnalysisNewForm';

interface AnalysisNewSectionProps {
  industryId: string;
}

export default function AnalysisNewSection({ industryId }: AnalysisNewSectionProps) {
  const { data: industries } = useIndustryCategoryList();
  const industry = industries?.find((item) => item.industryId === Number(industryId));
  const label = industry?.industryName ?? '산업군';

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > 버전 추가`} />
      <IndustryAnalysisNewForm industryId={industryId} />
    </>
  );
}
