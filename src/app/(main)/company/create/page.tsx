import TopBar from '@/shared/components/layout/TopBar';
import CompanyCreateForm from '@/features/company/components/CompanyCreateForm';

export default function CompanyCreatePage() {
  return (
    <>
      <TopBar title="기업 관리" breadcrumb="기업관리 > 기업 정보 등록" />
      <CompanyCreateForm />
    </>
  );
}
