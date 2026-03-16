// ============ 공통 ============

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

export type RecruitmentStatus =
  | 'PENDING'
  | 'ANALYZING'
  | 'ANALYZED'
  | 'ANALYSIS_FAILED'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'EXPIRED';

export type RecruitmentRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// ============ 공고 요청 (requests) ============

// GET /api/v1/admin/posts/submissions - 게시 목록 아이템
export type RecruitmentRequest = {
  submissionId: number;
  userId: number;
  platformName: string;
  url: string;
  submissionStatus: RecruitmentRequestStatus;
  createdAt: string;
};

// GET /api/v1/admin/posts/submissions - query params
export type RecruitmentRequestListParams = {
  submissionStatus?: RecruitmentRequestStatus;
};

// GET /api/v1/admin/posts/submissions - 응답 data
// 참고: page, size, totalElements, totalPages는 응답 root level에 위치하여 data에 포함되지 않음
export type RecruitmentRequestListResponse = {
  content: RecruitmentRequest[];
};

// POST /api/v1/admin/posts/submissions/{submissionId}/approve - 요청 body
// POST /api/v1/admin/posts - 요청 body (동일 구조)
export type CreateRecruitmentRequest = {
  companyId: number;
  platformId: number;
  title: string;
  url: string;
  jobType: JobType;
  originalContent: string;
  experienceLevel: number;
  startDate: string;
  dueDate: string | null;
};

// PATCH /api/v1/admin/posts/submissions/{submissionId}/reject - 요청 body
export type RejectRecruitmentRequest = {
  rejectReason: string;
};

// ============ 공고 (posts) ============

export type RecruitmentAnalysis = {
  summary: string;
  companySummary: string;
  rolesResponsibilities: string[];
  requiredSkills: string[];
  highlightPoints: string[];
  hiddenKeywords: string[];
  recommendedActions: string[];
};

// GET /api/v1/admin/posts - 목록 아이템
export type RecruitmentSummary = {
  postId: number;
  companyId: number;
  companyName: string;
  platformName: string;
  postTitle: string;
  postStatus: RecruitmentStatus;
  startDate: string;
  dueDate: string | null;
};

export type PageInfo = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
};

// GET /api/v1/admin/posts - query params
export type GetRecruitmentListParams = {
  page?: number;
  size?: number;
  status?: RecruitmentStatus;
};

// GET /api/v1/admin/posts - 응답 data
export type RecruitmentListResponse = {
  content: RecruitmentSummary[];
  pageInfo: PageInfo;
};

// GET /api/v1/admin/posts/{postId} - 응답 data
export type RecruitmentDetail = {
  postId: number;
  companyId: number;
  industryId: number;
  companyName: string;
  industryName: string;
  postTitle: string;
  postUrl: string;
  experienceLevel: number;
  originalContent: string;
  jobType: JobType;
  status: RecruitmentStatus;
  startDate: string;
  dueDate: string | null;
  analysis?: RecruitmentAnalysis;
};
