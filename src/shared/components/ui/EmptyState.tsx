import { Inbox } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export default function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 py-12 text-ds-grey-400', className)}>
      <Inbox size={32} strokeWidth={1.5} />
      <p className="text-sm">{message}</p>
    </div>
  );
}
