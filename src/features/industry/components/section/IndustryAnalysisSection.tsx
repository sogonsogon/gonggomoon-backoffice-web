'use client';

import ContentHeader from '@/shared/components/layout/ContentHeader';
import TopBar from '@/shared/components/layout/TopBar';
import AnalysisDetailActions from '@/features/industry/components/AnalysisDetailActions';
import IndustryAnalysisCard from '@/features/industry/components/section/IndustryAnalysisCard';
import IndustryStatusCard from '@/features/industry/components/section/IndustryStatusCard';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useIndustryAnalysis, useIndustryCategoryList } from '@/features/industry/queries';
import { formatDate } from '@/shared/lib/formatDate';

interface IndustryAnalysisSectionProps {
  industryId: number;
  analysisId: number;
}
export default function IndustryAnalysisSection({
  industryId,
  analysisId,
}: IndustryAnalysisSectionProps) {
  const { data: categoryList } = useIndustryCategoryList();
  const { data: analysis } = useIndustryAnalysis(analysisId);
  const label =
    categoryList?.find((category) => category.industryId === industryId)?.industryName || '산업군';
  const yearLabel = analysis?.reportYear ?? '-';

  const isValidIndustryId = Number.isFinite(industryId) && industryId > 0;
  const isValidAnalysisId = Number.isFinite(analysisId) && analysisId > 0;

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > ${yearLabel}년 분석`} />

      <main className="flex flex-1 flex-col gap-5 overflow-auto bg-ds-grey-100 p-6">
        <ContentHeader
          title={`${label} - ${yearLabel} 분석`}
          titleClassName="text-[30px]"
          description={`수정일: ${formatDate(analysis?.updatedAt)}`}
          descriptionClassName="pl-7"
          backHref={`/industry/${industryId}`}
          actionsAlign="start"
          actions={
            analysis && isValidIndustryId && isValidAnalysisId ? (
              <AnalysisDetailActions
                industryId={industryId}
                analysisId={analysisId}
                isPublished={analysis?.reportStatus === 'PUBLISHED'}
              />
            ) : null
          }
        />

        {analysis ? (
          <div className="flex items-start gap-4">
            <IndustryAnalysisCard analysis={analysis} />
            <IndustryStatusCard status={analysis.reportStatus} analyzedYear={analysis.reportYear} />
          </div>
        ) : (
          <Card className="border-ds-grey-200 bg-white py-10">
            <CardContent className="flex items-center justify-center">
              <p className="text-sm text-ds-grey-500">분석 정보를 찾을 수 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
