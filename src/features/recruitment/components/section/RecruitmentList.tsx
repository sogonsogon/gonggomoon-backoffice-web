'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { useRecruitmentList, useDeleteRecruitment } from '@/features/recruitment/queries';
import { toast } from 'sonner';
import type { ApiErrorResponse } from '@/shared/types/api';

export default function RecruitmentList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawPage = searchParams.get('page');
  const page = Number.isFinite(Number(rawPage)) && Number(rawPage) >= 0 ? Number(rawPage) : 0;
  const title = searchParams.get('title') ?? undefined;

  const { data: response } = useRecruitmentList({ status: 'PUBLISHED', page, size: 10, title });
  const { mutate: deleteRecruitment } = useDeleteRecruitment();
  const rows = (response?.content ?? []).filter((item) => item.postStatus === 'PUBLISHED');
  const pageInfo = response?.pageInfo;

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };
  const todayStr = new Date().toLocaleDateString('sv-SE');

  const handleDelete = (postId: number) => {
    deleteRecruitment(postId, {
      onSuccess: () => toast.success('공고가 삭제되었습니다.'),
      onError: (error: ApiErrorResponse) =>
        toast.error(error.message || '공고 삭제에 실패했습니다.'),
    });
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden shrink-0">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-56 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">채용 기간</div>
        <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">상태</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.map((item, i) => {
        const companyName = item.companyName;
        const dueDateStr = item.dueDate?.slice(0, 10) ?? null;
        const isAlwaysOpen = item.postStatus === 'PUBLISHED' && dueDateStr === null;
        const isRecruitingOpen =
          item.postStatus === 'PUBLISHED' && Boolean(dueDateStr && dueDateStr >= todayStr);

        const publicStatusLabel = isAlwaysOpen
          ? '상시'
          : isRecruitingOpen
            ? '채용 진행 중'
            : '채용 마감';

        const publicStatusBadge = isAlwaysOpen
          ? 'bg-ds-grey-100 text-ds-grey-600'
          : isRecruitingOpen
            ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
            : 'bg-ds-badge-red-bg text-ds-badge-red-text';

        return (
          <div
            key={item.postId}
            className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
          >
            <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{page * 10 + i + 1}</div>
            <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{companyName}</div>
            <div className="flex-1 px-4 text-sm text-ds-grey-900 truncate">{item.postTitle}</div>
            <div className="w-56 px-4 text-[13px] text-ds-grey-700 shrink-0">
              {item.startDate?.slice(0, 10) ?? '-'} ~ {item.dueDate?.slice(0, 10) ?? '상시'}
            </div>
            <div className="w-28 px-4 shrink-0">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${publicStatusBadge}`}
              >
                {publicStatusLabel}
              </span>
            </div>
            <div className="w-48 px-4 flex items-center gap-1.5 shrink-0">
              <Link
                href={`https://gonggomoon.com/recruitment/${item.postId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center justify-center rounded-md border border-ds-grey-200 bg-white px-4 text-sm font-medium text-ds-grey-700 no-underline visited:text-ds-grey-700 hover:bg-ds-grey-50"
              >
                상세보기
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="text-ds-badge-red-text"
                onClick={() => handleDelete(item.postId)}
              >
                삭제
              </Button>
            </div>
          </div>
        );
      })}

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
