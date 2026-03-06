import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';
import { TopBar } from '@/shared/components/layout/TopBar';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { mockRecruitments, mockCompanies, mockRecruitmentRequests } from '@/mocks';
import type { PostStatus } from '@/features/recruitment/types';

const VALID_TABS = ['public', 'analysis', 'requests'] as const;
type Tab = (typeof VALID_TABS)[number];

export default async function RecruitmentPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;

  if (!tabParam) {
    redirect('/recruitment?tab=public');
  }

  const tab: Tab = VALID_TABS.includes(tabParam as Tab) ? (tabParam as Tab) : 'public';

  return (
    <>
      <TopBar title="공고 관리" breadcrumb="공고 관리 > 공고 목록" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-6 flex flex-col gap-4">
        {/* Tab Bar */}
        <div className="flex items-end h-11 border-b border-ds-grey-200">
          <Link
            href="/recruitment?tab=public"
            className={`h-11 px-4 flex items-center text-sm ${tab === 'public' ? 'font-semibold text-primary border-b-2 border-primary' : 'text-ds-grey-500'}`}
          >
            공개 공고 목록
          </Link>
          <Link
            href="/recruitment?tab=analysis"
            className={`h-11 px-4 flex items-center text-sm ${tab === 'analysis' ? 'font-semibold text-primary border-b-2 border-primary' : 'text-ds-grey-500'}`}
          >
            공고 분석 진행 확인
          </Link>
          <Link
            href="/recruitment?tab=requests"
            className={`h-11 px-4 flex items-center text-sm ${tab === 'requests' ? 'font-semibold text-primary border-b-2 border-primary' : 'text-ds-grey-500'}`}
          >
            등록 요청 공고
          </Link>
        </div>

        {/* Filter Row */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-ds-grey-200">
          <div className="flex items-center gap-3">
            {tab !== 'requests' && (
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-grey-400"
                />
                <Input
                  type="text"
                  placeholder="공고 제목 검색..."
                  className="h-10 w-70 border-ds-grey-200 bg-white pl-9 placeholder:text-ds-grey-400"
                />
              </div>
            )}
            <Select defaultValue="all-status">
              <SelectTrigger className="h-10 w-32 border-ds-grey-200 bg-white text-ds-grey-600">
                <SelectValue placeholder="상태 전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">상태 전체</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild>
            <Link href="/recruitment/create">+ 공고 등록</Link>
          </Button>
        </div>

        {tab === 'requests' ? (
          <RecruitmentRequestList />
        ) : tab === 'analysis' ? (
          <RecruitmentAnalysisList />
        ) : (
          <RecruitmentList />
        )}
      </main>
    </>
  );
}

const PUBLIC_STATUS_LABELS: Partial<Record<PostStatus, string>> = {
  POSTED: '채용 진행 중',
  ANALYSIS_DONE: '채용 마감',
};

const PUBLIC_STATUS_BADGE: Partial<Record<PostStatus, string>> = {
  POSTED: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYSIS_DONE: 'bg-ds-badge-grey-bg text-ds-badge-grey-text',
};

