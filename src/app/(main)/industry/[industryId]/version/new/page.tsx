import { mockIndustries } from '@/mock/industry.mock';
import { IndustryVersionForm } from '@/features/industry/components/IndustryVersionForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ industryId: string }>;
}

export default async function NewVersionPage({ params }: PageProps) {
  const { industryId } = await params;
  const id = Number(industryId);
  const industry = mockIndustries.find((i) => i.industryId === id);

  if (!industry) {
    notFound();
  }

  return (
    <IndustryVersionForm
      industryId={id}
      industryName={industry.name}
      mode="create"
    />
  );
}
