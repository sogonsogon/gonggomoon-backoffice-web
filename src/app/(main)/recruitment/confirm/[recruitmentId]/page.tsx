import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import RecruitmentAnalysisInfo from '@/features/recruitment/components/section/RecruitmentAnalysisInfo';
import RecruitmentBasicInfo from '@/features/recruitment/components/section/RecruitmentBasicInfo';
import RecruitmentConfirmControls from '@/features/recruitment/components/section/RecruitmentConfirmControls';

export default async function RecruitmentReviewPage({
  params,
}: {
  params: Promise<{ recruitmentId: string }>;
}) {
  const { recruitmentId } = await params;
  // TODO: mockRecruitments.find → getRecruitment(recruitmentId) 로 교체
  const item = mockRecruitments.find((r) => r.recruitmentId === Number(recruitmentId));
  const analysis = item?.analysis;

  return (
    <>
      <TopBar title="공고 관리" breadcrumb="공고 관리 > 공고 등록 > AI 분석 검토" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader
          title="AI 분석 검토"
          description="AI가 생성한 분석 결과를 검토하고 공고를 발행합니다"
          showBack
        />

        <div className="flex gap-5 items-start">
          <RecruitmentBasicInfo item={item} />
          <div className="flex-1 flex flex-col gap-3">
            <RecruitmentAnalysisInfo analysis={analysis} />
            <RecruitmentConfirmControls recruitmentId={Number(recruitmentId)} />
          </div>
        </div>
      </main>
    </>
  );
}
