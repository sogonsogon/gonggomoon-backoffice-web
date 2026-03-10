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

export type PostStatus = 'ANALYZING' | 'ANALYSIS_DONE' | 'POSTED'; // 공고 분석 상태

export type RecruitmentAnalysis = {
  summary: string; // 공고 한 줄 요약
  companySummary: string; // 회사 한 줄 소개
  rolesResponsibilities: string[]; // R&R
  requiredSkills: string[]; // 필수 역량
  highlightPoints: string[]; // 차별 포인트
  hiddenKeywords: string[]; // 숨은 키워드
  recommendedActions: string[]; // 추천 활동
};

export type Recruitment = {
  recruitmentId: number;
  companyName: string;
  postTitle: string;
  experienceLevel: number;
  companyId: number;
  jobType: JobType;
  industryId?: number;
  industryName?: string;
  status: PostStatus;
  recruitmentUrl?: string;
  startDate?: string | null;
  dueDate?: string | null;
  createdAt: string;
  postDescription: string;
  analysis?: RecruitmentAnalysis;
};

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED'; // 공고 요청 상태

export type RecruitmentRequest = {
  requestId: number;
  requestUserId?: number;
  platformId: number;
  platformName: string;
  requestUrl: string;
  status: RequestStatus;
  createdAt?: string;
};

export type CreateRecruitment = {
  companyName: string;
  postTitle: string;
  startDate?: string | null;
  dueDate?: string | null;
  experienceLevel: number;
  jobType: JobType;
  postDescription: string;
  recruitmentUrl?: string;
};
