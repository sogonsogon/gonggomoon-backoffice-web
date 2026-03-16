'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useRecruitmentAnalysisList, useDeleteRecruitment } from '@/features/recruitment/queries';
import { toast } from 'sonner';
import type { ApiErrorResponse } from '@/shared/types/api';
import type { RecruitmentAnalysisStatus } from '@/features/recruitment/types';
import RecruitmentAnalysisRow from '@/features/recruitment/components/ui/RecruitmentAnalysisRow';

const ANALYSIS_VISIBLE_STATUSES: RecruitmentAnalysisStatus[] = [
  'ANALYZING',
  'ANALYZED',
  'ANALYSIS_FAILED',
];

export default function RecruitmentAnalysisList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawPage = searchParams.get('page');
  const page = Number.isFinite(Number(rawPage)) && Number(rawPage) >= 0 ? Number(rawPage) : 0;

  const analysisStatusParam = searchParams.get('analysisStatus');
  const status = ANALYSIS_VISIBLE_STATUSES.includes(
    analysisStatusParam as RecruitmentAnalysisStatus,
  )
    ? (analysisStatusParam as RecruitmentAnalysisStatus)
    : undefined;

  const { data: response } = useRecruitmentAnalysisList({ page, size: 10, status });
  const { mutate: deleteRecruitment, isPending: isDeleting } = useDeleteRecruitment();
  const rows = (response?.content ?? []).filter((item) =>
    status ? item.postStatus === status : item.postStatus !== 'PUBLISHED',
  );
  const pageInfo = response?.pageInfo;

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const handleDelete = (id: number) => {
    deleteRecruitment(id, {
      onSuccess: () => {
        toast.success('공고가 삭제되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '공고 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden shrink-0">
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
        rows.map((item, i) => (
          <RecruitmentAnalysisRow
            key={item.postId}
            no={i + 1}
            item={item}
            last={i === rows.length - 1}
            isDeleting={isDeleting}
            onDelete={() => handleDelete(item.postId)}
          />
        ))
      )}

      {/* Pagination Footer */}
      {rows.length > 0 && (
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
