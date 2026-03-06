import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import IndustryBasicInfoCard from '@/features/industry/ui/IndustryBasicInfoCard';
import IndustryVersionTable from '@/features/industry/layout/IndustryVersionTable';
import IndustryInfoSideCard from '@/features/industry/ui/IndustryInfoSideCard';

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';
  const versions = mockIndustriesVersion.filter((v) => v.industryId === Number(industryId));
  const publishedVersion = versions.find((v) => v.status === 'PUBLISHED');

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
            <IndustryVersionTable industryId={industryId} versions={versions} />
          </div>
          <IndustryInfoSideCard
            versionCount={versions.length}
            publishedVersion={publishedVersion}
          />
        </div>
      </main>
    </>
  );
}
