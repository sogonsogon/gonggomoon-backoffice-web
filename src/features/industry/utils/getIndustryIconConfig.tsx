import { INDUSTRY_ICON_MAP } from '@/features/industry/constants';
import { IndustryIconConfig } from '@/features/industry/types';
import { Grid2X2 } from 'lucide-react';

const DEFAULT_ICON_CONFIG: IndustryIconConfig = {
  icon: Grid2X2,
  iconColor: '#8b95a1',
  bgColor: '#f2f4f6',
};

export default function getIndustryIconConfig(name: string): IndustryIconConfig {
  return INDUSTRY_ICON_MAP[name] ?? DEFAULT_ICON_CONFIG;
}
