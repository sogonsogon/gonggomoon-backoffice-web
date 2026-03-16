'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import { ANALYSIS_STATUS_LABELS } from '@/features/industry/constants';
import { formatDate } from '@/shared/lib/formatDate';
import type { IndustryAnalysisListItem } from '@/features/industry/types';

interface AnalysisRowProps {
  item: IndustryAnalysisListItem;
  industryId: number;
  last?: boolean;
  isPublishing: boolean;
  isDeleting: boolean;
  onPublish: (reportId: number) => void;
  onDelete: (reportId: number) => void;
}

export default function AnalysisRow({
  item,
  industryId,
  last = false,
  isPublishing,
  isDeleting,
  onPublish,
  onDelete,
}: AnalysisRowProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const isPublished = item.reportStatus === 'PUBLISHED';
  const statusLabel = ANALYSIS_STATUS_LABELS[item.reportStatus] ?? ANALYSIS_STATUS_LABELS.PENDING;

  return (
    <>
      <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}>
        <div className="w-25 px-4 text-sm font-semibold text-ds-grey-900 shrink-0">
          {item.reportYear}
        </div>
        <div className="w-37.5 px-4 text-[13px] text-ds-grey-700 shrink-0">
          {formatDate(item.createdAt)}
        </div>
        <div className="w-37.5 px-4 text-[13px] text-ds-grey-700 shrink-0">
          {formatDate(item.updatedAt)}
        </div>
        <div className="w-27.5 px-4 shrink-0">
          <span
            className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
              isPublished
                ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
                : 'bg-ds-grey-100 text-ds-grey-600'
            }`}
          >
            {statusLabel}
          </span>
        </div>
        <div className="flex-1 px-4 flex items-center gap-1.5">
          <Link
            href={`/industry/${industryId}/analysis/${item.reportId}`}
            className="inline-flex h-8 items-center justify-center rounded-md border border-ds-grey-200 bg-white px-4 text-sm font-medium text-ds-grey-700 no-underline visited:text-ds-grey-700 hover:bg-ds-grey-50"
          >
            상세보기
          </Link>
          <Button
            size="sm"
            disabled={isPublished || isPublishing}
            className={isPublished ? 'bg-ds-grey-300 hover:bg-ds-grey-300' : 'bg-ds-grey-900'}
            onClick={() => onPublish(item.reportId)}
          >
            발행
          </Button>
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
        id={item.reportId}
        onOpenChange={setIsConfirmOpen}
        title="산업 분석 삭제"
        description="정말 삭제하시겠습니까? 삭제된 분석은 복구할 수 없습니다."
        onConfirm={onDelete}
        isPending={isDeleting}
      />
    </>
  );
}