function RecruitmentList() {
  const rows = mockRecruitments.filter((item) => item.status === 'POSTED');

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">채용 기간</div>
        <div className="w-28 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">상태</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.map((item, i) => {
        const companyName =
          mockCompanies.find((c) => c.companyId === item.companyId)?.companyName ?? '-';
        return (
          <div
            key={item.recruitmentId}
            className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
          >
            <div className="w-14 px-3 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
            <div className="w-44 px-3 text-sm text-ds-grey-900 shrink-0">{companyName}</div>
            <div className="flex-1 px-3 text-sm text-ds-grey-900 truncate">{item.title}</div>
            <div className="w-48 px-3 text-[13px] text-ds-grey-700 shrink-0">
              {item.startDate ?? '-'} ~ {item.dueDate ?? '상시'}
            </div>
            <div className="w-28 px-3 shrink-0">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${PUBLIC_STATUS_BADGE[item.status] ?? 'bg-ds-grey-100 text-ds-grey-600'}`}
              >
                {PUBLIC_STATUS_LABELS[item.status] ?? item.status}
              </span>
            </div>
            <div className="w-48 px-3 flex items-center gap-1.5 shrink-0">
              <Button asChild size="xs" variant="outline" className="text-ds-grey-700">
                <Link href={`/recruitment/confirm/${item.recruitmentId}`}>상세보기</Link>
              </Button>
              <Button size="xs" variant="outline" className="text-ds-badge-red-text">
                삭제
              </Button>
            </div>
          </div>
        );
      })}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}

const ANALYSIS_STATUS_LABELS: Record<string, string> = {
  REVIEW: '검토 대기',
  ANALYZING: '분석 중',
  PUBLISH_WAITING: '발행 대기',
};

const ANALYSIS_STATUS_BADGE: Record<string, string> = {
  REVIEW: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYZING: 'bg-ds-badge-yellow-bg text-ds-badge-yellow-text',
  PUBLISH_WAITING: 'bg-ds-grey-100 text-ds-grey-600',
};

function RecruitmentAnalysisList() {
  const rows = mockRecruitments.filter((item) =>
    ['REVIEW', 'ANALYZING', 'PUBLISH_WAITING'].includes(item.status as string),
  );

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">등록일</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm text-ds-grey-400">
          진행 중인 분석 공고가 없습니다.
        </div>
      ) : (
        rows.map((item, i) => {
          const companyName =
            mockCompanies.find((c) => c.companyId === item.companyId)?.companyName ?? '-';
          const statusStr = item.status as string;
          const isAnalyzing = statusStr === 'ANALYZING';
          return (
            <div
              key={item.recruitmentId}
              className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
            >
              <div className="w-14 px-3 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
              <div className="w-42.5 px-3 text-sm text-ds-grey-900 shrink-0">{companyName}</div>
              <div className="flex-1 px-3 text-sm text-ds-grey-900 truncate">{item.title}</div>
              <div className="w-35 px-3 shrink-0">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${ANALYSIS_STATUS_BADGE[statusStr] ?? 'bg-ds-grey-100 text-ds-grey-600'}`}
                >
                  {ANALYSIS_STATUS_LABELS[statusStr] ?? statusStr}
                </span>
              </div>
              <div className="w-32.5 px-3 text-[13px] text-ds-grey-700 shrink-0">
                {item.createdAt.split('T')[0].replace(/-/g, '.')}
              </div>
              <div className="w-45 px-3 flex items-center gap-1.5 shrink-0">
                {isAnalyzing ? (
                  <Button disabled size="xs" variant="outline" className="text-ds-grey-500">
                    분석중
                  </Button>
                ) : (
                  <>
                    <Button asChild size="xs">
                      <Link href={`/recruitment/confirm/${item.recruitmentId}`}>검토</Link>
                    </Button>
                    <Button size="xs" variant="outline" className="text-ds-badge-red-text">
                      삭제
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}

const REQUEST_STATUS_LABELS: Record<string, string> = {
  requested: '요청됨',
  approved: '승인됨',
  rejected: '거절됨',
  PENDING: '요청됨',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
};

function RecruitmentRequestList() {
  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-28 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">플랫폼</div>
        <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">공고 URL</div>
        <div className="w-36 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-32 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">요청일</div>
        <div className="w-44 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {mockRecruitmentRequests.map((item, i) => {
        const statusStr = item.status as string;
        return (
          <div
            key={item.requestId}
            className={`flex items-center h-14 ${i < mockRecruitmentRequests.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
          >
            <div className="w-14 px-3 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
            <div className="w-28 px-3 text-sm text-ds-grey-900 shrink-0">{item.platformType}</div>
            <div className="flex-1 px-3 text-[13px] text-primary truncate">{item.requestUrl}</div>
            <div className="w-36 px-3 shrink-0">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                  statusStr === 'approved' || statusStr === 'APPROVED'
                    ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
                    : statusStr === 'rejected' || statusStr === 'REJECTED'
                      ? 'bg-ds-badge-grey-bg text-ds-badge-grey-text'
                      : 'bg-ds-badge-blue-bg text-ds-badge-blue-text'
                }`}
              >
                {REQUEST_STATUS_LABELS[statusStr] ?? statusStr}
              </span>
            </div>
            <div className="w-32 px-3 text-[13px] text-ds-grey-700 shrink-0">
              {item.createdAt ? item.createdAt.split('T')[0].replace(/-/g, '.') : '-'}
            </div>
            <div className="w-44 px-3 flex items-center gap-1.5 shrink-0">
              <Button size="xs" className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">
                등록
              </Button>
              <Button size="xs" variant="outline" className="text-ds-badge-red-text">
                거절
              </Button>
            </div>
          </div>
        );
      })}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}
