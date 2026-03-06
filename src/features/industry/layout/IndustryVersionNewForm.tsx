'use client';

import { useState, useTransition, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import ContentHeader from '@/shared/components/layout/ContentHeader';
import CardActionForm from '@/shared/components/ui/CardActionForm';

type TagFieldProps = {
  title: string;
  tags: string[];
  inputValue: string;
  placeholder: string;
  onChangeInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (value: string) => void;
};

function TagField({
  title,
  tags,
  inputValue,
  placeholder,
  onChangeInput,
  onAdd,
  onRemove,
}: TagFieldProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    onAdd();
  };

  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-semibold text-ds-grey-900">{title}</Label>
      {tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1 rounded-md bg-white px-2 py-1.5">
          {tags.map((tag) => (
            <Button
              key={tag}
              type="button"
              onClick={() => onRemove(tag)}
              variant="secondary"
              size="xs"
              className="h-6 bg-ds-grey-100 px-2 text-[11px] text-ds-grey-600"
            >
              {tag}
              <X size={11} className="text-ds-grey-400" />
            </Button>
          ))}
        </div>
      ) : null}
      <div className="flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={(event) => onChangeInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-8 text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="text-ds-grey-600"
          onClick={onAdd}
        >
          + 추가
        </Button>
      </div>
    </div>
  );
}

export default function IndustryVersionNewForm({ industryId }: { industryId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [analyzedYear, setAnalyzedYear] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [rival, setRival] = useState('');

  const [keywordTags, setKeywordTags] = useState<string[]>([]);
  const [trendTags, setTrendTags] = useState<string[]>([]);
  const [riskTags, setRiskTags] = useState<string[]>([]);
  const [hiringTags, setHiringTags] = useState<string[]>([]);
  const [investmentTags, setInvestmentTags] = useState<string[]>([]);

  const [keywordInput, setKeywordInput] = useState('');
  const [trendInput, setTrendInput] = useState('');
  const [riskInput, setRiskInput] = useState('');
  const [hiringInput, setHiringInput] = useState('');
  const [investmentInput, setInvestmentInput] = useState('');

  const addTag = (
    value: string,
    setInput: (value: string) => void,
    setTags: (updater: (prev: string[]) => string[]) => void,
  ) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    setTags((prev) => {
      if (prev.includes(trimmed)) {
        return prev;
      }

      return [...prev, trimmed];
    });
    setInput('');
  };

  const removeTag = (target: string, setTags: (updater: (prev: string[]) => string[]) => void) => {
    setTags((prev) => prev.filter((tag) => tag !== target));
  };

  const rivalList = rival
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  const isPrimaryEnabled =
    Number.isFinite(Number(analyzedYear)) &&
    Number(analyzedYear) > 0 &&
    marketSize.trim().length > 0 &&
    (keywordTags.length > 0 || keywordInput.trim().length > 0) &&
    (trendTags.length > 0 || trendInput.trim().length > 0) &&
    (riskTags.length > 0 || riskInput.trim().length > 0) &&
    rivalList.length > 0 &&
    (hiringTags.length > 0 || hiringInput.trim().length > 0) &&
    (investmentTags.length > 0 || investmentInput.trim().length > 0);

  const handleSubmit = () => {
    if (keywordInput.trim()) addTag(keywordInput, setKeywordInput, setKeywordTags);
    if (trendInput.trim()) addTag(trendInput, setTrendInput, setTrendTags);
    if (riskInput.trim()) addTag(riskInput, setRiskInput, setRiskTags);
    if (hiringInput.trim()) addTag(hiringInput, setHiringInput, setHiringTags);
    if (investmentInput.trim()) addTag(investmentInput, setInvestmentInput, setInvestmentTags);

    startTransition(async () => {
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
                  tags={keywordTags}
                  inputValue={keywordInput}
                  onChangeInput={setKeywordInput}
                  onAdd={() => addTag(keywordInput, setKeywordInput, setKeywordTags)}
                  onRemove={(value) => removeTag(value, setKeywordTags)}
                  placeholder="키워드 입력 후 Enter 또는 + 추가"
                />

                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-ds-grey-900">산업 규모</Label>
                  <textarea
                    value={marketSize}
                    onChange={(event) => setMarketSize(event.target.value)}
                    placeholder="산업 규모를 입력합니다."
                    rows={2}
                    className="w-full resize-none rounded-md border border-ds-grey-200 bg-white px-3 py-2 text-[13px] text-ds-grey-700 outline-none"
                  />
                </div>

                <TagField
                  title="산업 트렌드 요약"
                  tags={trendTags}
                  inputValue={trendInput}
                  onChangeInput={setTrendInput}
                  onAdd={() => addTag(trendInput, setTrendInput, setTrendTags)}
                  onRemove={(value) => removeTag(value, setTrendTags)}
                  placeholder="트렌드 요약 입력 후 Enter 또는 + 추가"
                />

                <TagField
                  title="규제 리스크"
                  tags={riskTags}
                  inputValue={riskInput}
                  onChangeInput={setRiskInput}
                  onAdd={() => addTag(riskInput, setRiskInput, setRiskTags)}
                  onRemove={(value) => removeTag(value, setRiskTags)}
                  placeholder="규제/리스크 문장 입력 후 Enter 또는 + 추가"
                />

                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-ds-grey-900">경쟁 구도</Label>
                  <textarea
                    value={rival}
                    onChange={(event) => setRival(event.target.value)}
                    placeholder="주요 경쟁 구도를 쉼표로 구분해 입력합니다."
                    rows={2}
                    className="w-full resize-none rounded-md border border-ds-grey-200 bg-white px-3 py-2 text-[13px] text-ds-grey-700 outline-none"
                  />
                </div>

                <TagField
                  title="채용 트렌드"
                  tags={hiringTags}
                  inputValue={hiringInput}
                  onChangeInput={setHiringInput}
                  onAdd={() => addTag(hiringInput, setHiringInput, setHiringTags)}
                  onRemove={(value) => removeTag(value, setHiringTags)}
                  placeholder="채용 트렌드 문장 입력 후 Enter 또는 + 추가"
                />

                <TagField
                  title="투자 방향"
                  tags={investmentTags}
                  inputValue={investmentInput}
                  onChangeInput={setInvestmentInput}
                  onAdd={() => addTag(investmentInput, setInvestmentInput, setInvestmentTags)}
                  onRemove={(value) => removeTag(value, setInvestmentTags)}
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
