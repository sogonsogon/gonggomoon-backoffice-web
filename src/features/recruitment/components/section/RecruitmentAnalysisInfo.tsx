import { AlignLeft, Building2, Key, ListChecks, Rocket, Sparkles, Star, Zap } from 'lucide-react';
import type { PostAnalysis } from '@/features/recruitment/types';
import { joinOrDash } from '@/features/recruitment/utils/joinOrDash';

interface RecruitmentAnalysisInfoProps {
  analysis?: PostAnalysis;
}

export default function RecruitmentAnalysisInfo({ analysis }: RecruitmentAnalysisInfoProps) {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-primary shrink-0" />
          <span className="text-base font-semibold text-ds-grey-900">AI 분석 결과</span>
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
          <p className="text-[13px] text-ds-grey-700 leading-relaxed">{analysis?.summary ?? '-'}</p>
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
            <span className="text-[11px] font-semibold text-primary">추천 활동 액션 박스</span>
          </div>
          <p className="text-[13px] text-ds-grey-700 leading-relaxed">
            {joinOrDash(analysis?.recommendedActions)}
          </p>
        </div>
      </div>
    </div>
  );
}
