import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import type { IndustryVersionStatus } from '@/features/industry/types';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';

const VERSION_STATUS_LABELS: Record<IndustryVersionStatus, string> = {
  PUBLISHED: '발행됨',
  SAVED: '저장됨',
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return dateStr.split('T')[0].replace(/-/g, '.');
}

function renderLineRows(items: string[]) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="h-9 rounded-md border border-ds-grey-200 bg-ds-grey-50 px-3 text-[13px] leading-9 text-ds-grey-700"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default async function VersionDetailPage({
  params,
}: {
  params: Promise<{ industryId: string; versionId: string }>;
}) {
  const { industryId, versionId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';
  const version = mockIndustriesVersion.find((v) => v.versionId === Number(versionId));
  const yearLabel = version?.analyzedYear ?? versionId;
  const statusLabel = version?.status ? VERSION_STATUS_LABELS[version.status] : '저장됨';

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label} > ${yearLabel}년 분석`} />

      <main className="flex flex-1 flex-col gap-5 overflow-auto bg-ds-grey-100 p-6">
        <ContentHeader
          title={`${label} - ${yearLabel} 분석`}
          titleClassName="text-[30px]"
          description={`수정일: ${formatDate(version?.editedAt)}`}
          descriptionClassName="pl-7"
          backHref={`/industry/${industryId}`}
          actionsAlign="start"
          actions={
            <>
              <Button variant="outline" className="text-ds-badge-red-text">
                삭제
              </Button>
              <Button className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">발행</Button>
            </>
          }
        />

        {version ? (
          <div className="flex items-start gap-4">
            <Card className="flex-1 gap-4 border-ds-grey-200 bg-white py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-[18px] font-semibold text-ds-grey-900">
                  분석 항목
                </CardTitle>
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
                    <div className="h-10 rounded-md border border-ds-grey-200 bg-ds-grey-50 px-3 text-sm leading-10 text-ds-grey-900">
                      {version.marketSize}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[15px] font-semibold text-ds-grey-900">산업 트렌드 요약</p>
                  {renderLineRows(version.industryTrends)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[15px] font-semibold text-ds-grey-900">규제 리스크</p>
                    {renderLineRows(version.risk)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[15px] font-semibold text-ds-grey-900">경쟁 구도</p>
                    <div className="rounded-md border border-ds-grey-200 bg-ds-grey-50 px-3 py-2 text-sm text-ds-grey-900">
                      {version.rival.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[15px] font-semibold text-ds-grey-900">채용 트렌드</p>
                    {renderLineRows(version.hiringTrends)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[15px] font-semibold text-ds-grey-900">투자 방향</p>
                    {renderLineRows(version.investmentStrategy)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-70 shrink-0 border-ds-grey-200 bg-white py-4">
              <CardHeader className="px-4 pb-2">
                <CardTitle className="text-[16px] font-semibold text-ds-grey-900">
                  버전 상태
                </CardTitle>
              </CardHeader>
              <Separator className="bg-ds-grey-200" />
              <CardContent className="space-y-3 px-4 pt-3">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ds-grey-600">현재 상태</span>
                  <span className="font-semibold text-ds-grey-900">{statusLabel}</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ds-grey-600">분석 연도</span>
                  <span className="font-semibold text-ds-grey-900">{version.analyzedYear}</span>
                </div>
                <div className="rounded-md bg-ds-btn-primary-weak p-3">
                  <p className="text-xs text-primary">발행 시 사용자 화면에 노출됩니다.</p>
                  <p className="mt-1 text-xs text-primary">
                    기존 Published 버전은 자동으로 비활성화됩니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-ds-grey-200 bg-white py-10">
            <CardContent className="flex items-center justify-center">
              <p className="text-sm text-ds-grey-500">버전 정보를 찾을 수 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
