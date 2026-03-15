import SearchForm, { FilterConfig } from '@/shared/components/ui/SearchForm';
import { ANALYSIS_STATUS_LABELS, REQUEST_STATUS_LABELS } from '@/features/recruitment/constants';

type Tab = 'public' | 'analysis' | 'requests';

interface RecruitmentFilterToolbarProps {
  tab: Tab;
}

export default function RecruitmentFilterToolbar({ tab }: RecruitmentFilterToolbarProps) {
  const statusFilter = STATUS_FILTERS[tab];

  return (
    <SearchForm
      searchable={tab !== 'requests'}
      searchParamKey="title"
      searchPlaceholder="공고 제목 검색..."
      filters={statusFilter ? [statusFilter] : []}
    />
  );
}

const ALL_OPTION = { value: 'all', label: '상태 전체' };

const STATUS_FILTERS: Partial<Record<Tab, FilterConfig>> = {
  analysis: {
    paramKey: 'analysisStatus',
    placeholder: '상태 전체',
    allValue: 'all',
    width: 'w-32',
    options: [
      ALL_OPTION,
      ...Object.entries(ANALYSIS_STATUS_LABELS).map(([value, label]) => ({ value, label })),
    ],
  },
  requests: {
    paramKey: 'requestStatus',
    placeholder: '상태 전체',
    allValue: 'all',
    width: 'w-32',
    options: [
      ALL_OPTION,
      ...Object.entries(REQUEST_STATUS_LABELS).map(([value, label]) => ({ value, label })),
    ],
  },
};
