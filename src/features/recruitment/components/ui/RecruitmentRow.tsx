'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import type { RecruitmentSummary } from '@/features/recruitment/types';

interface RecruitmentRowProps {
  no: number;
  item: RecruitmentSummary;
  last?: boolean;
  todayStr: string;
  isDeleting: boolean;
  onDelete: (postId: number) => void;
}

export default function RecruitmentRow({
  no,
  item,
  last = false,
  todayStr,
  isDeleting,
  onDelete,
}: RecruitmentRowProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const dueDateStr = item.dueDate?.slice(0, 10) ?? null;
  const isAlwaysOpen = item.postStatus === 'PUBLISHED' && dueDateStr === null;
  const isRecruitingOpen =
    item.postStatus === 'PUBLISHED' && Boolean(dueDateStr && dueDateStr >= todayStr);

  const publicStatusLabel = isAlwaysOpen ? '상시' : isRecruitingOpen ? '채용 진행 중' : '채용 마감';
  const publicStatusBadge = isAlwaysOpen
    ? 'bg-ds-grey-100 text-ds-grey-600'
    : isRecruitingOpen
      ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
      : 'bg-ds-badge-red-bg text-ds-badge-red-text';

  return (
    <>
      <div
        className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}
      >
        <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{no}</div>
        <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{item.companyName}</div>
        <div className="flex-1 px-4 text-sm text-ds-grey-900 truncate">{item.postTitle}</div>
        <div className="w-48 px-4 text-[13px] text-ds-grey-700 shrink-0">
          {item.startDate ?? '-'} ~ {item.dueDate ?? '상시'}
        </div>
        <div className="w-28 px-4 shrink-0">
          <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${publicStatusBadge}`}>
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
            disabled={isDeleting}
            onClick={() => setIsConfirmOpen(true)}
          >
            삭제
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        id={item.postId}
        onOpenChange={setIsConfirmOpen}
        title="공고 삭제"
        description="정말 삭제하시겠습니까? 삭제된 공고는 복구할 수 없습니다."
        onConfirm={onDelete}
        isPending={isDeleting}
      />
    </>
  );
}
