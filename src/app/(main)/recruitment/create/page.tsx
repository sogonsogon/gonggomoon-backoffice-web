import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import RecruitmentCreateForm from '@/features/recruitment/components/section/RecruitmentCreateForm';

export default async function RecruitmentCreatePage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const { url } = await searchParams;

  return (
    <>
      <TopBar title="공고 등록" breadcrumb="공고 관리 > 공고 등록 > 기본 정보 입력" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
        <ContentHeader
          title="공고 등록"
          description="기본 정보를 입력하고 AI 분석을 시작합니다"
          backHref="/recruitment"
        />

        <RecruitmentCreateForm defaultUrl={url} />
      </main>
    </>
  );
}
