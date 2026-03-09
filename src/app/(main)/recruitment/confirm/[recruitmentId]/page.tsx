import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import { mockCompanies } from '@/mocks/company.mock';
import RecruitmentAnalysisInfo from '@/features/recruitment/components/section/RecruitmentAnalysisInfo';
import RecruitmentBasicInfo from '@/features/recruitment/components/section/RecruitmentBasicInfo';
import CardActionForm from '@/shared/components/ui/CardActionForm';

export default async function RecruitmentReviewPage({
  params,
}: {
  params: Promise<{ recruitmentId: string }>;
}) {
  const { recruitmentId } = await params;
  const item = mockRecruitments.find((r) => r.recruitmentId === Number(recruitmentId));
  const analysis = item?.analysis;
  const companyName = item
    ? (mockCompanies.find((c) => c.companyId === item.companyId)?.companyName ?? '-')
    : '-';

  return (
    <>
      <TopBar title="공고 관리" breadcrumb="공고 관리 > 공고 등록 > AI 분석 검토" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader
          title="AI 분석 검토"
          description="AI가 생성한 분석 결과를 검토하고 공고를 발행합니다"
          backHref="/recruitment?tab=public"
        />

        <div className="flex gap-5 items-start">
          <RecruitmentBasicInfo item={item} companyName={companyName} />
          <div className="flex-1 flex flex-col gap-3">
            <RecruitmentAnalysisInfo analysis={analysis} />
            <CardActionForm
              primaryLabel="발행"
              //TODO: API 연결 (AI 분석 요청 후 공개 공고 목록페이지로 이동)
              onPrimaryClick={() => {
                // TODO: 발행 API 연동 및 공개 공고 목록 페이지로 라우팅
                if (typeof window !== 'undefined') {
                  // 임시 동작: 사용자에게 발행 예정임을 알림
                  window.alert('발행 기능은 아직 준비 중입니다.');
                }
              }}
              secondaryLabel="삭제"
              secondaryButtonClassName="text-ds-badge-red-text"
              onSecondaryClick={() => {
                // TODO: 삭제 API 연동 및 적절한 페이지로 라우팅
                if (typeof window !== 'undefined') {
                  const confirmed = window.confirm(
                    '현재 공고를 삭제하시겠습니까? (기능은 아직 준비 중입니다)',
                  );
                  if (confirmed) {
                    // 실제 삭제 로직 연동 예정
                    // eslint-disable-next-line no-console
                    console.log('삭제 기능은 아직 준비 중입니다.');
                  }
                }
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
