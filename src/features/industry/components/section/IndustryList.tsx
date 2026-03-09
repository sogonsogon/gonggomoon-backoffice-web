import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import IndustryCard from '@/features/industry/components/ui/IndustryCard';

export default function IndustryList() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {mockIndustries.map((item) => {
        const versionCount = mockIndustriesVersion.filter(
          (v) => v.industryId === item.industryId,
        ).length;

        return (
          <IndustryCard
            key={item.industryId}
            id={item.industryId}
            label={item.name}
            versionCount={versionCount}
          />
        );
      })}
    </div>
  );
}
