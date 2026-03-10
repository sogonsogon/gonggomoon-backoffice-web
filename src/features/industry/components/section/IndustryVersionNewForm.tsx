'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import CardActionForm from '@/shared/components/ui/CardActionForm';
import TagField from '@/features/industry/components/ui/TagField';
import { useTagField } from '@/features/industry/hooks/useTagField';

interface IndustryVersionNewFormProps {
  industryId: string;
}

export default function IndustryVersionNewForm({ industryId }: IndustryVersionNewFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [analyzedYear, setAnalyzedYear] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [rival, setRival] = useState('');

  const keyword = useTagField();
  const trend = useTagField();
  const risk = useTagField();
  const hiring = useTagField();
  const investment = useTagField();

  const rivalList = rival
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  const isPrimaryEnabled =
    Number.isFinite(Number(analyzedYear)) &&
    Number(analyzedYear) > 0 &&
    marketSize.trim().length > 0 &&
    (keyword.tags.length > 0 || keyword.inputValue.trim().length > 0) &&
    (trend.tags.length > 0 || trend.inputValue.trim().length > 0) &&
    (risk.tags.length > 0 || risk.inputValue.trim().length > 0) &&
    rivalList.length > 0 &&
    (hiring.tags.length > 0 || hiring.inputValue.trim().length > 0) &&
    (investment.tags.length > 0 || investment.inputValue.trim().length > 0);

  const handleSubmit = () => {
    if (keyword.inputValue.trim()) keyword.onAdd();
    if (trend.inputValue.trim()) trend.onAdd();
    if (risk.inputValue.trim()) risk.onAdd();
    if (hiring.inputValue.trim()) hiring.onAdd();
    if (investment.inputValue.trim()) investment.onAdd();

    startTransition(async () => {
      // TODO: 산업 분석 생성 API 호출 위치(/api/v1/admin/industries/{id}/reports)
      // TODO: server action 연결
      router.push(`/industry/${industryId}`);
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-6 overflow-auto bg-ds-grey-100 p-8">
      <ContentHeader
        title="버전 추가"
        description="분석 항목을 입력하거나 AI로 자동 생성할 수 있습니다"
        descriptionClassName="pl-6"
        backHref={`/industry/${industryId}`}
      />

      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="gap-4 border-ds-grey-200 bg-white py-4">
            <CardContent className="space-y-4 px-4">
              <div className="w-50 space-y-1.5">
                <Label className="text-sm font-semibold text-ds-grey-900">분석 연도</Label>
                <Input
                  value={analyzedYear}
                  onChange={(event) => setAnalyzedYear(event.target.value)}
                  placeholder="예: 2025"
                  className="h-8 text-sm"
                />
              </div>

              <Separator className="bg-ds-grey-200" />

              <div className="space-y-3">
                <CardTitle className="text-[15px] font-semibold text-ds-grey-900">
                  분석 항목
                </CardTitle>

                <TagField
                  title="핵심 산업 키워드"
                  {...keyword}
                  placeholder="키워드 입력 후 Enter 또는 + 추가"
                />

                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-ds-grey-900">산업 규모</Label>
                  <textarea
                    value={marketSize}
                    onChange={(event) => setMarketSize(event.target.value)}
                    placeholder="산업 규모를 입력합니다."
                    rows={2}
                    className="w-full resize-none rounded-md border border-ds-grey-200 bg-white px-4 py-2 text-[13px] text-ds-grey-700 outline-none"
                  />
                </div>

                <TagField
                  title="산업 트렌드 요약"
                  {...trend}
                  placeholder="트렌드 요약 입력 후 Enter 또는 + 추가"
                />

                <TagField
                  title="규제 리스크"
                  {...risk}
                  placeholder="규제/리스크 문장 입력 후 Enter 또는 + 추가"
                />

                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-ds-grey-900">경쟁 구도</Label>
                  <textarea
                    value={rival}
                    onChange={(event) => setRival(event.target.value)}
                    placeholder="주요 경쟁 구도를 쉼표로 구분해 입력합니다."
                    rows={2}
                    className="w-full resize-none rounded-md border border-ds-grey-200 bg-white px-4 py-2 text-[13px] text-ds-grey-700 outline-none"
                  />
                </div>

                <TagField
                  title="채용 트렌드"
                  {...hiring}
                  placeholder="채용 트렌드 문장 입력 후 Enter 또는 + 추가"
                />

                <TagField
                  title="투자 방향"
                  {...investment}
                  placeholder="투자 방향 문장 입력 후 Enter 또는 + 추가"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드 영역 */}
        <div className="w-80 flex flex-col gap-4 shrink-0">
          <CardActionForm
            primaryLabel={isPending ? '저장 중...' : '저장'}
            primaryButtonClassName="bg-ds-grey-900 text-white hover:bg-ds-grey-800"
            primaryEnabled={isPrimaryEnabled}
            onPrimaryClick={handleSubmit} //TODO: 산업 분석 버전 생성 API 연결
            secondaryLabel="취소"
            secondaryHref={`/industry/${industryId}`}
          />
        </div>
      </div>
    </main>
  );
}
