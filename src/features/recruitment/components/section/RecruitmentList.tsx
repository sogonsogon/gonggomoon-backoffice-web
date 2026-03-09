import { mockCompanies, mockRecruitments } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

export default function RecruitmentList() {
  const rows = mockRecruitments.filter(
    (item) => item.status === 'POSTED' || item.status === 'ANALYSIS_DONE',
  );
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">채용 기간</div>
        <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">상태</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.map((item, i) => {
        const companyName =
          mockCompanies.find((c) => c.companyId === item.companyId)?.companyName ?? '-';
        const dueDateStr = item.dueDate?.slice(0, 10) ?? null;
        const isAlwaysOpen = item.status === 'POSTED' && dueDateStr === null;
        const isRecruitingOpen =
          item.status === 'POSTED' && Boolean(dueDateStr && dueDateStr >= todayStr);

        const publicStatusLabel = isAlwaysOpen
          ? '상시'
          : isRecruitingOpen
            ? '채용 진행 중'
            : '채용 마감';

        const publicStatusBadge = isAlwaysOpen
          ? 'bg-ds-grey-100 text-ds-grey-600'
          : isRecruitingOpen
            ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
            : 'bg-ds-badge-red-bg text-ds-badge-red-text';

        return (
          <div
            key={item.recruitmentId}
            className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
          >
            <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
            <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">{companyName}</div>
            <div className="flex-1 px-4 text-sm text-ds-grey-900 truncate">{item.title}</div>
            <div className="w-48 px-4 text-[13px] text-ds-grey-700 shrink-0">
              {item.startDate ?? '-'} ~ {item.dueDate ?? '상시'}
            </div>
            <div className="w-28 px-4 shrink-0">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${publicStatusBadge}`}
              >
                {publicStatusLabel}
              </span>
            </div>
            <div className="w-48 px-4 flex items-center gap-1.5 shrink-0">
              <Link
                href={`https://gonggomoon.com/recruitment/${item.recruitmentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center justify-center rounded-md border border-ds-grey-200 bg-white px-4 text-sm font-medium text-ds-grey-700 no-underline visited:text-ds-grey-700 hover:bg-ds-grey-50"
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
