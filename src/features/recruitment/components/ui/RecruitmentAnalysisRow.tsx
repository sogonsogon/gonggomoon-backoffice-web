'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileSearch, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog';
import { ANALYSIS_STATUS_BADGE, ANALYSIS_STATUS_LABELS } from '@/features/recruitment/constants';
import { formatDate } from '@/shared/lib/formatDate';
import type { RecruitmentAnalysisStatus, RecruitmentSummary } from '@/features/recruitment/types';

type RecruitmentAnalysisItem = Omit<RecruitmentSummary, 'postStatus'> & {
  postStatus: RecruitmentAnalysisStatus;
};

interface RecruitmentAnalysisRowProps {
  no: number;
  item: RecruitmentAnalysisItem;
  last?: boolean;
  isDeleting: boolean;
  onDelete: (postId: number) => void;
}

export default function RecruitmentAnalysisRow({
  no,
  item,
  last = false,
  isDeleting,
  onDelete,
}: RecruitmentAnalysisRowProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const status = item.postStatus;
  const isAnalyzing = status === 'ANALYZING';
  const isAnalysisDone = status === 'ANALYZED';
  const statusLabel = ANALYSIS_STATUS_LABELS[status];

  return (
    <>
      <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}>
        <div className="w-14 px-4 text-[13px] text-ds-grey-500 shrink-0">{no}</div>
        <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{item.companyName}</div>
        <div className="flex-1 px-4 text-sm text-ds-grey-900 truncate">{item.postTitle}</div>
        <div className="w-56 px-4 shrink-0">
          <span
            className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${ANALYSIS_STATUS_BADGE[status]}`}
          >
            {statusLabel}
          </span>
        </div>
        <div className="w-28 px-4 text-[13px] text-ds-grey-700 shrink-0">
          {formatDate(item.startDate)}
        </div>
        <div className="w-56 px-4 flex items-center gap-2 shrink-0">
          {isAnalyzing ? (
            <Button disabled size="sm" variant="outline" className="gap-1.5 text-ds-grey-500">
              <FileSearch size={13} />
              분석중
            </Button>
          ) : (
            <>
              {isAnalysisDone ? (
                <Button asChild size="sm" className="gap-1.5">
                  <Link href={`/recruitment/confirm/${item.postId}`}>
                    <FileSearch size={13} />
                    검토
                  </Link>
                </Button>
              ) : (
                <Button disabled size="sm" variant="outline" className="gap-1.5 text-ds-grey-400">
                  <FileSearch size={13} />
                  검토
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-ds-badge-red-text hover:bg-ds-badge-red-bg hover:border-ds-badge-red-text"
                disabled={isDeleting}
                onClick={() => setIsConfirmOpen(true)}
              >
                <Trash2 size={12} />
                삭제
              </Button>
            </>
          )}
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
