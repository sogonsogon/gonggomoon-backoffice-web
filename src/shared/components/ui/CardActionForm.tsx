'use client';

import type { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/cn';
import Link from 'next/link';

interface CardActionFormProps {
  primaryLabel: string;
  primaryVariant?: ComponentProps<typeof Button>['variant'];
  primaryEnabled?: boolean;
  onPrimaryClick?: () => void;
  primaryUseBack?: boolean;
  primaryHref?: string;
  secondaryLabel: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  secondaryUseBack?: boolean;
  primaryButtonClassName?: string;
  secondaryButtonClassName?: string;
  className?: string;
}

export default function CardActionForm({
  primaryLabel,
  primaryVariant = 'default',
  primaryEnabled,
  onPrimaryClick,
  primaryUseBack,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  onSecondaryClick,
  secondaryUseBack,
  primaryButtonClassName,
  secondaryButtonClassName,
  className,
}: CardActionFormProps) {
  const router = useRouter();
  const isPrimaryDisabled = primaryEnabled !== undefined ? !primaryEnabled : false;

  const handlePrimaryClick = () => {
    if (secondaryUseBack) {
      router.back();
      return;
    }
    onSecondaryClick?.();
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
      return;
    }

    router.back();
  };

  return (
    <div
      className={cn(
        'bg-white rounded-[10px] border border-ds-grey-200 p-6 flex flex-col gap-4',
        className,
      )}
    >
      {primaryHref ? (
        isPrimaryDisabled ? (
          <Button
            variant={primaryVariant}
            disabled
            className={cn('h-10 w-full', primaryButtonClassName)}
          >
            {primaryLabel}
          </Button>
        ) : (
          <Button
            asChild
            variant={primaryVariant}
            className={cn('h-10 w-full', primaryButtonClassName)}
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        )
      ) : (
        <Button
          variant={primaryVariant}
          disabled={isPrimaryDisabled}
          onClick={handlePrimaryClick}
          className={cn('h-10 w-full', primaryButtonClassName)}
        >
          {primaryLabel}
        </Button>
      )}

      {secondaryHref ? (
        <Button
          asChild
          variant="secondary"
          className={cn(
            'h-10 w-full bg-ds-grey-100 text-ds-grey-600 hover:bg-ds-grey-200',
            secondaryButtonClassName,
          )}
        >
          <Link href={secondaryHref}>{secondaryLabel}</Link>
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={handleSecondaryClick}
          className={cn(
            'h-10 w-full bg-ds-grey-100 text-ds-grey-600 hover:bg-ds-grey-200',
            secondaryButtonClassName,
          )}
        >
          {secondaryLabel}
        </Button>
      )}
    </div>
  );
}
