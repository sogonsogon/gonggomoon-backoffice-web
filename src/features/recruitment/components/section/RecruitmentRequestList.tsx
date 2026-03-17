'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useRecruitmentSubmissionList } from '@/features/recruitment/queries';
import type { RecruitmentRequestStatus } from '@/features/recruitment/types';
import RecruitmentRequestRow from '@/features/recruitment/components/ui/RecruitmentRequestRow';

const VALID_SUBMISSION_STATUS: RecruitmentRequestStatus[] = ['PENDING', 'APPROVED', 'REJECTED'];

export default function RecruitmentRequestList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawPage = searchParams.get('page');
  const page = Number.isFinite(Number(rawPage)) && Number(rawPage) >= 0 ? Number(rawPage) : 0;

  const requestStatusParam = searchParams.get('requestStatus');
  const status =
    requestStatusParam === 'all'
      ? undefined
      : VALID_SUBMISSION_STATUS.includes(requestStatusParam as RecruitmentRequestStatus)
        ? (requestStatusParam as RecruitmentRequestStatus)
        : 'PENDING';

  const { data: response } = useRecruitmentSubmissionList({ status, page, size: 10 });
  const items = response?.content ?? [];
  const pageInfo = response?.pageInfo;

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden shrink-0">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">플랫폼</div>
        <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 URL</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청일</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm text-ds-grey-400">
          요청된 공고가 없습니다.
        </div>
      ) : (
        items.map((item, i) => (
          <RecruitmentRequestRow
            key={item.submissionId}
            no={page * 10 + i + 1}
            item={item}
            last={i === items.length - 1}
          />
        ))
      )}

      {/* Pagination Footer */}
      {items.length > 0 && (
        <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
          {Array.from({ length: pageInfo?.totalPages ?? 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                i === page ? 'bg-ds-grey-900 text-white' : 'text-ds-grey-600 hover:bg-ds-grey-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
