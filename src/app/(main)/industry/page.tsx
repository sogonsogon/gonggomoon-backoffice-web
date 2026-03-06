import TopBar from '@/shared/components/layout/TopBar';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import { mockIndustries } from '@/mocks';
import IndustryAddButton from '@/features/industry/ui/IndustryAddButton';
import IndustryList from '@/features/industry/layout/IndustryList';

export default function IndustryPage() {
  return (
    <>
      <TopBar title="산업군 관리" breadcrumb="산업 카테고리를 관리합니다" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-6">
        <ContentHeader
          title="산업군 목록"
          description={`총 ${mockIndustries.length}개 카테고리가 등록되어 있습니다`}
          actions={<IndustryAddButton />}
        />
        <IndustryList />
      </main>
    </>
  );
}
