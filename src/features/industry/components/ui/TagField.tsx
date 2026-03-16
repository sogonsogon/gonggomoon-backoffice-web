'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Plus, X } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface TagFieldProps {
  title: string;
  tags: string[];
  inputValue: string;
  placeholder: string;
  onChangeInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (value: string) => void;
}

export default function TagField({
  title,
  tags,
  inputValue,
  placeholder,
  onChangeInput,
  onAdd,
  onRemove,
}: TagFieldProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Ignore Enter while IME composition is active to avoid duplicate tag additions.
    if (event.nativeEvent.isComposing || event.keyCode === 229) {
      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    onAdd();
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-ds-grey-900">{title}</Label>
      <div className="rounded-md border border-ds-grey-200 bg-white px-3 py-2 flex flex-col gap-2">
        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1">
            {tags.map((tag) => (
              <Button
                key={tag}
                type="button"
                onClick={() => onRemove(tag)}
                variant="secondary"
                size="sm"
                className="h-6 bg-ds-grey-100 px-2 text-[11px] text-ds-grey-600"
              >
                {tag}
                <X size={11} className="text-ds-grey-400" />
              </Button>
            ))}
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(event) => onChangeInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-8 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-ds-grey-500 hover:text-ds-grey-900"
            onClick={onAdd}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
