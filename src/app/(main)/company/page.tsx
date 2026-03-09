import Link from 'next/link';
import TopBar from '@/shared/components/layout/TopBar';
import { Button } from '@/shared/components/ui/button';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import CompanyFilterToolbar from '@/features/company/components/section/CompanyFilterToolbar';
import CompanyTable from '@/features/company/components/section/CompanyTable';
import { Plus } from 'lucide-react';

export default function CompanyPage() {
  return (
    <>
      <TopBar title="기업 관리" breadcrumb="등록된 기업 정보를 관리합니다" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-8 flex flex-col gap-5">
        <ContentHeader
          title="기업 목록"
          description="등록된 기업 정보를 관리합니다"
          actions={
            <Button asChild>
              <Link href="/company/create">
                <Plus />
                기업 등록
              </Link>
            </Button>
          }
        />
        <CompanyFilterToolbar />
        <CompanyTable />
      </main>
    </>
  );
}
