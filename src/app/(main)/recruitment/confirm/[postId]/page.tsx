import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import RecruitmentConfirmSection from '@/features/recruitment/components/section/RecruitmentConfirmSection';
import { recruitmentDetailQueryOptions } from '@/features/recruitment/queries';

export default async function RecruitmentReviewPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const parsedPostId = Number(postId);

  if (!Number.isInteger(parsedPostId) || parsedPostId <= 0) {
    notFound();
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(recruitmentDetailQueryOptions(parsedPostId));

  return (
    <>
      <TopBar title="공고 관리" breadcrumb="공고 관리 > 공고 등록 > AI 분석 검토" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader
          title="AI 분석 검토"
          description="AI가 생성한 분석 결과를 검토하고 공고를 발행합니다"
          backHref="/recruitment?tab=analysis"
        />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <RecruitmentConfirmSection postId={parsedPostId} />
        </HydrationBoundary>
      </main>
    </>
  );
}
