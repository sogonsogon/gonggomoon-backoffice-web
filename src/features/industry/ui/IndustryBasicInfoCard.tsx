import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

interface IndustryBasicInfoCardProps {
  label: string;
}

export default function IndustryBasicInfoCard({ label }: IndustryBasicInfoCardProps) {
  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ds-grey-900">기본 정보</span>
        <Button className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">저장</Button>
      </div>
      <div className="h-px bg-ds-grey-200" />
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-medium text-ds-grey-900">산업명 *</Label>
        <Input
          type="text"
          defaultValue={label}
          className="h-10 border-ds-grey-200 text-ds-grey-900"
        />
      </div>
    </div>
  );
}
