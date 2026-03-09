'use client';
import { useState } from 'react';

export function useTagField() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const onAdd = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    setTags((prev) => {
      if (prev.includes(trimmed)) {
        return prev;
      }

      return [...prev, trimmed];
    });
    setInputValue('');
  };

  const onRemove = (value: string) => {
    setTags((prev) => prev.filter((tag) => tag !== value));
  };

  return { tags, inputValue, onChangeInput: setInputValue, onAdd, onRemove };
}
