import { mockCompanies, mockRecruitments } from '@/mocks';
import Link from 'next/link';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/cn';
import { PUBLIC_STATUS_BADGE, PUBLIC_STATUS_LABELS } from '../constants';

export default function RecruitmentList() {
  const rows = mockRecruitments.filter(
    (item) => item.status === 'POSTED' || item.status === 'ANALYSIS_DONE',
  );

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">채용 기간</div>
        <div className="w-28 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">상태</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.map((item, i) => {
        const companyName =
          mockCompanies.find((c) => c.companyId === item.companyId)?.companyName ?? '-';
        return (
          <div
            key={item.recruitmentId}
            className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
          >
            <div className="w-14 px-3 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
            <div className="w-44 px-3 text-sm text-ds-grey-900 shrink-0">{companyName}</div>
            <div className="flex-1 px-3 text-sm text-ds-grey-900 truncate">{item.title}</div>
            <div className="w-48 px-3 text-[13px] text-ds-grey-700 shrink-0">
              {item.startDate ?? '-'} ~ {item.dueDate ?? '상시'}
            </div>
            <div className="w-28 px-3 shrink-0">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-sm font-medium ${PUBLIC_STATUS_BADGE[item.status] ?? 'bg-ds-grey-100 text-ds-grey-600'}`}
              >
                {PUBLIC_STATUS_LABELS[item.status] ?? item.status}
              </span>
            </div>
            <div className="w-48 px-3 flex items-center gap-1.5 shrink-0">
              <Link
                href={`https://gonggomoon.com/recruitment/${item.recruitmentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'text-ds-grey-700',
                )}
              >
                상세보기
              </Link>
              <Button size="sm" variant="outline" className="text-ds-badge-red-text">
                삭제
              </Button>
            </div>
          </div>
        );
      })}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}
