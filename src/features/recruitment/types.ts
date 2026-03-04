import { IndustryType } from '@/features/industry/types';

export type JobType =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DEVOPS'
  | 'DATA'
  | 'AI'
  | 'SECURITY'
  | 'DESIGN'
  | 'PM/PO'
  | 'QA';

export type RecruitmentStatus =
  | 'OPEN'
  | 'CLOSED'
  | 'DRAFT'
  | 'REVIEW'
  | 'ANALYZING'
  | 'PUBLISH_WAITING'
  | 'REJECTED';

export type Recruitment = {
  no?: number;
  recruitmentId: number;
  title: string;
  companyName: string;
  companyId: number;
  jobType: JobType;
  industryType?: IndustryType;
  status: RecruitmentStatus;
  url?: string;
  startDate?: string | null;
  dueDate?: string | null;
  createdAt: string;
};

export type RecruitmentRequest = {
  requestId: number;
  requestUserId?: number;
  platformType: string;
  requestUrl: string;
  status: 'requested' | 'approved' | 'rejected';
  createdAt?: string;
};
