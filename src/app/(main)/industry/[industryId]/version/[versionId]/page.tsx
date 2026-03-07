import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { formatDate } from '@/shared/lib/formatDate';
import VersionAnalysisCard from '@/features/industry/section/VersionAnalysisCard';
import VersionStatusCard from '@/features/industry/section/VersionStatusCard';

export default async function VersionDetailPage({
  params,
}: {
  params: Promise<{ industryId: string; versionId: string }>;
}) {
  const { industryId, versionId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';
  const version = mockIndustriesVersion.find((v) => v.versionId === Number(versionId));
  const yearLabel = version?.analyzedYear ?? versionId;

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > ${yearLabel}년 분석`} />

      <main className="flex flex-1 flex-col gap-5 overflow-auto bg-ds-grey-100 p-6">
        <ContentHeader
          title={`${label} - ${yearLabel} 분석`}
          titleClassName="text-[30px]"
          description={`수정일: ${formatDate(version?.editedAt)}`}
          descriptionClassName="pl-7"
          backHref={`/industry/${industryId}`}
          actionsAlign="start"
          actions={
            <>
              <Button variant="outline" className="text-ds-badge-red-text">
                삭제
              </Button>
              <Button className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">발행</Button>
            </>
          }
        />

        {version ? (
          <div className="flex items-start gap-4">
            <VersionAnalysisCard version={version} />
            <VersionStatusCard status={version.status} analyzedYear={version.analyzedYear} />
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
