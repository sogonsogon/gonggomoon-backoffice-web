'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Briefcase, FileText, ChevronRight, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/lib/cn';
import { useLogout } from '@/features/auth/queries';

const navItems = [
  //{ label: '대시보드', icon: LayoutDashboard, href: '/' }, TODO: 대시보드 페이지 개발 후 활성화
  { label: '공고 관리', icon: FileText, href: '/recruitment' },
  { label: '산업군 관리', icon: Building2, href: '/industry' },
  { label: '기업 관리', icon: Briefcase, href: '/company' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { mutate: handleLogout, isPending } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarContent = (
    <aside className="w-64 shrink-0 bg-white flex flex-col p-2 gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2 rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="공고문 로고" style={{ height: 28, width: 'auto' }} />
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden text-ds-grey-600"
          onClick={() => setIsOpen(false)}
          aria-label="메뉴 닫기"
        >
          <X size={18} />
        </Button>
      </div>

      {/* Nav */}
      <div className="flex-1 flex flex-col gap-0.5">
        <div className="px-2 py-1">
          <span className="text-xs text-ds-grey-500">관리자</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                'h-auto w-full justify-start gap-2 px-3 py-2 text-sm text-ds-grey-900 hover:bg-ds-grey-100',
                isActive && 'bg-ds-grey-100 hover:bg-ds-grey-100',
              )}
              onClick={() => setIsOpen(false)}
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
            aria-label="로그아웃"
            disabled={isPending}
            onClick={() => handleLogout()}
          >
            <LogOut size={14} />
          </Button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden fixed top-3 left-3 z-50 bg-white border border-ds-grey-200 shadow-sm text-ds-grey-700"
          onClick={() => setIsOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={isOpen}
          aria-controls="mobile-sidebar"
        >
          <Menu size={18} />
        </Button>
      )}

      {/* lg 이상: static sidebar */}
      <div className="hidden lg:flex h-full border-r border-ds-grey-200">
        {sidebarContent}
      </div>

      {/* lg 미만: overlay sidebar */}
      {isOpen && (
        <>
          {/* backdrop */}
          <button
            className="lg:hidden fixed inset-0 z-40 bg-black/40 cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') setIsOpen(false);
            }}
            aria-label="메뉴 닫기"
            tabIndex={0}
          />
          {/* drawer */}
          <div id="mobile-sidebar" className="lg:hidden fixed inset-y-0 left-0 z-50 border-r border-ds-grey-200 shadow-xl">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}
