import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesAnalysis } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { formatDate } from '@/shared/lib/formatDate';
import IndustryAnalysisCard from '@/features/industry/components/section/IndustryAnalysisCard';
import IndustryStatusCard from '@/features/industry/components/section/IndutryStatusCard';

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ industryId: string; analysisId: string }>;
}) {
  const { industryId, analysisId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';
  // TODO : 산업 분석 단건 조회 API 호출 위치 (/api/v1/admin/industries/reports/{id})
  const analysis = mockIndustriesAnalysis.find((v) => v.analysisId === Number(analysisId));
  const yearLabel = analysis?.analysisYear ?? analysisId;

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > ${yearLabel}년 분석`} />

      <main className="flex flex-1 flex-col gap-5 overflow-auto bg-ds-grey-100 p-6">
        <ContentHeader
          title={`${label} - ${yearLabel} 분석`}
          titleClassName="text-[30px]"
          description={`수정일: ${formatDate(analysis?.updatedAt)}`}
          descriptionClassName="pl-7"
          backHref="/industry"
          actionsAlign="start"
          actions={
            <>
              {/* TODO: 산업 분석 수정 API 조회 위치 (/api/v1/admin/industries/reports/{id}) */}
              <Button variant="outline" className="text-ds-badge-red-text">
                삭제
              </Button>
              <Button className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">발행</Button>
            </>
          }
        />

        {analysis ? (
          <div className="flex items-start gap-4">
            <IndustryAnalysisCard analysis={analysis} />
            <IndustryStatusCard status={analysis.status} analyzedYear={analysis.analysisYear} />
          </div>
        ) : (
          <Card className="border-ds-grey-200 bg-white py-10">
            <CardContent className="flex items-center justify-center">
              <p className="text-sm text-ds-grey-500">버전 정보를 찾을 수 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
