import {
  DEFAULT_INDUSTRY_ICON_CONFIG,
  INDUSTRY_CATEGORY_ICON_CONFIG,
} from '@/features/industry/constants';
import type { IndustryIconConfig } from '@/features/industry/types';

export default function getIndustryIconConfig(industryName: string): IndustryIconConfig {
  return INDUSTRY_CATEGORY_ICON_CONFIG[industryName] ?? DEFAULT_INDUSTRY_ICON_CONFIG;
}
