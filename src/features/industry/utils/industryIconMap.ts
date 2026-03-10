import { INDUSTRY_CONFIG } from '@/features/industry/constants';
import type { IndustryIconConfig } from '@/features/industry/types';

export const INDUSTRY_CATEGORY_ICON_CONFIG: Record<string, IndustryIconConfig> = Object.values(
  INDUSTRY_CONFIG,
).reduce<Record<string, IndustryIconConfig>>((acc, config) => {
  const { label, ...iconConfig } = config;
  acc[label] = iconConfig;

  return acc;
}, {});

const { label: _otherLabel, ...defaultIndustryIconConfig } = INDUSTRY_CONFIG.OTHER;

export const DEFAULT_INDUSTRY_ICON_CONFIG: IndustryIconConfig = defaultIndustryIconConfig;
