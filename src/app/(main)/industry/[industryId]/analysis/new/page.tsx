import AnalysisNewSection from '@/features/industry/components/section/AnalysisNewSection';

export default async function AnalysisNewPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  return <AnalysisNewSection industryId={industryId} />;
}
