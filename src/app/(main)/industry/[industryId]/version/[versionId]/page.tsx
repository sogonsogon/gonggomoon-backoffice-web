import { mockIndustries, mockIndustriesVersion } from '@/mock/industry.mock';
import { IndustryVersionForm } from '@/features/industry/components/IndustryVersionForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ industryId: string; versionId: string }>;
}

export default async function VersionDetailPage({ params }: PageProps) {
  const { industryId, versionId } = await params;
  const industryIdNum = Number(industryId);
  const versionIdNum = Number(versionId);

  const industry = mockIndustries.find((i) => i.industryId === industryIdNum);
  const version = mockIndustriesVersion.find(
    (v) => v.versionId === versionIdNum && v.industryId === industryIdNum,
  );

  if (!industry || !version) {
    notFound();
  }

  return (
    <IndustryVersionForm
      industryId={industryIdNum}
      industryName={industry.name}
      initialData={version}
      mode="edit"
    />
  );
}
