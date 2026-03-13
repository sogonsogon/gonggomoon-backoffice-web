import Link from 'next/link';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import TopBar from '@/shared/components/layout/TopBar';
import { Button } from '@/shared/components/ui/button';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import CompanyFilterToolbar from '@/features/company/components/section/CompanyFilterToolbar';
import CompanyTable from '@/features/company/components/section/CompanyTable';
import { Plus } from 'lucide-react';
import { companyListQueryOptions } from '@/features/company/queries';

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; industryId?: string; page?: string }>;
}) {
  const { search, industryId: rawIndustryId, page: rawPage } = await searchParams;

  const parsedIndustryId = Number(rawIndustryId);
  const parsedPage = Number(rawPage);

  const params = {
    name: search ?? undefined,
    industryId:
      rawIndustryId && rawIndustryId !== 'all' && Number.isFinite(parsedIndustryId) && parsedIndustryId > 0
        ? parsedIndustryId
        : undefined,
    page: Number.isFinite(parsedPage) && parsedPage >= 0 ? parsedPage : 0,
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(companyListQueryOptions(params));
  return (
    <>
      <TopBar title="기업 관리" breadcrumb="등록된 기업 정보를 관리합니다" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-5">
        <ContentHeader
          title="기업 목록"
          description="등록된 기업 정보를 관리합니다"
          actions={
            <Button asChild>
              <Link href="/company/create">
                <Plus />
                기업 등록
              </Link>
            </Button>
          }
        />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="pb-1">
            <CompanyFilterToolbar />
          </div>

          <CompanyTable params={params} />
        </HydrationBoundary>
      </main>
    </>
  );
}
