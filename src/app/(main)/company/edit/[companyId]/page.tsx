import TopBar from '@/shared/components/layout/TopBar';
import CompanyForm from '@/features/company/components/section/CompanyForm';

export default function CompanyEditPage() {
  return (
    <>
      <TopBar title="기업 관리" breadcrumb="기업관리 > 기업 정보 수정" />
      <CompanyForm />
    </>
  );
}
