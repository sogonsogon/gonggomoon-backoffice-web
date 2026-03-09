import { mockCompanies } from '@/mocks';
import CardActionForm from '@/shared/components/ui/CardActionForm';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { AlertTriangle, Info } from 'lucide-react';

export default function RecruitmentCreateForm() {
  const companies = mockCompanies;
  //기업데이터에서 기업 제목만 불러오기
  const companyNames = companies.map((company) => company.companyName);
  return (
    <div>
      {/* Body Row */}
      <div className="flex gap-6 flex-1">
        {/* Form Col */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          {/* 기본 정보 Card */}
          <div className="bg-white rounded-lg border border-ds-grey-200 p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[15px] font-semibold text-ds-grey-900">기본 정보 입력</h2>
              <p className="text-[13px] text-ds-grey-500">
                기업명, 공고 제목, 마감일, 원본 공고 URL을 입력하세요.
              </p>
            </div>

            {/* Company + Date Row */}
            <div className="flex gap-4">
              {/* Company Select */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-ds-grey-900">기업명 *</Label>
                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                    기업 검색
                  </Button>
                </div>
                <Select defaultValue="none">
                  <SelectTrigger className="h-10 border-ds-grey-200 w-full bg-white text-ds-grey-500">
                    <SelectValue placeholder="기업을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">기업을 선택하세요</SelectItem>
                    {companyNames.map((name, index) => (
                      <SelectItem key={index} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="flex-1 flex flex-col gap-1.5">
                <Label className="text-ds-grey-900">채용 기간</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="시작일 (YYYY.MM.DD)"
                    className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
                  />
                  <span className="text-ds-grey-400 text-sm">~</span>
                  <Input
                    type="text"
                    placeholder="마감일 (YYYY.MM.DD)"
                    className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
                  />
                </div>
              </div>
            </div>

            {/* 공고 제목 */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">공고 제목 *</Label>
              <Input
                type="text"
                placeholder="공고 제목을 입력하세요"
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-500"
              />
            </div>

            {/* 원본 공고 URL */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">원본 공고 URL</Label>
              <Input
                type="text"
                placeholder="https://..."
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-500"
              />
            </div>

            {/* 공고 원문 */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-ds-grey-900">공고 원문 *</Label>
              <div className="h-50 border border-ds-grey-200 rounded-md p-3 bg-white overflow-auto">
                <p className="text-[13px] text-ds-grey-300 leading-relaxed">
                  공고 원문 전체를 붙여넣기 하세요. AI가 자동으로 요약 및 분석을 생성합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          {/* Action Card */}
          <CardActionForm
            primaryLabel="AI 분석 시작"
            //TODO: onPrimaryClick 에 API 연결 (AI 분석 요청 후 공개 공고 목록페이지로 이동)
            primaryEnabled={false}
            secondaryLabel="취소"
            secondaryHref="/recruitment?tab=public"
          />

          {/* Guide Card */}
          <div className="bg-ds-btn-primary-weak rounded-lg border border-ds-blue-disabled p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Info size={16} className="text-primary shrink-0" />
              <span className="text-[13px] font-semibold text-primary">등록 절차 안내</span>
            </div>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              1. 기본 정보와 공고 원문을 입력합니다.
            </p>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              2. AI가 자동으로 요약 및 분석을 생성합니다.
            </p>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              3. 관리자가 AI 생성 내용을 검토합니다.
            </p>
            <p className="text-xs text-ds-grey-700 leading-relaxed">
              4. 검토 완료 후 공고가 게시됩니다.
            </p>
          </div>

          {/* Warning Card */}
          <div className="bg-ds-badge-yellow-bg rounded-lg border border-ds-badge-yellow-bg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-ds-badge-yellow-text shrink-0" />
              <span className="text-[13px] font-semibold text-ds-badge-yellow-text">주의 사항</span>
            </div>
            <p className="text-xs text-ds-grey-600 leading-relaxed">
              모든 필수 항목(*)을 입력해야 다음 단계로 진행할 수 있습니다.
            </p>
            <p className="text-xs text-ds-grey-600 leading-relaxed">
              AI 분석은 배치 작업으로 처리되며, 완료까지 시간이 소요될 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
