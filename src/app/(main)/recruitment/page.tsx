import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import TopBar from '@/shared/components/layout/TopBar';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import RecruitmentAnalysisList from '@/features/recruitment/components/section/RecruitmentAnalysisList';
import RecruitmentList from '@/features/recruitment/components/section/RecruitmentList';
import RecruitmentRequestList from '@/features/recruitment/components/section/RecruitmentRequestList';

const VALID_TABS = ['public', 'analysis', 'requests'] as const;
type Tab = (typeof VALID_TABS)[number];

export default async function RecruitmentPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;

  const tab: Tab = VALID_TABS.includes(tabParam as Tab) ? (tabParam as Tab) : 'public';

  return (
    <>
      <TopBar title="공고 관리" breadcrumb="공고 관리 > 공고 목록" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
        {/* Tab Bar */}
        <div className="flex items-end h-14 border-b border-ds-grey-200 gap-4">
          <Link
            href="/recruitment?tab=public"
            className={`h-14 px-4 pl-2 flex items-center text-base ${tab === 'public' ? 'font-semibold text-primary border-b-2 border-primary' : 'text-ds-grey-500'}`}
          >
            공개 공고 목록
          </Link>
          <Link
            href="/recruitment?tab=analysis"
            className={`h-14 px-4 flex items-center text-base ${tab === 'analysis' ? 'font-semibold text-primary border-b-2 border-primary' : 'text-ds-grey-500'}`}
          >
            공고 분석 진행 확인
          </Link>
          <Link
            href="/recruitment?tab=requests"
            className={`h-14 px-4 flex items-center text-base ${tab === 'requests' ? 'font-semibold text-primary border-b-2 border-primary' : 'text-ds-grey-500'}`}
          >
            등록 요청 공고
          </Link>
        </div>

        {/* Filter Row */}
        <div className="flex items-center justify-between gap-3">
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
                  className="w-70 border-ds-grey-200 bg-white pl-9 placeholder:text-ds-grey-400"
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
            <Link href="/recruitment/create">
              <Plus size={16} />
              공고 등록
            </Link>
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
