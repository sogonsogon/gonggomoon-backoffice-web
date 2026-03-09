import type { JobType, PlatformType, PostStatus } from '@/features/recruitment/types';

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

export const ANALYSIS_STATUS_LABELS: Record<string, string> = {
  ANALYSIS_DONE: '검토 대기',
  ANALYZING: '분석 중',
  POSTED: '발행 대기',
};

export const ANALYSIS_STATUS_BADGE: Record<string, string> = {
  ANALYSIS_DONE: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYZING: 'bg-ds-badge-yellow-bg text-ds-badge-yellow-text',
  POSTED: 'bg-ds-grey-100 text-ds-grey-600',
};

export const PUBLIC_STATUS_LABELS: Partial<Record<PostStatus, string>> = {
  POSTED: '채용 진행 중',
  ANALYSIS_DONE: '채용 마감',
};

export const PUBLIC_STATUS_BADGE: Partial<Record<PostStatus, string>> = {
  POSTED: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYSIS_DONE: 'bg-ds-badge-grey-bg text-ds-badge-grey-text',
};

export const REQUEST_STATUS_LABELS: Record<string, string> = {
  PENDING: '요청됨',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
};

export const PLATFORM_TYPE_LABELS: Record<PlatformType, string> = {
  SARAMIN: '사람인',
  WANTED: '원티드',
  JABKOREA: '잡코리아',
  JASOSEOL: '자소설닷컴',
};
