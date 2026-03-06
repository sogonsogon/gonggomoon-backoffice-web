import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';

interface TopBarProps {
  title: string;
  breadcrumb: string;
}

export function TopBar({ title, breadcrumb }: TopBarProps) {
  return (
    <header className="h-14 shrink-0 bg-white border-b border-ds-grey-200 flex items-center justify-between px-6">
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-ds-grey-900">{title}</span>
        <span className="text-xs text-ds-grey-500">{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" className="text-ds-grey-600" aria-label="알림">
          <Bell size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar size="sm" className="bg-ds-grey-900">
            <AvatarFallback className="bg-ds-grey-900 text-white">관</AvatarFallback>
          </Avatar>
          <span className="text-[13px] text-ds-grey-600">관리자</span>
        </div>
      </div>
    </header>
  );
}
