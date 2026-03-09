import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import IndustryCard from '@/features/industry/components/ui/IndustryCard';

export default function IndustryList() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* TODO: 산업 카테고리 목록 조회 API 연결하기 . (/api/v1/admin/industries)*/}
      {mockIndustries.map((item) => {
        const versionCount = mockIndustriesVersion.filter(
          (v) => v.industryId === item.industryId,
        ).length;

        return (
          <IndustryCard
            key={item.industryId}
            industryCategoryId={item.industryId}
            label={item.name}
            versionCount={versionCount}
          />
        );
      })}
    </div>
  );
}
