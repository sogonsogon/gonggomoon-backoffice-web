import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import getIndustryIconConfig from '@/features/industry/utils/getIndustryIconConfig';
import { INDUSTRY_CONFIG } from '@/features/industry/constants';
import type { IndustryType } from '@/features/industry/types';

interface IndustryCardProps {
  industryId: number;
  label: string;
  analysisCount: number;
}

export default function IndustryCard({ industryId, label, analysisCount }: IndustryCardProps) {
  const config = getIndustryIconConfig(label);
  const Icon = config.icon;
  const displayLabel = INDUSTRY_CONFIG[label as IndustryType]?.label ?? label;

  return (
    <Link
      href={`/industry/${industryId}`}
      className="bg-white rounded-[10px] p-5 flex flex-col justify-between border border-ds-grey-200 shadow-[0_1px_3px_0_rgba(0,29,58,0.08)] h-35"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: config.bgColor }}
      >
        <Icon size={20} style={{ color: config.iconColor }} />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-semibold text-ds-grey-900">{displayLabel}</span>
        <ChevronRight size={14} className="text-ds-grey-500 shrink-0" />
      </div>
      <span className="text-xs text-ds-grey-500">분석 버전 {analysisCount}건</span>
    </Link>
  );
}
