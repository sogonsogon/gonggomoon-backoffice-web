'use client';

import TopBar from '@/shared/components/layout/TopBar';
import { useIndustryAnalysisList, useIndustryCategoryList } from '../../queries';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import IndustryBasicInfoCard from '@/features/industry/components/ui/IndustryBasicInfoCard';
import IndustryInfoSideCard from '@/features/industry/components/ui/IndustryInfoSideCard';
import IndustryAnalysisTable from '@/features/industry/components/section/IndustryAnalysisTable';

interface IndustryDetailSectionProps {
  industryId: number;
}
export default function IndustryDetailSection({ industryId }: IndustryDetailSectionProps) {
  const { data: categoryList } = useIndustryCategoryList();
  const { data: analysisList } = useIndustryAnalysisList(industryId);
  const label =
    categoryList?.find((category) => category.industryId === industryId)?.industryName || '산업군';
  const publishedAnalysisYear = analysisList?.find(
    (analysis) => analysis.analysisStatus === 'PUBLISHED',
  )?.analysisYear;

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label}`} />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader title={label} backHref="/industry" />

        <div className="flex gap-5 items-start">
          <div className="flex-1 flex flex-col gap-4">
            <IndustryBasicInfoCard industryId={industryId} label={label} />
            <IndustryAnalysisTable industryId={industryId} analysis={analysisList || []} />
          </div>
          <IndustryInfoSideCard
            analysisCount={analysisList?.length || 0}
            publishedAnalysisYear={publishedAnalysisYear}
          />
        </div>
      </main>
    </>
  );
}
