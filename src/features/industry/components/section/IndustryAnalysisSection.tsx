'use client';

import ContentHeader from '@/shared/components/layout/ContentHeader';
import TopBar from '@/shared/components/layout/TopBar';
import AnalysisDetailActions from '@/features/industry/components/section/AnalysisDetailActions';
import IndustryAnalysisCard from '@/features/industry/components/section/IndustryAnalysisCard';
import IndustryStatusCard from '@/features/industry/components/section/IndustryStatusCard';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useIndustryAnalysis, useIndustryCategoryList } from '@/features/industry/queries';
import { formatDate } from '@/shared/lib/formatDate';

interface IndustryAnalysisSectionProps {
  industryId: number;
  reportId: number;
}
export default function IndustryAnalysisSection({
  industryId,
  reportId,
}: IndustryAnalysisSectionProps) {
  const { data: categoryList } = useIndustryCategoryList();
  const { data: analysis } = useIndustryAnalysis(reportId);
  const label =
    categoryList?.find((category) => category.industryId === industryId)?.industryName || '산업군';
  const yearLabel = analysis?.reportYear ?? '-';

  const isValidIndustryId = Number.isFinite(industryId) && industryId > 0;
  const isValidReportId = Number.isFinite(reportId) && reportId > 0;

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > ${yearLabel}년 분석`} />

      <main className="flex flex-1 flex-col gap-6 overflow-auto bg-ds-grey-100 p-6">
        <ContentHeader
          title={`${label} - ${yearLabel} 분석`}
          titleClassName="text-2xl"
          description={`수정일: ${formatDate(analysis?.updatedAt)}`}
          descriptionClassName="pl-[26px]"
          backHref={`/industry/${industryId}`}
          actionsAlign="start"
          actions={
            analysis && isValidIndustryId && isValidReportId ? (
              <AnalysisDetailActions
                industryId={industryId}
                reportId={reportId}
                isPublished={analysis?.reportStatus === 'PUBLISHED'}
              />
            ) : null
          }
        />

        {analysis ? (
          <div className="flex items-start gap-6">
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
