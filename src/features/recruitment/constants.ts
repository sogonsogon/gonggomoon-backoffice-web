import type {
  JobType,
  RecruitmentAnalysisStatus,
  RecruitmentRequestStatus,
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

export const ANALYSIS_STATUS_LABELS: Record<RecruitmentAnalysisStatus, string> = {
  ANALYZING: '분석 중',
  ANALYZED: '검토 대기',
  ANALYSIS_FAILED: '분석 실패',
};

export const ANALYSIS_STATUS_BADGE: Record<RecruitmentAnalysisStatus, string> = {
  ANALYZING: 'bg-ds-badge-yellow-bg text-ds-badge-yellow-text',
  ANALYZED: 'bg-ds-badge-green-bg text-ds-badge-green-text',
  ANALYSIS_FAILED: 'bg-ds-badge-red-bg text-ds-badge-red-text',
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
