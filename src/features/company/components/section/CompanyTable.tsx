import { mockCompanies, mockIndustries } from '@/mocks';
import CompanyRow from '@/features/company/components/ui/CompanyRow';

export default function CompanyTable() {
  return (
    <div className="bg-white rounded-[10px] border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">번호</div>
        <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">기업명</div>
        <div className="w-56 px-3 text-[13px] font-medium text-ds-grey-600">사업 분야</div>
        <div className="w-56 px-3 text-[13px] font-medium text-ds-grey-600">기업 유형</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600">임직원 수</div>
        <div className="w-28 px-3 text-[13px] font-medium text-ds-grey-600">설립연도</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600">액션</div>
      </div>

      {/* Data Rows */}
      {mockCompanies.map((company, i) => {
        const industryName = mockIndustries.find(
          (ind) => ind.industryId === company.industryId,
        )?.name;

        return (
          <CompanyRow
            key={company.companyId}
            no={i + 1}
            company={company}
            industryName={industryName}
            last={i === mockCompanies.length - 1}
          />
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
