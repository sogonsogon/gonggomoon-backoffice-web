'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/components/ui/button';
import { REQUEST_STATUS_BADGE, REQUEST_STATUS_LABELS } from '@/features/recruitment/constants';
import { useRecruitmentSubmissionList } from '@/features/recruitment/queries';
import { useRecruitmentCreateStore } from '@/features/recruitment/store';
import type { RecruitmentRequestStatus } from '@/features/recruitment/types';
import RecruitmentRequestReject from './RecruitmentRequestReject';

interface RecruitmentRequestListProps {
  submissionStatus?: RecruitmentRequestStatus;
}

export default function RecruitmentRequestList({ submissionStatus }: RecruitmentRequestListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const rawPage = searchParams.get('page');
  const page = Number.isFinite(Number(rawPage)) && Number(rawPage) >= 0 ? Number(rawPage) : 0;

  const { data: allItems = [] } = useRecruitmentSubmissionList({ submissionStatus });
  const totalPages = Math.ceil(allItems.length / 10) || 1;
  const items = allItems.slice(page * 10, page * 10 + 10);
  const setPending = useRecruitmentCreateStore((s) => s.setPending);

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const [rejectTargetId, setRejectTargetId] = useState<number | null>(null);

  const handleRegister = (submissionId: number, url: string) => {
    setPending(submissionId, url);
    router.push('/recruitment/create');
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
          <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
          <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">플랫폼</div>
          <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 URL</div>
          <div className="w-56 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            요청 상태
          </div>
          <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청일</div>
          <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
        </div>

        {items.map((item, i) => {
          const status = item.submissionStatus;
          const isPending = status === 'PENDING';

          return (
            <div
              key={item.submissionId}
              className={`flex items-center h-14 ${i < items.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
            >
              <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">
                {page * 10 + i + 1}
              </div>
              <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{item.platformName}</div>
              <div className="flex-1 px-4 text-[13px] text-primary truncate">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </div>
              <div className="w-56 px-4 shrink-0">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${REQUEST_STATUS_BADGE[status]}`}
                >
                  {REQUEST_STATUS_LABELS[status]}
                </span>
              </div>
              <div className="w-28 px-4 text-[13px] text-ds-grey-700 shrink-0">
                {formatDate(item.createdAt)}
              </div>
              <div className="w-48 px-4 flex items-center gap-1.5 shrink-0">
                {isPending ? (
                  <Button
                    size="sm"
                    className="bg-ds-grey-900 text-white hover:bg-ds-grey-800"
                    onClick={() => handleRegister(item.submissionId, item.url)}
                  >
                    등록
                  </Button>
                ) : (
                  <Button disabled size="sm" className="bg-ds-grey-200 text-ds-grey-500">
                    등록
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className={isPending ? 'text-ds-badge-red-text' : 'text-ds-grey-400'}
                  disabled={!isPending}
                  onClick={() => setRejectTargetId(item.submissionId)}
                >
                  거절
                </Button>
              </div>
            </div>
          );
        })}

        {/* Pagination Footer */}
        <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
          {Array.from({ length: totalPages }).map((_, i) => (
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
      </div>

      <RecruitmentRequestReject
        submissionId={rejectTargetId}
        open={rejectTargetId !== null}
        onClose={() => setRejectTargetId(null)}
      />
    </>
  );
}
