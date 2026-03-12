import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import IndustryAddButton from '@/features/industry/components/ui/IndustryAddButton';
import IndustryList from '@/features/industry/components/section/IndustryList';
import { industryCategoryListQueryOptions } from '@/features/industry/queries';

export default async function IndustryPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(industryCategoryListQueryOptions);

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb="산업 카테고리를 관리합니다" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
        <ContentHeader
          title="산업군 목록"
          actions={<IndustryAddButton />}
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <IndustryList />
        </HydrationBoundary>
      </main>
    </>
  );
}
