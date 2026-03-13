'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { REQUEST_STATUS_BADGE, REQUEST_STATUS_LABELS } from '@/features/recruitment/constants';
import {
  useRecruitmentSubmissionList,
  useRejectRecruitmentRequest,
} from '@/features/recruitment/queries';
import { useRecruitmentCreateStore } from '@/features/recruitment/store';
import { toast } from 'sonner';
import type { RecruitmentRequestStatus } from '@/features/recruitment/types';
import type { ApiErrorResponse } from '@/shared/types/api';

interface RecruitmentRequestListProps {
  submissionStatus?: RecruitmentRequestStatus;
}

export default function RecruitmentRequestList({ submissionStatus }: RecruitmentRequestListProps) {
  const router = useRouter();
  const { data: items = [] } = useRecruitmentSubmissionList({ submissionStatus });
  const setPending = useRecruitmentCreateStore((s) => s.setPending);
  const { mutate: reject, isPending: isRejecting } = useRejectRecruitmentRequest();

  const [rejectTargetId, setRejectTargetId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const isRejectDisabled = !rejectTargetId || !rejectReason.trim() || isRejecting;

  const handleRegister = (submissionId: number, url: string) => {
    setPending(submissionId, url);
    router.push('/recruitment/create');
  };

  const handleRejectConfirm = () => {
    if (!rejectTargetId || !rejectReason.trim()) return;
    reject(
      { submissionId: rejectTargetId, data: { rejectReason } },
      {
        onSuccess: () => {
          toast.success('공고 요청을 거절하였습니다.');
          setRejectTargetId(null);
          setRejectReason('');
        },
        onError: (error: ApiErrorResponse) => {
          toast.error(error.message || '거절 처리에 실패했습니다.');
        },
      },
    );
  };

  const handleRejectDialogClose = () => {
    setRejectTargetId(null);
    setRejectReason('');
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
          <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
          <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">플랫폼</div>
          <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 URL</div>
          <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
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
              <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
              <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{item.platformName}</div>
              <div className="flex-1 px-4 text-[13px] text-primary truncate">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </div>
              <div className="w-48 px-4 shrink-0">
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
                  disabled={!isPending || isRejecting}
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
          <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
            1
          </span>
        </div>
      </div>

      <Dialog open={rejectTargetId !== null} onOpenChange={handleRejectDialogClose}>
        <DialogContent className="w-[480px]">
          <DialogHeader>
            <DialogTitle>공고 요청 거절</DialogTitle>
          </DialogHeader>
          <textarea
            className="w-full rounded-md border border-ds-grey-200 p-3 text-sm text-ds-grey-900 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            rows={4}
            placeholder="거절 사유를 입력하세요"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleRejectDialogClose}>
              취소
            </Button>
            <Button variant="destructive" disabled={isRejectDisabled} onClick={handleRejectConfirm}>
              거절
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
