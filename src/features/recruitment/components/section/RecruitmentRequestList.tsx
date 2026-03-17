'use client';

import { useRecruitmentSubmissionList } from '@/features/recruitment/queries';
import type { RecruitmentRequestStatus } from '@/features/recruitment/types';
import RecruitmentRequestRow from '@/features/recruitment/components/ui/RecruitmentRequestRow';

interface RecruitmentRequestListProps {
  status?: RecruitmentRequestStatus;
}

export default function RecruitmentRequestList({ status }: RecruitmentRequestListProps) {
  const { data: items = [] } = useRecruitmentSubmissionList({ status });

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">플랫폼</div>
        <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 URL</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청일</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {items.map((item, i) => (
        <RecruitmentRequestRow
          key={item.submissionId}
          no={i + 1}
          item={item}
          last={i === items.length - 1}
        />
      ))}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}
