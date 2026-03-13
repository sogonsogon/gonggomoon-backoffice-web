'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { ANALYSIS_STATUS_LABELS } from '@/features/industry/constants';
import { formatDate } from '@/shared/lib/formatDate';
import { usePublishIndustryAnalysis, useDeleteIndustryAnalysis } from '@/features/industry/queries';
import type { IndustryAnalysisListItem } from '@/features/industry/types';
import { ApiErrorResponse } from '@/shared/types/api';
import { toast } from 'sonner';

interface IndustryAnalysisTableProps {
  industryId: number;
  analysis: IndustryAnalysisListItem[];
}

export default function IndustryAnalysisTable({
  industryId,
  analysis,
}: IndustryAnalysisTableProps) {
  const { mutate: publish, isPending: isPublishing } = usePublishIndustryAnalysis(industryId);
  const { mutate: deleteAnalysis, isPending: isDeleting } = useDeleteIndustryAnalysis(industryId);

  const handlePublish = (analysisId: number) => {
    publish(analysisId, {
      onSuccess: () => {
        toast.success('산업 분석이 발행되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 발행에 실패했습니다.');
      },
    });
  };

  const handleDelete = (analysisId: number) => {
    deleteAnalysis(analysisId, {
      onSuccess: () => {
        toast.success('산업 분석이 삭제되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ds-grey-900">분석 버전 관리</span>
        <Button asChild className="h-10">
          <Link href={`/industry/${industryId}/analysis/new`}>
            <Plus size={16} />
            버전 추가
          </Link>
        </Button>
      </div>
      <div className="h-px bg-ds-grey-200" />

      <div className="rounded-md border border-ds-grey-200 overflow-hidden">
        <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
          <div className="w-25 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            분석 연도
          </div>
          <div className="w-37.5 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            등록일
          </div>
          <div className="w-37.5 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            수정일
          </div>
          <div className="w-27.5 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">상태</div>
          <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
        </div>

        {analysis.map((item, i) => {
          const isPublished = item.reportStatus === 'PUBLISHED';
          const statusLabel =
            ANALYSIS_STATUS_LABELS[item.reportStatus] ?? ANALYSIS_STATUS_LABELS.PENDING;
          return (
            <div
              key={item.reportId}
              className={`flex items-center h-14 ${i < analysis.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
            >
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
                  onClick={() => handlePublish(item.reportId)}
                >
                  발행
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-ds-badge-red-text"
                  disabled={isDeleting}
                  onClick={() => handleDelete(item.reportId)}
                >
                  삭제
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
