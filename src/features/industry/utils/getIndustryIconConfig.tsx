import { INDUSTRY_CATEGORY_ICON_CONFIG } from '@/features/industry/constants';
import type { IndustryIconConfig } from '@/features/industry/types';
import { Grid2X2 } from 'lucide-react';

const DEFAULT_ICON_CONFIG: IndustryIconConfig = {
  icon: Grid2X2,
  iconColor: '#8b95a1',
  bgColor: '#f2f4f6',
};

export default function getIndustryIconConfig(industryId: number): IndustryIconConfig {
  return INDUSTRY_CATEGORY_ICON_CONFIG[industryId] ?? DEFAULT_ICON_CONFIG;
}
