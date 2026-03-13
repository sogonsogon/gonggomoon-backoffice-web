import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/queryClient';
import {
  industryAnalysisListQueryOptions,
  industryCategoryListQueryOptions,
} from '@/features/industry/queries';
import IndustryDetailSection from '@/features/industry/components/section/IndustryDetailSection';

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(industryCategoryListQueryOptions),
    queryClient.prefetchQuery(industryAnalysisListQueryOptions(Number(industryId))),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <IndustryDetailSection industryId={Number(industryId)} />
      </HydrationBoundary>
    </>
  );
}
