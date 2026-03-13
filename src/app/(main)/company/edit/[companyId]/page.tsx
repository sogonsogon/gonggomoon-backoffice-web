import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/queryClient';
import TopBar from '@/shared/components/layout/TopBar';
import CompanyForm from '@/features/company/components/section/CompanyForm';
import { companyDetailQueryOptions } from '@/features/company/queries';

export default async function CompanyEditPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId: companyIdParam } = await params;
  const companyId = Number(companyIdParam);

  const queryClient = getQueryClient();
  if (Number.isFinite(companyId) && companyId > 0) {
    await queryClient.prefetchQuery(companyDetailQueryOptions(companyId));
  }

  return (
    <>
      <TopBar title="기업 관리" breadcrumb="기업관리 > 기업 정보 수정" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CompanyForm />
      </HydrationBoundary>
    </>
  );
}
