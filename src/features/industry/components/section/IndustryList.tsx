'use client';

import { useIndustryCategoryList } from '@/features/industry/queries';
import IndustryCard from '@/features/industry/components/ui/IndustryCard';

export default function IndustryList() {
  const { data: categories, isLoading, isError, error } = useIndustryCategoryList();

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-35 rounded-[10px] bg-ds-grey-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError || !categories) {
    return (
      <p className="text-sm text-ds-grey-500">
        산업 카테고리를 불러오지 못했습니다. {error?.message}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((item) => (
        <IndustryCard
          key={item.industryId}
          industryId={item.industryId}
          label={item.industryName}
          analysisCount={item.reportCount}
        />
      ))}
    </div>
  );
}
