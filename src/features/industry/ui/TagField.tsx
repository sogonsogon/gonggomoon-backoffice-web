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
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    onAdd();
  };

  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-semibold text-ds-grey-900">{title}</Label>
      {tags.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1 rounded-md bg-white px-2 py-1.5">
          {tags.map((tag) => (
            <Button
              key={tag}
              type="button"
              onClick={() => onRemove(tag)}
              variant="secondary"
              size="xs"
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
          className="h-8 text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="text-ds-grey-600"
          onClick={onAdd}
        >
          <Plus /> 추가
        </Button>
      </div>
    </div>
  );
}
