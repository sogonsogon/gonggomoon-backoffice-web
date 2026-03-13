import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { ANALYSIS_STATUS_LABELS } from '@/features/industry/constants';
import type { IndustryReportStatus } from '@/features/industry/types';

interface IndustryStatusCardProps {
  status?: IndustryReportStatus;
  analyzedYear: number;
}

export default function IndustryStatusCard({ status, analyzedYear }: IndustryStatusCardProps) {
  const statusLabel = status ? ANALYSIS_STATUS_LABELS[status] : '대기중';

  return (
    <Card className="w-70 shrink-0 border-ds-grey-200 bg-white py-4">
      <CardHeader className="px-4 pb-2">
        <CardTitle className="text-[16px] font-semibold text-ds-grey-900">버전 상태</CardTitle>
      </CardHeader>
      <Separator className="bg-ds-grey-200" />
      <CardContent className="space-y-3 px-4 pt-3">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-ds-grey-600">현재 상태</span>
          <span className="font-semibold text-ds-grey-900">{statusLabel}</span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-ds-grey-600">분석 연도</span>
          <span className="font-semibold text-ds-grey-900">{analyzedYear}</span>
        </div>
        <div className="rounded-md bg-ds-btn-primary-weak p-3">
          <p className="text-xs text-primary">발행 시 사용자 화면에 노출됩니다.</p>
          <p className="mt-1 text-xs text-primary">
            기존 Published 버전은 자동으로 비활성화됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
