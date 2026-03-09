import SearchForm from '@/shared/components/ui/SearchForm';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';
import { INDUSTRY_TYPE_OPTIONS } from '@/features/industry/constants';

export default function CompanyFilterToolbar() {
  return (
    <SearchForm
      searchParamKey="name"
      searchPlaceholder="기업명을 검색..."
      filters={[
        {
          paramKey: 'industryType',
          placeholder: '산업군 전체',
          allValue: 'all',
          width: 'w-40',
          options: [
            { value: 'all', label: '산업군 전체' },
            ...INDUSTRY_TYPE_OPTIONS,
          ],
        },
        {
          paramKey: 'companyType',
          placeholder: '기업 유형 전체',
          allValue: 'all',
          width: 'w-40',
          options: [
            { value: 'all', label: '기업 유형 전체' },
            ...COMPANY_TYPE_OPTIONS,
          ],
        },
      ]}
    />
  );
}
