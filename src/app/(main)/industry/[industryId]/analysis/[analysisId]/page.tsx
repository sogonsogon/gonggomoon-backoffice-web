import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/queryClient';
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
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(industryCategoryListQueryOptions),
    queryClient.prefetchQuery(industryAnalysisQueryOptions(Number(analysisId))),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <IndustryAnalysisSection industryId={Number(industryId)} reportId={Number(analysisId)} />
      </HydrationBoundary>
    </>
  );
}
