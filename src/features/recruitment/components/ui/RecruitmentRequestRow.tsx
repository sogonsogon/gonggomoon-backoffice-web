'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { REQUEST_STATUS_BADGE, REQUEST_STATUS_LABELS } from '@/features/recruitment/constants';
import { formatDate } from '@/shared/lib/formatDate';
import { useRecruitmentCreateStore } from '@/features/recruitment/store';
import RecruitmentRequestReject from '@/features/recruitment/components/section/RecruitmentRequestReject';
import type { RecruitmentRequest } from '@/features/recruitment/types';

interface RecruitmentRequestRowProps {
  no: number;
  item: RecruitmentRequest;
  last?: boolean;
}

export default function RecruitmentRequestRow({
  no,
  item,
  last = false,
}: RecruitmentRequestRowProps) {
  const router = useRouter();
  const setPending = useRecruitmentCreateStore((s) => s.setPending);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const status = item.submissionStatus;
  const isPending = status === 'PENDING';

  const handleRegister = () => {
    setPending(item.submissionId, item.platformId, item.url);
    router.push('/recruitment/create');
  };

  return (
    <>
      <div className={`flex items-center h-14 ${!last ? 'border-b border-ds-grey-200' : ''}`}>
        <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{no}</div>
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
              onClick={handleRegister}
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
            onClick={() => setIsRejectOpen(true)}
          >
            거절
          </Button>
        </div>
      </div>

      <RecruitmentRequestReject
        submissionId={item.submissionId}
        open={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
      />
    </>
  );
}
