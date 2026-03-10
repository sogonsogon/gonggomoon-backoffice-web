import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { VERSION_STATUS_LABELS } from '@/features/industry/constants';
import { formatDate } from '@/shared/lib/formatDate';

import type { IndustryAnalysis } from '@/features/industry/types';

interface IndustryAnalysisTableProps {
  industryId: string;
  versions: IndustryAnalysis[];
}

export default function IndustryAnalysisTable({
  industryId,
  versions,
}: IndustryAnalysisTableProps) {
  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ds-grey-900">분석 버전 관리</span>
        <Button asChild className="h-10">
          <Link href={`/industry/${industryId}/version/new`}>
            <Plus size={16} />
            버전 추가
          </Link>
        </Button>
      </div>
      <div className="h-px bg-ds-grey-200" />

      <div className="rounded-md border border-ds-grey-200 overflow-hidden">
        {/* Header Row */}
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

        {/* Version Rows */}
        {versions.map((version, i) => {
          const isPublished = version.status === 'PUBLISHED';
          const statusLabel = version.status ? VERSION_STATUS_LABELS[version.status] : '저장됨';

          return (
            <div
              key={version.analysisId}
              className={`flex items-center h-14 ${i < versions.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
            >
              <div className="w-25 px-4 text-sm font-semibold text-ds-grey-900 shrink-0">
                {version.analysisYear}
              </div>
              <div className="w-37.5 px-4 text-[13px] text-ds-grey-700 shrink-0">
                {formatDate(version.createdAt)}
              </div>
              <div className="w-37.5 px-4 text-[13px] text-ds-grey-700 shrink-0">
                {formatDate(version.editedAt)}
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
                  href={`/industry/${industryId}/version/${version.analysisId}`}
                  className="inline-flex h-8 items-center justify-center rounded-md border border-ds-grey-200 bg-white px-4 text-sm font-medium text-ds-grey-700 no-underline visited:text-ds-grey-700 hover:bg-ds-grey-50"
                >
                  상세보기
                </Link>
                <Button
                  size="sm"
                  disabled={isPublished}
                  className={isPublished ? 'bg-ds-grey-300 hover:bg-ds-grey-300' : 'bg-ds-grey-900'}
                >
                  발행
                </Button>
                <Button size="sm" variant="outline" className="text-ds-badge-red-text">
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
