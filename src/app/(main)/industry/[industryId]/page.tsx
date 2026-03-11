import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesAnalysis } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import IndustryBasicInfoCard from '@/features/industry/components/ui/IndustryBasicInfoCard';
import IndustryAnalysisTable from '@/features/industry/components/section/IndustryAnalysisTable';
import IndustryInfoSideCard from '@/features/industry/components/ui/IndustryInfoSideCard';

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';
  // TODO: 산업 분석 목록 조회 API 호출 위치 (/api/v1/admin/industries/{id}/reports)
  // TODO: 산업 분석 단일 리포트 수정/상세 조회 API (별도 수정 화면 진입 시 사용) (/api/v1/admin/industries/reports/{id})
  const analysis = mockIndustriesAnalysis.filter((v) => v.industryId === Number(industryId));
  const publishedAnalysis = analysis.find((v) => v.status === 'PUBLISHED');

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label}`} />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader
          title={label}
          backHref="/industry"
          actions={
            <Button variant="outline" className="text-ds-badge-red-text">
              산업 삭제
            </Button>
          }
        />

        <div className="flex gap-5 items-start">
          <div className="flex-1 flex flex-col gap-4">
            <IndustryBasicInfoCard label={label} />
            <IndustryAnalysisTable industryId={industryId} analysis={analysis} />
          </div>
          <IndustryInfoSideCard
            analysisCount={analysis.length}
            publishedAnalysis={publishedAnalysis}
          />
        </div>
      </main>
    </>
  );
}
