'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { ANALYSIS_STATUS_BADGE, ANALYSIS_STATUS_LABELS } from '@/features/recruitment/constants';
import { formatDate } from '@/shared/lib/formatDate';
import { useRecruitmentList, useDeleteRecruitment } from '@/features/recruitment/queries';
import { toast } from 'sonner';
import type { ApiErrorResponse } from '@/shared/types/api';
import type { RecruitmentStatus } from '@/features/recruitment/types';

const ANALYSIS_VISIBLE_STATUSES: Exclude<RecruitmentStatus, 'PUBLISHED'>[] = [
  'PENDING',
  'ANALYZING',
  'ANALYZED',
  'ANALYSIS_FAILED',
  'REJECTED',
  'EXPIRED',
];

export default function RecruitmentAnalysisList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawPage = searchParams.get('page');
  const page = Number.isFinite(Number(rawPage)) && Number(rawPage) >= 0 ? Number(rawPage) : 0;

  const analysisStatusParam = searchParams.get('analysisStatus');
  const status = ANALYSIS_VISIBLE_STATUSES.includes(
    analysisStatusParam as Exclude<RecruitmentStatus, 'PUBLISHED'>,
  )
    ? (analysisStatusParam as Exclude<RecruitmentStatus, 'PUBLISHED'>)
    : undefined;

  const { data: response } = useRecruitmentList({ page, status });
  const { mutate: deleteRecruitment } = useDeleteRecruitment();
  const rows = (response?.content ?? []).filter((item) => item.postStatus !== 'PUBLISHED');
  const pageInfo = response?.pageInfo;

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleDelete = (postId: number) => {
    deleteRecruitment(postId, {
      onSuccess: () => toast.success('공고가 삭제되었습니다.'),
      onError: (error: ApiErrorResponse) =>
        toast.error(error.message || '공고 삭제에 실패했습니다.'),
    });
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">시작일</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm text-ds-grey-400">
          진행 중인 분석 공고가 없습니다.
        </div>
      ) : (
        rows.map((item, i) => {
          const status = item.postStatus;
          const isAnalyzing = status === 'ANALYZING';
          const isAnalysisDone = status === 'ANALYZED';
          const statusLabel = status === 'PUBLISHED' ? '발행 완료' : ANALYSIS_STATUS_LABELS[status];

          return (
            <div
              key={item.postId}
              className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
            >
              <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
              <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{item.companyName}</div>
              <div className="flex-1 px-4 text-sm text-ds-grey-900 truncate">{item.postTitle}</div>
              <div className="w-48 px-4 shrink-0">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${ANALYSIS_STATUS_BADGE[status]}`}
                >
                  {statusLabel}
                </span>
              </div>
              <div className="w-28 px-4 text-[13px] text-ds-grey-700 shrink-0">
                {formatDate(item.startDate)}
              </div>
              <div className="w-48 px-4 flex items-center gap-1.5 shrink-0">
                {isAnalyzing ? (
                  <Button disabled size="sm" variant="outline" className="text-ds-grey-500">
                    분석중
                  </Button>
                ) : (
                  <>
                    {isAnalysisDone ? (
                      <Button asChild size="sm">
                        <Link href={`/recruitment/confirm/${item.postId}`}>검토</Link>
                      </Button>
                    ) : (
                      <Button disabled size="sm" variant="outline" className="text-ds-grey-400">
                        검토
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-ds-badge-red-text"
                      onClick={() => handleDelete(item.postId)}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Pagination Footer */}
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
    </div>
  );
}
