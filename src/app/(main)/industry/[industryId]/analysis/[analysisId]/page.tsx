import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
  industryAnalysisQueryOptions,
  industryCategoryListQueryOptions,
} from '@/features/industry/queries';
import IndustryAnalysisSection from '@/features/industry/components/section/IndustryAnalysisSection';

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ industryId: string; analysisId: string }>;
}) {
  const { industryId, analysisId } = await params;
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(industryCategoryListQueryOptions),
    queryClient.prefetchQuery(industryAnalysisQueryOptions(Number(analysisId))),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <IndustryAnalysisSection industryId={Number(industryId)} analysisId={Number(analysisId)} />
      </HydrationBoundary>
    </>
  );
}
