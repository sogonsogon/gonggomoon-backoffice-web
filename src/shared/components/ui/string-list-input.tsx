'use client';

import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/cn';

interface StringListInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function StringListInput({
  value,
  onChange,
  placeholder = '입력 후 Enter',
  className,
}: StringListInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-md bg-ds-grey-100 border border-ds-grey-200 px-2.5 py-1 text-[13px] text-ds-grey-700"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-ds-grey-500 hover:text-ds-grey-900 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 rounded-md border border-ds-grey-200 bg-white px-3 py-2 text-[13px] text-ds-grey-700 hover:bg-ds-grey-50 transition-colors"
        >
          <Plus size={14} />
          추가
        </button>
      </div>
    </div>
  );
}
