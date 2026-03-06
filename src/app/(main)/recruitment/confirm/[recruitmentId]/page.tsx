import Link from 'next/link';
import {
  FileText,
  Sparkles,
  Building2,
  ListChecks,
  Star,
  Zap,
  Key,
  Rocket,
  AlignLeft,
} from 'lucide-react';
import { TopBar } from '@/shared/components/layout/TopBar';
import { ContentHeader } from '@/shared/components/layout/contentHeader';
import { Button } from '@/shared/components/ui/button';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import { mockCompanies } from '@/mocks/company.mock';
import type { JobType } from '@/features/recruitment/types';

const JOB_TYPE_LABELS: Record<JobType, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DEVOPS: 'DevOps',
  DATA_ANALYSIS: '데이터 분석',
  AI: 'AI',
  INFORMATION_SECURITY: '정보보안',
  DESIGN: '디자인',
  PM_PO: 'PM/PO',
  QA: 'QA',
};

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

  const joinOrDash = (values?: string[]) => {
    if (!values || values.length === 0) {
      return '-';
    }

    return values.join(', ');
  };

  return (
    <>
      <TopBar title="공고 관리" breadcrumb="공고 관리 > 공고 등록 > AI 분석 검토" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader
          title="AI 분석 검토"
          description="AI가 생성한 분석 결과를 검토하고 공고를 발행합니다"
          backHref="/recruitment?tab=public"
        />

        {/* Body Row */}
        <div className="flex gap-5 items-start">
          {/* Left Column — 기본 정보 */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-primary shrink-0" />
              <span className="text-base font-bold text-ds-grey-900">기본 정보</span>
            </div>

            <div className="bg-white rounded-[10px] border border-ds-grey-200 p-6 flex flex-col gap-5">
              {/* Row 1: 기업명 + 직무 + 경력 */}
              <div className="flex justify-between gap-10">
                <div className="flex flex-col gap-1.5 w-35">
                  <span className="text-xs font-medium text-ds-grey-500">기업명</span>
                  <span className="text-sm font-semibold text-ds-grey-900">{companyName}</span>
                </div>
                <div className="flex flex-col gap-1.5 w-35">
                  <span className="text-xs font-medium text-ds-grey-500">직무</span>
                  <span className="text-sm font-semibold text-ds-grey-900">
                    {item?.jobType ? JOB_TYPE_LABELS[item.jobType] : '-'}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 w-35">
                  <span className="text-xs font-medium text-ds-grey-500">경력</span>
                  <span className="text-sm font-semibold text-ds-grey-900">
                    {item?.experience ?? '-'}년 이상
                  </span>
                </div>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* Row 2: 공고 제목 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-ds-grey-500">공고 제목</span>
                <span className="text-sm font-semibold text-ds-grey-900">{item?.title ?? '-'}</span>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* Row 3: 채용 기간 + 플랫폼 */}
              <div className="flex gap-8">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ds-grey-500">채용기간</span>
                  <span className="text-sm font-semibold text-ds-grey-900">
                    {item?.startDate ?? '-'} ~ {item?.dueDate ?? '상시'}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-ds-grey-500">플랫폼</span>
                  <span className="text-sm font-semibold text-ds-grey-900">사람인</span>
                </div>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* Row 4: 원본 공고 URL */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-ds-grey-500">원본 공고 URL</span>
                <span className="text-sm text-primary">{item?.url ?? '-'}</span>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* Row 5: 공고 원문 */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-ds-grey-500">공고 원문</span>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {analysis?.summary ?? '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — AI 분석 결과 + 액션 */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary shrink-0" />
                <span className="text-sm font-semibold text-ds-grey-900">AI 분석 결과</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-ds-btn-primary-weak text-primary rounded-full text-[11px] font-semibold">
                <Sparkles size={10} />
                분석 완료
              </span>
            </div>

            <div className="bg-white rounded-[10px] border border-ds-grey-200 p-5 flex flex-col gap-4">
              {/* 공고 한 줄 요약 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <AlignLeft size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">공고 한 줄 요약</span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {analysis?.summary ?? '-'}
                </p>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* 회사 한 줄 소개 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Building2 size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">회사 한 줄 소개</span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {analysis?.companySummary ?? '-'}
                </p>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* R&R */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <ListChecks size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">
                    R&R (Roles & Responsibilities)
                  </span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {joinOrDash(analysis?.rolesResponsibilities)}
                </p>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* 필수 역량 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">필수 역량</span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {joinOrDash(analysis?.requiredSkills)}
                </p>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* 차별 포인트 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Zap size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">차별 포인트</span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {joinOrDash(analysis?.highlightPoints)}
                </p>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* 숨은 키워드 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Key size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">숨은 키워드</span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {joinOrDash(analysis?.hiddenKeywords)}
                </p>
              </div>

              <div className="h-px bg-ds-grey-100" />

              {/* 추천 활동 액션 박스 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Rocket size={13} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">
                    추천 활동 액션 박스
                  </span>
                </div>
                <p className="text-[13px] text-ds-grey-700 leading-relaxed">
                  {joinOrDash(analysis?.recommendedActions)}
                </p>
              </div>
            </div>

            {/* 액션 카드 */}
            <div className="bg-white rounded-[10px] border border-ds-grey-200 p-6 flex flex-col gap-4">
              <Button className="h-10 w-full bg-ds-grey-900 text-white hover:bg-ds-grey-800">
                발행
              </Button>
              <Button variant="outline" className="h-10 w-full text-ds-badge-red-text">
                삭제
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
