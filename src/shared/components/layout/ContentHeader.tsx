import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { ChevronLeft } from 'lucide-react';

interface ContentHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  backHref?: string;
  backAriaLabel?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  actionsAlign?: 'start' | 'center' | 'end';
}

export default function ContentHeader({
  title,
  description,
  actions,
  backHref,
  backAriaLabel = '뒤로가기',
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  actionsAlign = 'center',
}: ContentHeaderProps) {
  const actionsAlignClass =
    actionsAlign === 'start' ? 'self-start' : actionsAlign === 'end' ? 'self-end' : 'self-center';

  return (
    <div className={cn('flex items-center justify-between py-1 gap-4', className)}>
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2.5">
          {backHref ? (
            <Link href={backHref} aria-label={backAriaLabel}>
              <ChevronLeft size={20} className="text-ds-grey-900" />
            </Link>
          ) : null}
          <h1 className={cn('text-xl font-bold text-ds-grey-900', titleClassName)}>{title}</h1>
        </div>

        {description ? (
          <p className={cn('text-[13px] text-ds-grey-500', descriptionClassName)}>{description}</p>
        ) : null}
      </div>

      {actions ? (
        <div
          className={cn('shrink-0 flex items-center gap-2', actionsAlignClass, actionsClassName)}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}
