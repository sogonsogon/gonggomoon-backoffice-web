import Link from 'next/link';
import { ChevronRight, Grid2X2, MonitorPlay, ShoppingCart, Landmark, Truck, Bot, HeartPulse, Factory } from 'lucide-react';
import type { ElementType } from 'react';

type IndustryIconConfig = {
  icon: ElementType;
  iconColor: string;
  bgColor: string;
};

const INDUSTRY_ICON_MAP: Record<string, IndustryIconConfig> = {
  커머스: { icon: ShoppingCart, iconColor: '#f5bf31', bgColor: '#fffce8' },
  핀테크: { icon: Landmark, iconColor: '#3182f6', bgColor: '#e8f3ff' },
  '미디어/콘텐츠': { icon: MonitorPlay, iconColor: '#f531ce', bgColor: '#ffe8ff' },
  모빌리티: { icon: Truck, iconColor: '#f58031', bgColor: '#f8efe8' },
  AI: { icon: Bot, iconColor: '#a234c7', bgColor: '#f9f0fc' },
  '헬스케어/바이오': { icon: HeartPulse, iconColor: '#f04452', bgColor: '#ffeeee' },
  제조: { icon: Factory, iconColor: '#6b7684', bgColor: '#f2f4f6' },
  기타: { icon: Grid2X2, iconColor: '#8b95a1', bgColor: '#f2f4f6' },
};

const DEFAULT_ICON_CONFIG: IndustryIconConfig = {
  icon: Grid2X2,
  iconColor: '#8b95a1',
  bgColor: '#f2f4f6',
};

export function getIndustryIconConfig(name: string): IndustryIconConfig {
  return INDUSTRY_ICON_MAP[name] ?? DEFAULT_ICON_CONFIG;
}

interface IndustryCardProps {
  id: number;
  label: string;
  versionCount: number;
}

export default function IndustryCard({ id, label, versionCount }: IndustryCardProps) {
  const config = getIndustryIconConfig(label);
  const Icon = config.icon;

  return (
    <Link
      href={`/industry/${id}`}
      className="bg-white rounded-[10px] p-5 flex flex-col justify-between border border-ds-grey-200 shadow-[0_1px_3px_0_rgba(0,29,58,0.08)] h-35"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: config.bgColor }}
      >
        <Icon size={20} style={{ color: config.iconColor }} />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-semibold text-ds-grey-900">{label}</span>
        <ChevronRight size={14} className="text-ds-grey-500 shrink-0" />
      </div>
      <span className="text-xs text-ds-grey-500">분석 버전 {versionCount}건</span>
    </Link>
  );
}
