import Link from 'next/link';
import {
  ChevronRight,
  MonitorPlay,
  ShoppingCart,
  Landmark,
  Truck,
  Bot,
  HeartPulse,
  Factory,
  Grid2X2,
} from 'lucide-react';
import { TopBar } from '@/shared/components/layout/TopBar';
import { ContentHeader } from '@/shared/components/layout/ContentHeader';
import { mockIndustries, mockIndustriesVersion } from '@/mocks';
import { IndustryAddButton } from '@/features/industry/components/IndustryAddButton';
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

export default function IndustryPage() {
  return (
    <>
      <TopBar title="산업군 관리" breadcrumb="산업 카테고리를 관리합니다" />

      <main className="flex-1 overflow-auto bg-ds-grey-100 p-7 flex flex-col gap-6">
        <ContentHeader
          title="산업군 목록"
          description={`총 ${mockIndustries.length}개 카테고리가 등록되어 있습니다`}
          actions={<IndustryAddButton />}
        />

        {/* Industry Grid */}
        <div className="grid grid-cols-4 gap-3">
          {mockIndustries.map((item) => {
            const versionCount = mockIndustriesVersion.filter(
              (v) => v.industryId === item.industryId,
            ).length;
            const config = INDUSTRY_ICON_MAP[item.name] ?? DEFAULT_ICON_CONFIG;
            const Icon = config.icon;
            return (
              <IndustryCard
                key={item.industryId}
                id={item.industryId}
                label={item.name}
                versionCount={versionCount}
                icon={Icon}
                iconColor={config.iconColor}
                bgColor={config.bgColor}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

function IndustryCard({
  id,
  label,
  versionCount,
  icon: Icon,
  iconColor,
  bgColor,
}: {
  id: number;
  label: string;
  versionCount: number;
  icon: ElementType;
  iconColor: string;
  bgColor: string;
}) {
  return (
    <Link
      href={`/industry/${id}`}
      className="bg-white rounded-[10px] p-5 flex flex-col justify-between border border-ds-grey-200 shadow-[0_1px_3px_0_rgba(0,29,58,0.08)] h-35"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <Icon size={20} style={{ color: iconColor }} />
      </div>
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-semibold text-ds-grey-900">{label}</span>
        <ChevronRight size={14} className="text-ds-grey-500 shrink-0" />
      </div>
      <span className="text-xs text-ds-grey-500">분석 버전 {versionCount}건</span>
    </Link>
  );
}
