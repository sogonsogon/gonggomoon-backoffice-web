import type {
  JobType,
  RecruitmentRequestStatus,
  RecruitmentStatus,
} from '@/features/recruitment/types';

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

export const ANALYSIS_STATUS_LABELS: Record<Exclude<RecruitmentStatus, 'PUBLISHED'>, string> = {
  PENDING: '등록 대기',
  ANALYZING: '분석 중',
  ANALYZED: '검토 대기',
  ANALYSIS_FAILED: '분석 실패',
  REJECTED: '거절됨',
  EXPIRED: '만료됨',
};

export const ANALYSIS_STATUS_BADGE: Record<RecruitmentStatus, string> = {
  PENDING: 'bg-ds-badge-blue-bg text-ds-badge-blue-text',
  ANALYZING: 'bg-ds-badge-yellow-bg text-ds-badge-yellow-text',
  ANALYZED: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYSIS_FAILED: 'bg-ds-badge-red-bg text-ds-badge-red-text',
  PUBLISHED: 'bg-ds-grey-100 text-ds-grey-600',
  REJECTED: 'bg-ds-badge-red-bg text-ds-badge-red-text',
  EXPIRED: 'bg-ds-badge-grey-bg text-ds-badge-grey-text',
};

export const REQUEST_STATUS_LABELS: Record<RecruitmentRequestStatus, string> = {
  PENDING: '요청됨',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
};

export const REQUEST_STATUS_BADGE: Record<RecruitmentRequestStatus, string> = {
  PENDING: 'bg-ds-badge-blue-bg text-ds-badge-blue-text',
  APPROVED: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  REJECTED: 'bg-ds-badge-grey-bg text-ds-badge-grey-text',
};
