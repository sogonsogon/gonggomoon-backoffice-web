import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Textarea } from '@/shared/components/ui/textarea';
import { useState } from 'react';
import { useRejectRecruitmentRequest } from '../../queries';
import { ApiErrorResponse } from '@/shared/types/api';
import { toast } from 'sonner';

interface RecruitmentRequestRejectProps {
  submissionId: number | null;
  open: boolean;
  onClose: () => void;
}

export default function RecruitmentRequestReject({ submissionId, open, onClose }: RecruitmentRequestRejectProps) {
  const [rejectReason, setRejectReason] = useState('');

  const { mutate: reject, isPending: isRejecting } = useRejectRecruitmentRequest();

  const isRejectDisabled = submissionId === null || !rejectReason.trim() || isRejecting;

  const handleRejectConfirm = () => {
    if (submissionId === null || !rejectReason.trim()) return;
    reject(
      { submissionId, data: { rejectReason } },
      {
        onSuccess: () => {
          toast.success('공고 요청을 거절하였습니다.');
          setRejectReason('');
          onClose();
        },
        onError: (error: ApiErrorResponse) => {
          toast.error(error.message || '거절 처리에 실패했습니다.');
        },
      },
    );
  };

  const handleRejectDialogClose = () => {
    setRejectReason('');
    onClose();
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) handleRejectDialogClose(); }}>
        <DialogContent className="w-[480px]">
          <DialogHeader>
            <DialogTitle>공고 요청 거절</DialogTitle>
          </DialogHeader>
          <label htmlFor="reject-reason" className="sr-only">
            거절 사유 입력
          </label>
          <Textarea
            id="reject-reason"
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
    </div>
  );
}
