import { mockCompanies, mockRecruitments } from '@/mocks';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { ANALYSIS_STATUS_BADGE, ANALYSIS_STATUS_LABELS } from '../constants';

export default function RecruitmentAnalysisList() {
  const rows = mockRecruitments.filter((item) =>
    ['ANALYZING', 'ANALYSIS_DONE', 'POSTED'].includes(item.status as string),
  );

  return (
    <div className="bg-white rounded-lg border border-ds-grey-200 overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center h-11 bg-ds-grey-50 border-b border-ds-grey-200">
        <div className="w-14 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">No.</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">기업명</div>
        <div className="flex-1 px-3 text-[13px] font-medium text-ds-grey-600">공고 제목</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">요청 상태</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">등록일</div>
        <div className="w-48 px-3 text-[13px] font-medium text-ds-grey-600 shrink-0">액션</div>
      </div>

      {rows.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-sm text-ds-grey-400">
          진행 중인 분석 공고가 없습니다.
        </div>
      ) : (
        rows.map((item, i) => {
          const companyName =
            mockCompanies.find((c) => c.companyId === item.companyId)?.companyName ?? '-';
          const statusStr = item.status as string;
          const isAnalyzing = statusStr === 'ANALYZING';
          return (
            <div
              key={item.recruitmentId}
              className={`flex items-center h-14 ${i < rows.length - 1 ? 'border-b border-ds-grey-200' : ''}`}
            >
              <div className="w-14 px-3 text-[13px] text-ds-grey-600 shrink-0">{i + 1}</div>
              <div className="w-42.5 px-3 text-sm text-ds-grey-900 shrink-0">{companyName}</div>
              <div className="flex-1 px-3 text-sm text-ds-grey-900 truncate">{item.title}</div>
              <div className="w-35 px-3 shrink-0">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${ANALYSIS_STATUS_BADGE[statusStr] ?? 'bg-ds-grey-100 text-ds-grey-600'}`}
                >
                  {ANALYSIS_STATUS_LABELS[statusStr] ?? statusStr}
                </span>
              </div>
              <div className="w-32.5 px-3 text-[13px] text-ds-grey-700 shrink-0">
                {item.createdAt.split('T')[0].replace(/-/g, '.')}
              </div>
              <div className="w-45 px-3 flex items-center gap-1.5 shrink-0">
                {isAnalyzing ? (
                  <Button disabled size="xs" variant="outline" className="text-ds-grey-500">
                    분석중
                  </Button>
                ) : (
                  <>
                    <Button asChild size="xs">
                      <Link href={`/recruitment/confirm/${item.recruitmentId}`}>검토</Link>
                    </Button>
                    <Button size="xs" variant="outline" className="text-ds-badge-red-text">
                      삭제
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Pagination Footer */}
      <div className="h-13 border-t border-ds-grey-200 flex items-center justify-center gap-1 px-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-ds-grey-900 text-white text-sm font-medium">
          1
        </span>
      </div>
    </div>
  );
}
