import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import type { IndustryVersion } from '@/features/industry/types';
import { LineRows } from '@/features/industry/components/ui/LineRows';

interface VersionAnalysisCardProps {
  version: IndustryVersion;
}

export default function VersionAnalysisCard({ version }: VersionAnalysisCardProps) {
  return (
    <Card className="flex-1 gap-4 border-ds-grey-200 bg-white py-4">
      <CardHeader className="px-4">
        <CardTitle className="text-[18px] font-semibold text-ds-grey-900">분석 항목</CardTitle>
      </CardHeader>
      <Separator className="bg-ds-grey-200" />
      <CardContent className="space-y-4 px-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-ds-grey-900">핵심 산업 키워드</p>
            <div className="flex min-h-10 flex-wrap items-center gap-1 rounded-md border border-ds-grey-200 bg-ds-grey-50 px-2 py-1">
              {version.keyword.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="border-ds-grey-200 bg-ds-grey-100 text-[12px] font-medium text-ds-grey-600"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-ds-grey-900">산업 규모</p>
            <div className="h-10 rounded-md border border-ds-grey-200 bg-ds-grey-50 px-4 text-sm leading-10 text-ds-grey-900">
              {version.marketSize}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[15px] font-semibold text-ds-grey-900">산업 트렌드 요약</p>
          <LineRows items={version.trend} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-ds-grey-900">규제 리스크</p>
            <LineRows items={version.regulation} />
          </div>
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-ds-grey-900">경쟁 구도</p>
            <div className="rounded-md border border-ds-grey-200 bg-ds-grey-50 px-4 py-2 text-sm text-ds-grey-900">
              {version.competition.join(', ')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-ds-grey-900">채용 트렌드</p>
            <LineRows items={version.hiring} />
          </div>
          <div className="space-y-2">
            <p className="text-[15px] font-semibold text-ds-grey-900">투자 방향</p>
            <LineRows items={version.investment} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
