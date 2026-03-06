'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Briefcase, FileText, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/cn';

const navItems = [
  { label: '대시보드', icon: LayoutDashboard, href: '/' },
  { label: '산업군 관리', icon: Building2, href: '/industry' },
  { label: '기업 관리', icon: Briefcase, href: '/company' },
  { label: '공고 관리', icon: FileText, href: '/recruitment' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-ds-grey-200 flex flex-col p-2 gap-4 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-2 rounded-md">
        <div className="w-7 h-7 rounded-lg bg-ds-grey-900 flex items-center justify-center">
          <span className="text-white text-[11px] font-bold">G</span>
        </div>
        <span className="text-[15px] font-semibold text-ds-grey-900">관리자페이지</span>
      </div>

      {/* Nav */}
      <div className="flex-1 flex flex-col gap-0.5">
        <div className="px-2 py-1">
          <span className="text-xs text-ds-grey-500">관리자</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                'h-auto w-full justify-start gap-2 px-3 py-2 text-sm text-ds-grey-900 hover:bg-ds-grey-100',
                isActive && 'bg-ds-grey-100 hover:bg-ds-grey-100',
              )}
            >
              <Link href={item.href}>
                <Icon size={16} className="shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronRight size={14} className="text-ds-grey-400" />
              </Link>
            </Button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="rounded-md bg-white p-2">
        <Separator className="mb-2 bg-ds-grey-200" />
        <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-ds-grey-900 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">관</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-ds-grey-900 truncate">관리자</span>
            <span className="text-[11px] text-ds-grey-500 truncate">admin@gonggomoon.com</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-ds-grey-400 hover:text-ds-grey-600"
        >
          <LogOut size={14} />
        </Button>
        </div>
      </div>
    </aside>
  );
}
