'use server';

export async function approveRecruitmentRequest(__requestId: number) {
  // TODO: POST /api/v1/admin/posts/requests/{id}/approves 공고 게시 요청 승인/AI 분석 대기 요청 위치
}

export async function rejectRecruitmentRequest(_requestId: number) {
  // TODO: PATCH /api/v1/admin/posts/requests/{id}/rejects 공고 게시 요청 거절 요청 위치
}

export async function publishRecruitment(_postId: number) {
  // TODO: PATCH /api/v1/admin/posts/{id}/publishes 공고 발행 요청 위치
}

export async function deleteRecruitment(_postId: number) {
  // TODO: DELETE /api/v1/posts/{id} 공고 삭제 요청 위치
}

export async function getRecruitments() {
  // TODO: GET /api/v1/posts 공고 목록 조회 요청 위치
}

export async function getRecruitment(_postId: number) {
  // TODO: GET /api/v1/posts/{id} 공고 상세 조회 요청 위치
}

export async function getRecruitmentRequests() {
  // TODO: GET /api/v1/admin/posts/requests 공고 게시 요청 목록 조회 요청 위치
}
