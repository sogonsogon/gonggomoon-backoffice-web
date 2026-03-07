'use client';

import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { mockIndustries } from '@/mocks';
import { COMPANY_TYPE_OPTIONS } from '@/features/company/constants';

export default function CompanyFilterToolbar() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-grey-400"
        />
        <Input
          type="text"
          placeholder="기업명을 검색..."
          className="h-10 w-70 border-ds-grey-200 bg-white pl-9 placeholder:text-ds-grey-400"
        />
      </div>
      <Select defaultValue="all-industries">
        <SelectTrigger className="h-10 w-40 border-ds-grey-200 bg-white text-ds-grey-600">
          <SelectValue placeholder="산업군 전체" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-industries">산업군 전체</SelectItem>
          {mockIndustries.map((item) => (
            <SelectItem key={item.industryId} value={item.industryId.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="all-company-types">
        <SelectTrigger className="h-10 w-40 border-ds-grey-200 bg-white text-ds-grey-600">
          <SelectValue placeholder="기업 유형 전체" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-company-types">기업 유형 전체</SelectItem>
          {COMPANY_TYPE_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
