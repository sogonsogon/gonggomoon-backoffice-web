import { Bell } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/cn';

interface TopBarProps {
  title: string;
  breadcrumb: string;
  className?: string;
}

export default function TopBar({ title, breadcrumb, className }: TopBarProps) {
  return (
    <header className={cn('h-14 shrink-0 bg-white border-b border-ds-grey-200 flex items-center justify-between px-6', className)}>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-ds-grey-900">{title}</span>
        <span className="text-xs text-ds-grey-500">{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" className="text-ds-grey-600" aria-label="알림">
          <Bell size={20} />
        </Button>
      </div>
    </header>
  );
}
