import TopBar from '@/shared/components/layout/TopBar';
import { mockCompanies } from '@/mocks';
import CompanyForm from '@/features/company/section/CompanyForm';

export default async function CompanyEditPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = mockCompanies.find((c) => c.companyId === Number(companyId));

  return (
    <>
      <TopBar title="기업 관리" breadcrumb="기업관리 > 기업 정보 수정" />
      <CompanyForm mode="edit" initialForm={company} />
    </>
  );
}
