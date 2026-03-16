'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export interface FilterConfig {
  paramKey: string;
  placeholder: string;
  allValue: string;
  width?: string;
  options: { value: string; label: string }[];
}

interface SearchFormProps {
  searchable?: boolean;
  searchParamKey?: string;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
}

const SEARCH_DEBOUNCE_MS = 800;

export default function SearchForm({
  searchable = true,
  searchParamKey = 'query',
  searchPlaceholder = '검색...',
  filters = [],
}: SearchFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get(searchParamKey) ?? '');

  // 기존 파라미터를 모두 보존하고 변경된 키만 덮어씀
  const buildParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value !== null) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page'); // 페이지네이션 초기화를 위해 page 파라미터 제거
      return params.toString();
    },
    [searchParams],
  );

  const replaceWithParams = useCallback(
    (paramsString: string) => {
      router.replace(paramsString ? `${pathname}?${paramsString}` : pathname);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!searchable) {
      return;
    }

    const query = inputValue.trim();
    const currentQuery = searchParams.get(searchParamKey) ?? '';

    if (query === currentQuery) {
      return;
    }

    const timer = setTimeout(() => {
      replaceWithParams(buildParams(searchParamKey, query || null));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [buildParams, inputValue, replaceWithParams, searchable, searchParamKey, searchParams]);

  const handleSearch = () => {
    const query = inputValue.trim();
    replaceWithParams(buildParams(searchParamKey, query || null));
  };

  const handleFilterChange = (paramKey: string, value: string, allValue: string) => {
    replaceWithParams(buildParams(paramKey, value === allValue ? null : value));
  };

  return (
    <div className="flex items-center gap-3">
      {searchable && (
        <div className="relative">
          <button
            type="button"
            aria-label="검색"
            onClick={handleSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-grey-400 cursor-pointer"
          >
            <Search size={16} aria-hidden="true" />
          </button>
          <Input
            type="search"
            value={inputValue}
            placeholder={searchPlaceholder}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-10 w-70 border-ds-grey-200 bg-white pl-9 placeholder:text-ds-grey-400"
          />
        </div>
      )}

      {filters.map((filter) => (
        <Select
          key={filter.paramKey}
          value={searchParams.get(filter.paramKey) ?? filter.allValue}
          onValueChange={(value) => handleFilterChange(filter.paramKey, value, filter.allValue)}
        >
          <SelectTrigger
            className={`h-10 border-ds-grey-200 bg-white text-ds-grey-600 ${filter.width ?? 'w-36'}`}
          >
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
            {filter.options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
