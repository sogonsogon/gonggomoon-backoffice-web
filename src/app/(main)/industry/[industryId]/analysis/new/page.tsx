import TopBar from '@/shared/components/layout/TopBar';
import { mockIndustries } from '@/mocks';
import IndustryAnalysisNewForm from '@/features/industry/components/section/IndustryAnalysisNewForm';

export default async function AnalysisNewPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > 버전 추가`} />
      <IndustryAnalysisNewForm industryId={industryId} />
    </>
  );
}
