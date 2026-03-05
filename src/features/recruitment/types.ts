import { IndustryType } from '@/features/industry/types';

export type JobType =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DEVOPS'
  | 'DATA_ANALYSIS'
  | 'AI'
  | 'INFORMATION_SECURITY'
  | 'DESIGN'
  | 'PM_PO'
  | 'QA';

export type PlatformType = 'SARAMIN' | 'WANTED' | 'JABKOREA' | 'JASOSEOL';

export type PostStatus = 'ANALYZING' | 'ANALYSIS_DONE' | 'POSTED'; // 공고 분석 상태

export type Recruitment = {
  recruitmentId: number;
  title: string;
  companyId: number;
  jobType: JobType;
  industryType?: IndustryType;
  status: PostStatus;
  url?: string;
  startDate?: string | null;
  dueDate?: string | null;
  createdAt: string;
};

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'; // 공고 요청 상태

export type RecruitmentRequest = {
  requestId: number;
  requestUserId?: number;
  platformType: string;
  requestUrl: string;
  status: RequestStatus;
  createdAt?: string;
};
