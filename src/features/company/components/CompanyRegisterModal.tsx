import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import React from 'react';

interface CompanyRegisterModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  setName: (v: string) => void;
  year: string;
  setYear: (v: string) => void;
  industry: string;
  setIndustry: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  onSave?: () => void;
}

const CompanyRegisterModal: React.FC<CompanyRegisterModalProps> = ({
  open,
  onClose,
  name,
  setName,
  year,
  setYear,
  industry,
  setIndustry,
  type,
  setType,
  onSave,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl p-8 w-[420px] max-w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-ds-grey-900 text-center">기업등록</h2>
          <p className="text-sm text-ds-grey-700 text-center">
            필수 정보를 입력해 기업을 등록합니다.
            <br />
            상세한 정보 등록은{' '}
            <span className="font-medium text-ds-grey-900">기업 관리 {'>'} 기업 목록</span>의{' '}
            <span className="font-medium text-ds-grey-900">수정</span>을 이용해주세요.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <Label className="text-ds-grey-900">기업명</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="기업명을 입력하세요"
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <Label className="text-ds-grey-900">설립 연도</Label>
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="예: 2010"
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <Label className="text-ds-grey-900">산업군</Label>
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="산업군 선택"
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <Label className="text-ds-grey-900">기업 유형</Label>
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="기업 유형 선택"
                className="h-10 border-ds-grey-200 placeholder:text-ds-grey-400"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="default"
            onClick={() => {
              if (onSave) onSave();
              onClose();
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegisterModal;
