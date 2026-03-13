// 유저 role
export type UserRole = 'MEMBER' | 'ADMIN';

// 유저
export type User = {
  email: string;
  name: string;
  profileImageUrl: string | null;
  roles: UserRole[];
};

// 로그인 응답
export type LoginResponse = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

// 로그인 요청
export type LoginRequest = {
  email: string;
  password: string;
};
