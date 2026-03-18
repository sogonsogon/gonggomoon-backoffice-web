import { AlignLeft, Building2, Key, ListChecks, Rocket, Sparkles, Star, Zap } from 'lucide-react';
import type { RecruitmentAnalysis } from '@/features/recruitment/types';
import { Badge } from '@/shared/components/ui/badge';

interface RecruitmentAnalysisInfoProps {
  analysis?: RecruitmentAnalysis;
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
            {analysis?.company_intro ?? '-'}
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
          {analysis?.rnr && analysis.rnr.length > 0 ? (
            <ul className="flex flex-col gap-1 pl-1">
              {analysis.rnr.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[13px] text-ds-grey-700 leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-ds-grey-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-ds-grey-700">-</p>
          )}
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* 필수 역량 */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-primary shrink-0" />
            <span className="text-[11px] font-semibold text-primary">필수 역량</span>
          </div>
          {analysis?.required_skills && analysis.required_skills.length > 0 ? (
            <ul className="flex flex-col gap-1 pl-1">
              {analysis.required_skills.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[13px] text-ds-grey-700 leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-ds-grey-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-ds-grey-700">-</p>
          )}
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* 차별 포인트 */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-primary shrink-0" />
            <span className="text-[11px] font-semibold text-primary">차별 포인트</span>
          </div>
          {analysis?.differentiators && analysis.differentiators.length > 0 ? (
            <ul className="flex flex-col gap-1 pl-1">
              {analysis.differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[13px] text-ds-grey-700 leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-ds-grey-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-ds-grey-700">-</p>
          )}
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* 숨은 키워드 */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Key size={13} className="text-primary shrink-0" />
            <span className="text-[11px] font-semibold text-primary">숨은 키워드</span>
          </div>
          {analysis?.hidden_keywords && analysis.hidden_keywords.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {analysis.hidden_keywords.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-[11px] text-ds-grey-700 border-ds-grey-200 rounded-md">
                  {keyword.startsWith('#') ? keyword : `#${keyword}`}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-ds-grey-700">-</p>
          )}
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* 추천 활동 액션 박스 */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Rocket size={13} className="text-primary shrink-0" />
            <span className="text-[11px] font-semibold text-primary">추천 활동 액션 박스</span>
          </div>
          {analysis?.action_items && analysis.action_items.length > 0 ? (
            <ul className="flex flex-col gap-1 pl-1">
              {analysis.action_items.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[13px] text-ds-grey-700 leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-ds-grey-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-ds-grey-700">-</p>
          )}
        </div>
      </div>
    </div>
  );
}
