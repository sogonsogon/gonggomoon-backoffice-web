import Link from 'next/link';
import { Plus } from 'lucide-react';
import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import type { IndustryVersionStatus } from '@/features/industry/types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return dateStr.split('T')[0].replace(/-/g, '.');
}

const VERSION_STATUS_LABELS: Record<IndustryVersionStatus, string> = {
  PUBLISHED: '발행됨',
  SAVED: '저장됨',
};

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ industryId: string }>;
}) {
  const { industryId } = await params;
  const industry = mockIndustries.find((item) => item.industryId === Number(industryId));
  const label = industry?.name ?? '산업군';
  const versions = mockIndustriesVersion.filter((v) => v.industryId === Number(industryId));
  const publishedVersion = versions.find((v) => v.status === 'PUBLISHED');

  return (
    <>
      <TopBar title="산업군 관리" breadcrumb={`산업군 관리 > ${label}`} />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-5">
        <ContentHeader
          title={label}
          backHref="/industry"
          actions={
            <Button variant="outline" className="text-ds-badge-red-text">
              산업 삭제
            </Button>
          }
        />

        {/* Two-column layout */}
        <div className="flex gap-5 items-start">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* 기본 정보 card */}
            <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-ds-grey-900">기본 정보</span>
                <Button className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">저장</Button>
              </div>
              <div className="h-px bg-ds-grey-200" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ds-grey-900">산업명 *</label>
                <Input
                  type="text"
                  defaultValue={label}
                  className="h-10 border-ds-grey-200 text-ds-grey-900"
                />
              </div>
            </div>

            {/* 분석 버전 관리 card */}
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

              {/* Version Table */}
              <div className="rounded-md border border-ds-grey-200 overflow-hidden">
                {/* Header Row */}
                <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
                  <div className="w-25 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">
                    분석 연도
                  </div>
                  <div className="w-37.5 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">
                    등록일
                  </div>
                  <div className="w-37.5 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">
                    수정일
                  </div>
                  <div className="w-27.5 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">
                    상태
                  </div>
                  <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">
                    액션
                  </div>
                </div>

                {/* Version Rows */}
                {versions.map((version, i) => {
                  const isPublished = version.status === 'PUBLISHED';
                  const statusLabel = version.status
                    ? VERSION_STATUS_LABELS[version.status]
                    : '저장됨';
                  return (
                    <div
                      key={version.versionId}
                      className={`flex items-center h-14 ${i < versions.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
                    >
                      <div className="w-25 px-3 text-sm font-semibold text-ds-grey-900 shrink-0">
                        {version.analyzedYear}
                      </div>
                      <div className="w-37.5 px-3 text-[13px] text-ds-grey-700 shrink-0">
                        {formatDate(version.createdAt)}
                      </div>
                      <div className="w-37.5 px-3 text-[13px] text-ds-grey-700 shrink-0">
                        {formatDate(version.editedAt)}
                      </div>
                      <div className="w-27.5 px-3 shrink-0">
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
                      <div className="flex-1 px-3 flex items-center gap-1.5">
                        <Button asChild size="xs" variant="outline" className="text-ds-grey-700">
                          <Link href={`/industry/${industryId}/version/${version.versionId}`}>
                            상세보기
                          </Link>
                        </Button>
                        <Button
                          size="xs"
                          disabled={isPublished}
                          className={
                            isPublished ? 'bg-ds-grey-300 hover:bg-ds-grey-300' : 'bg-ds-grey-900'
                          }
                        >
                          발행
                        </Button>
                        <Button size="xs" variant="outline" className="text-ds-badge-red-text">
                          삭제
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-70 flex flex-col gap-3">
            <div className="bg-white rounded-lg border border-ds-grey-200 p-4 flex flex-col gap-3">
              <span className="text-sm font-semibold text-ds-grey-900">산업 정보</span>
              <div className="h-px bg-ds-grey-200" />
              <div className="flex justify-between text-[13px]">
                <span className="text-ds-grey-600">분석 버전 수</span>
                <span className="font-semibold text-ds-grey-900">{versions.length}개</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-ds-grey-600">최신 발행 버전</span>
                {publishedVersion ? (
                  <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-ds-badge-green-bg text-ds-badge-green-text">
                    {publishedVersion.analyzedYear}
                  </span>
                ) : (
                  <span className="text-ds-grey-500">-</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
