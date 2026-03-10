import type { JobType, PostStatus, RequestStatus } from '@/features/recruitment/types';

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DEVOPS: 'DevOps',
  DATA_ANALYSIS: '데이터 분석',
  AI: 'AI',
  INFORMATION_SECURITY: '정보보안',
  DESIGN: '디자인',
  PM_PO: 'PM/PO',
  QA: 'QA',
};

export const ANALYSIS_STATUS_LABELS: Record<Exclude<PostStatus, 'POSTED'>, string> = {
  ANALYSIS_DONE: '검토 대기',
  ANALYZING: '분석 중',
};

export const ANALYSIS_STATUS_BADGE: Record<PostStatus, string> = {
  ANALYSIS_DONE: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYZING: 'bg-ds-badge-yellow-bg text-ds-badge-yellow-text',
  POSTED: 'bg-ds-grey-100 text-ds-grey-600',
};

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: '요청됨',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
};

export const REQUEST_STATUS_BADGE: Record<RequestStatus, string> = {
  PENDING: 'bg-ds-badge-blue-bg text-ds-badge-blue-text',
  APPROVED: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  REJECTED: 'bg-ds-badge-grey-bg text-ds-badge-grey-text',
};

export const PLATFORM_TYPE_LABELS: Record<string, string> = {
  SARAMIN: '사람인',
  WANTED: '원티드',
  JABKOREA: '잡코리아',
  JASOSEOL: '자소설닷컴',
};
