import { cn } from '@/shared/lib/cn';

interface TopBarProps {
  title: string;
  breadcrumb: string;
  className?: string;
}

export default function TopBar({ title, breadcrumb, className }: TopBarProps) {
  return (
    <header
      className={cn(
        'h-14 shrink-0 bg-white border-b border-ds-grey-200 flex items-center justify-between pl-14 pr-6 lg:px-6',
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-ds-grey-900">{title}</span>
        <span className="text-xs text-ds-grey-500">{breadcrumb}</span>
      </div>
    </header>
  );
}
