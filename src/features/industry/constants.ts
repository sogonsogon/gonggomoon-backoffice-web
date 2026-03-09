import {
  Grid2X2,
  MonitorPlay,
  ShoppingCart,
  Landmark,
  Truck,
  Bot,
  HeartPulse,
  Factory,
} from 'lucide-react';
import type { IndustryIconConfig, IndustryVersionStatus } from '@/features/industry/types';

export const VERSION_STATUS_LABELS: Record<IndustryVersionStatus, string> = {
  PUBLISHED: '발행됨',
  SAVED: '저장됨',
};

export const INDUSTRY_ICON_MAP: Record<string, IndustryIconConfig> = {
  커머스: { icon: ShoppingCart, iconColor: '#f5bf31', bgColor: '#fffce8' },
  핀테크: { icon: Landmark, iconColor: '#3182f6', bgColor: '#e8f3ff' },
  '미디어/콘텐츠': { icon: MonitorPlay, iconColor: '#f531ce', bgColor: '#ffe8ff' },
  모빌리티: { icon: Truck, iconColor: '#f58031', bgColor: '#f8efe8' },
  AI: { icon: Bot, iconColor: '#a234c7', bgColor: '#f9f0fc' },
  '헬스케어/바이오': { icon: HeartPulse, iconColor: '#f04452', bgColor: '#ffeeee' },
  제조: { icon: Factory, iconColor: '#6b7684', bgColor: '#f2f4f6' },
  기타: { icon: Grid2X2, iconColor: '#8b95a1', bgColor: '#f2f4f6' },
};
