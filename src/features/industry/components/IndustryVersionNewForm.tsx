'use client';

import { useState, useTransition, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import { ContentHeader } from '@/shared/components/layout/contentHeader';

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

export function IndustryVersionNewForm({ industryId }: { industryId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState('');

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

  const handleSubmit = () => {
    setSubmitError('');

    const yearNumber = Number(analyzedYear);
    const rivalTags = rival
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (!Number.isFinite(yearNumber) || yearNumber <= 0) {
      setSubmitError('분석 연도를 입력해 주세요.');
      return;
    }

    if (!marketSize.trim()) {
      setSubmitError('산업 규모를 입력해 주세요.');
      return;
    }

    if (keywordTags.length === 0) {
      setSubmitError('핵심 산업 키워드를 1개 이상 추가해 주세요.');
      return;
    }

    if (trendTags.length === 0) {
      setSubmitError('산업 트렌드 요약을 1개 이상 추가해 주세요.');
      return;
    }

    if (riskTags.length === 0) {
      setSubmitError('규제 리스크를 1개 이상 추가해 주세요.');
      return;
    }

    if (rivalTags.length === 0) {
      setSubmitError('경쟁 구도를 1개 이상 입력해 주세요.');
      return;
    }

    if (hiringTags.length === 0) {
      setSubmitError('채용 트렌드를 1개 이상 추가해 주세요.');
      return;
    }

    if (investmentTags.length === 0) {
      setSubmitError('투자 방향을 1개 이상 추가해 주세요.');
      return;
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-5 overflow-auto bg-ds-grey-100 p-6">
      <ContentHeader
        title="버전 추가"
        description="분석 항목을 입력하거나 AI로 자동 생성할 수 있습니다"
        descriptionClassName="pl-6"
        backHref={`/industry/${industryId}`}
      />

      <div className="flex items-start gap-5">
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
                    className="w-full resize-none rounded-md border border-primary bg-white px-3 py-2 text-[13px] text-ds-grey-700 outline-none"
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
                    className="w-full resize-none rounded-md border border-primary bg-white px-3 py-2 text-[13px] text-ds-grey-700 outline-none"
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

                {submitError ? (
                  <p className="text-xs font-medium text-ds-badge-red-text">{submitError}</p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드 영역 */}
        <div className="w-80 flex flex-col gap-4 shrink-0">
          {/* 액션 카드 */}
          <div className="rounded-[10px] bg-white border border-ds-grey-200 p-6 flex flex-col gap-4">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="h-9 w-full bg-ds-grey-900 text-white hover:bg-ds-grey-800"
            >
              {isPending ? '저장 중...' : '저장'}
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-8 w-full bg-ds-grey-100 text-xs text-ds-grey-600 hover:bg-ds-grey-100"
            >
              <Link href={`/industry/${industryId}`}>취소</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
