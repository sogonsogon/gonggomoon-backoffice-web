'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useLogout } from '@/features/auth/queries';

export default function TopBarUserMenu() {
  const [open, setOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const handleConfirm = () => {
    logout();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md px-1 py-0.5 hover:bg-ds-grey-100 transition-colors"
      >
        <Avatar size="sm" className="bg-ds-grey-900">
          <AvatarFallback className="bg-ds-grey-900 text-white">관</AvatarFallback>
        </Avatar>
        <span className="text-[13px] text-ds-grey-600">관리자</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[360px]">
          <DialogHeader>
            <DialogTitle>로그아웃</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-ds-grey-700">로그아웃 하시겠습니까?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isPending}>
              {isPending ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
