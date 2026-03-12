import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
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
  const queryClient = new QueryClient();
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
