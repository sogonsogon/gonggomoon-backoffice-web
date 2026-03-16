'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Send, Trash2 } from 'lucide-react';
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
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const isPublished = item.reportStatus === 'PUBLISHED';
  const statusLabel = ANALYSIS_STATUS_LABELS[item.reportStatus] ?? ANALYSIS_STATUS_LABELS.PENDING;

  return (
    <>
      <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}>
        <div className="w-25 px-4 text-sm font-semibold text-ds-grey-900 shrink-0">
          {item.reportYear}
        </div>
        <div className="w-40 px-4 text-[13px] text-ds-grey-700 shrink-0">
          {formatDate(item.createdAt)}
        </div>
        <div className="w-40 px-4 text-[13px] text-ds-grey-700 shrink-0">
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
        <div className="w-72 px-4 flex items-center gap-2 shrink-0">
          <Link
            href={`/industry/${industryId}/analysis/${item.reportId}`}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-ds-grey-200 bg-white px-3 text-sm font-medium text-ds-grey-600 no-underline visited:text-ds-grey-600 hover:bg-ds-grey-50"
          >
            <FileText size={13} />
            상세보기
          </Link>
          <Button
            size="sm"
            disabled={isPublished || isPublishing}
            className={`gap-1.5 ${isPublished ? 'bg-ds-grey-300 hover:bg-ds-grey-300 cursor-not-allowed' : 'bg-ds-grey-900 hover:bg-ds-grey-800'}`}
            onClick={() => setIsPublishConfirmOpen(true)}
          >
            <Send size={12} />
            발행
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-ds-badge-red-text hover:bg-ds-badge-red-bg hover:border-ds-badge-red-text"
            disabled={isDeleting}
            onClick={() => setIsDeleteConfirmOpen(true)}
          >
            <Trash2 size={12} />
            삭제
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        id={item.reportId}
        onOpenChange={setIsDeleteConfirmOpen}
        title="산업 분석 삭제"
        description="정말 삭제하시겠습니까? 삭제된 분석은 복구할 수 없습니다."
        onConfirm={onDelete}
        isPending={isDeleting}
      />
      <ConfirmDialog
        open={isPublishConfirmOpen}
        id={item.reportId}
        onOpenChange={setIsPublishConfirmOpen}
        title="산업 분석 발행"
        description="정말 발행하시겠습니까? 발행된 분석은 수정할 수 없습니다."
        onConfirm={onPublish}
        isPending={isPublishing}
      />
    </>
  );
}
