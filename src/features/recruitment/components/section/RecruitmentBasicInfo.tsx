import { FileText } from 'lucide-react';
import type { Recruitment } from '@/features/recruitment/types';
import { JOB_TYPE_LABELS } from '@/features/recruitment/constants';

interface RecruitmentBasicInfoProps {
  item?: Recruitment;
}

export default function RecruitmentBasicInfo({ item }: RecruitmentBasicInfoProps) {
  return (
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
            <span className="text-sm font-semibold text-ds-grey-900">
              {item?.companyName ?? '-'}
            </span>
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
              {item?.experienceLevel != null
                ? item.experienceLevel === 0
                  ? '신입'
                  : `${item.experienceLevel}년 이상`
                : '-'}
            </span>
          </div>
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* Row 2: 공고 제목 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-ds-grey-500">공고 제목</span>
          <span className="text-sm font-semibold text-ds-grey-900">{item?.postTitle ?? '-'}</span>
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* Row 3: 채용 기간 + 플랫폼 */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-1.5 flex-1">
            <span className="text-xs font-medium text-ds-grey-500">채용기간</span>
            <span className="text-sm font-semibold text-ds-grey-900">
              {item?.startDate ?? '-'} ~ {item?.dueDate ?? '상시'}
            </span>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <span className="text-xs font-medium text-ds-grey-500">플랫폼</span>
            <span className="text-sm font-semibold text-ds-grey-900">사람인</span>
          </div>
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* Row 4: 원본 공고 URL */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-ds-grey-500">원본 공고 URL</span>
          <span className="text-sm text-primary">{item?.recruitmentUrl ?? '-'}</span>
        </div>

        <div className="h-px bg-ds-grey-100" />

        {/* Row 5: 공고 원문 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-ds-grey-500">공고 원문</span>
          <p className="text-[13px] text-ds-grey-700 leading-relaxed">
            {item?.postDescription ?? '-'}
          </p>
        </div>
      </div>
    </div>
  );
}
