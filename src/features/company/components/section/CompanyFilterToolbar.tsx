'use client';

import { useEffect } from 'react';
import SearchForm from '@/shared/components/ui/SearchForm';
import { useIndustryCategoryList } from '@/features/industry/queries';
import { toast } from 'sonner';

export default function CompanyFilterToolbar() {
  const { data: industryCategories, isError, error } = useIndustryCategoryList();

  useEffect(() => {
    if (!isError) return;
    toast.error(error?.message || '산업군 목록을 불러오지 못했습니다.');
  }, [isError, error]);

  const industryOptions = (industryCategories ?? []).map((category) => ({
    value: String(category.industryId),
    label: category.industryName,
  }));

  const companyFilters = [
    {
      paramKey: 'industryTypeId',
      placeholder: '산업군 전체',
      allValue: 'all',
      width: 'w-40',
      options: [{ value: 'all', label: '산업군 전체' }, ...industryOptions],
    },
  ];

  return (
    <SearchForm
      searchParamKey="search"
      searchPlaceholder="기업명을 검색..."
      filters={companyFilters}
    />
  );
}
