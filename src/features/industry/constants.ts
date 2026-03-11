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
import type {
  IndustryIconConfig,
  IndustryType,
  IndustryAnalysisStatus,
} from '@/features/industry/types';

export const INDUSTRY_CONFIG: Record<IndustryType, { label: string } & IndustryIconConfig> = {
  COMMERCE: { label: '커머스', icon: ShoppingCart, iconColor: '#f5bf31', bgColor: '#fffce8' },
  FINTECH_FINANCIAL: {
    label: '핀테크/금융',
    icon: Landmark,
    iconColor: '#3182f6',
    bgColor: '#e8f3ff',
  },
  MEDIA_CONTENT: {
    label: '미디어/콘텐츠',
    icon: MonitorPlay,
    iconColor: '#f531ce',
    bgColor: '#ffe8ff',
  },
  MOBILITY_LOGISTICS: {
    label: '모빌리티/물류',
    icon: Truck,
    iconColor: '#f58031',
    bgColor: '#f8efe8',
  },
  AI: { label: 'AI', icon: Bot, iconColor: '#a234c7', bgColor: '#f9f0fc' },
  HEALTHCARE_BIO: {
    label: '헬스케어/바이오',
    icon: HeartPulse,
    iconColor: '#f04452',
    bgColor: '#ffeeee',
  },
  MANUFACTURING_INDUSTRY: {
    label: '제조업',
    icon: Factory,
    iconColor: '#6b7684',
    bgColor: '#f2f4f6',
  },
  OTHER: { label: '기타', icon: Grid2X2, iconColor: '#8b95a1', bgColor: '#f2f4f6' },
};

export const INDUSTRY_TYPE_OPTIONS = Object.entries(INDUSTRY_CONFIG).map(([value, { label }]) => ({
  value: value as IndustryType,
  label,
}));

export const ANALYSIS_STATUS_LABELS: Record<IndustryAnalysisStatus, string> = {
  PUBLISHED: '발행됨',
  SAVED: '저장됨',
};
