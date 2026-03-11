import type { IndustryAnalysis } from '@/features/industry/types';

interface IndustryInfoSideCardProps {
  analysisCount: number;
  publishedAnalysis?: IndustryAnalysis;
}

export default function IndustryInfoSideCard({
  analysisCount,
  publishedAnalysis,
}: IndustryInfoSideCardProps) {
  return (
    <div className="w-70 flex flex-col gap-3">
      <div className="bg-white rounded-lg border border-ds-grey-200 p-4 flex flex-col gap-3">
        <span className="text-sm font-semibold text-ds-grey-900">산업 정보</span>
        <div className="h-px bg-ds-grey-200" />
        <div className="flex justify-between text-[13px]">
          <span className="text-ds-grey-600">분석 버전 수</span>
          <span className="font-semibold text-ds-grey-900">{analysisCount}개</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-ds-grey-600">최신 발행 버전</span>
          {publishedAnalysis ? (
            <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-ds-badge-green-bg text-ds-badge-green-text">
              {publishedAnalysis.analysisYear}
            </span>
          ) : (
            <span className="text-ds-grey-500">-</span>
          )}
        </div>
      </div>
    </div>
  );
}
