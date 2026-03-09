import { INDUSTRY_CONFIG } from '@/features/industry/constants';
import type { IndustryIconConfig, IndustryType } from '@/features/industry/types';
import { Grid2X2 } from 'lucide-react';

const DEFAULT_ICON_CONFIG: IndustryIconConfig = {
  icon: Grid2X2,
  iconColor: '#8b95a1',
  bgColor: '#f2f4f6',
};

export default function getIndustryIconConfig(industryType: IndustryType): IndustryIconConfig {
  return INDUSTRY_CONFIG[industryType] ?? DEFAULT_ICON_CONFIG;
}
