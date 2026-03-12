'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import { toast } from 'sonner';
import { useCreateIndustryCategory } from '@/features/industry/queries';
import { ApiErrorResponse } from '@/shared/types/api';

export default function IndustryAddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [industryName, setIndustryName] = useState('');
  const { mutate: createCategory, isPending } = useCreateIndustryCategory();

  function handleSubmit() {
    if (!industryName.trim()) return;
    createCategory(
      { industryName: industryName.trim() },
      {
        onSuccess: () => {
          toast.success('산업군이 등록되었습니다.');
          setIsOpen(false);
          setIndustryName('');
        },
        onError: (error: ApiErrorResponse) => {
          toast.error(error.message || '산업군 등록에 실패했습니다.');
        },
      },
    );
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) setIndustryName('');
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus size={16} />
          산업군 추가
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-120 max-w-[calc(100%-2rem)] rounded-xl border-ds-grey-200 bg-white p-7"
      >
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-lg font-bold text-ds-grey-900">산업군 등록</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7 rounded-md bg-ds-grey-100 text-ds-grey-600 hover:bg-ds-grey-100"
            >
              <X size={16} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <Separator className="bg-ds-grey-200" />

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-ds-grey-900">산업군 이름 *</Label>
          <Input
            type="text"
            placeholder="예) 인공지능 / AI"
            className="border-ds-grey-200 bg-white text-sm text-ds-grey-900"
            value={industryName}
            onChange={(e) => setIndustryName(e.target.value)}
          />
        </div>

        <Separator className="bg-ds-grey-200" />

        <DialogFooter className="flex-row justify-end gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="bg-ds-grey-100 text-ds-grey-700 hover:bg-ds-grey-100"
            >
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={!industryName.trim() || isPending}>
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
