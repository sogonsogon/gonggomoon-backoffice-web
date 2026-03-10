import { INDUSTRY_CONFIG } from '@/features/industry/constants';
import type { IndustryIconConfig } from '@/features/industry/types';
import { Grid2X2 } from 'lucide-react';

const DEFAULT_ICON_CONFIG: IndustryIconConfig = {
  icon: Grid2X2,
  iconColor: '#8b95a1',
  bgColor: '#f2f4f6',
};

export default function getIndustryIconConfig(industryName: string): IndustryIconConfig {
  return INDUSTRY_CATEGORY_ICON_CONFIG[industryName] ?? DEFAULT_ICON_CONFIG;
}

export const INDUSTRY_CATEGORY_ICON_CONFIG: Record<string, IndustryIconConfig> = Object.values(
  INDUSTRY_CONFIG,
).reduce<Record<string, IndustryIconConfig>>((acc, config) => {
  const { label, ...iconConfig } = config;
  acc[label] = iconConfig;

  return acc;
}, {});

const { label: _otherLabel, ...defaultIndustryIconConfig } = INDUSTRY_CONFIG.OTHER;

export const DEFAULT_INDUSTRY_ICON_CONFIG: IndustryIconConfig = defaultIndustryIconConfig;
