'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { usePublishIndustryAnalysis, useDeleteIndustryAnalysis } from '@/features/industry/queries';
import type { IndustryAnalysisListItem } from '@/features/industry/types';
import { ApiErrorResponse } from '@/shared/types/api';
import { toast } from 'sonner';
import AnalysisRow from '@/features/industry/components/ui/AnalysisRow';

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

  const handlePublish = (reportId: number) => {
    publish(reportId, {
      onSuccess: () => {
        toast.success('산업 분석이 발행되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 발행에 실패했습니다.');
      },
    });
  };

  const handleDelete = (id: number) => {
    deleteAnalysis(id, {
      onSuccess: () => {
        toast.success('산업 분석이 삭제되었습니다.');
      },
      onError: (error: ApiErrorResponse) => {
        toast.error(error.message || '산업 분석 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 px-6 py-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ds-grey-900">분석 버전 관리</span>
        <Button asChild className="h-10 gap-1.5">
          <Link href={`/industry/${industryId}/analysis/new`}>
            <Plus size={16} />
            버전 추가
          </Link>
        </Button>
      </div>
      <div className="h-px bg-ds-grey-200" />

      <div className="rounded-md border border-ds-grey-200 overflow-x-auto">
        <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200 min-w-full">
          <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            분석 연도
          </div>
          <div className="w-36 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            등록일
          </div>
          <div className="w-36 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">
            수정일
          </div>
          <div className="w-24 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">상태</div>
          <div className="w-72 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
        </div>

        {analysis.map((item, i) => (
          <AnalysisRow
            key={item.reportId}
            item={item}
            industryId={industryId}
            last={i === analysis.length - 1}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
            onPublish={() => handlePublish(item.reportId)}
            onDelete={() => handleDelete(item.reportId)}
          />
        ))}
      </div>
    </div>
  );
}
