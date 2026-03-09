import { mockRecruitmentRequests } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import { PLATFORM_TYPE_LABELS, REQUEST_STATUS_LABELS } from '@/features/recruitment/constants';

export default function RecruitmentRequestList() {
  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-44 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">플랫폼</div>
        <div className="flex-1 px-4 text-[13px] font-medium text-ds-grey-600">공고 URL</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-28 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">요청일</div>
        <div className="w-48 px-4 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {mockRecruitmentRequests.map((item, i) => {
        const status = item.status;
        return (
          <div
            key={item.requestId}
            className={`flex items-center h-14 ${i < mockRecruitmentRequests.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
          >
            <div className="w-14 px-4 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
            <div className="w-44 px-4 text-sm text-ds-grey-900 shrink-0">
              {PLATFORM_TYPE_LABELS[item.platformType] ?? item.platformType}
            </div>
            <div className="flex-1 px-4 text-[13px] text-primary truncate">
              <a href={item.requestUrl} target="_blank" rel="noopener noreferrer">
                {item.requestUrl}
              </a>
            </div>
            <div className="w-48 px-4 shrink-0">
              <span
                className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
                  status === 'APPROVED'
                    ? 'bg-ds-badge-green-bg text-ds-badge-green-text'
                    : status === 'REJECTED'
                      ? 'bg-ds-badge-grey-bg text-ds-badge-grey-text'
                      : 'bg-ds-badge-blue-bg text-ds-badge-blue-text'
                }`}
              >
                {REQUEST_STATUS_LABELS[status]}
              </span>
            </div>
            <div className="w-28 px-4 text-[13px] text-ds-grey-700 shrink-0">
              {item.createdAt ? item.createdAt.split('T')[0].replace(/-/g, '.') : '-'}
            </div>
            <div className="w-48 px-4 flex items-center gap-1.5 shrink-0">
              <Button size="sm" className="bg-ds-grey-900 text-white hover:bg-ds-grey-800">
                등록
              </Button>
              <Button size="sm" variant="outline" className="text-ds-badge-red-text">
                거절
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
