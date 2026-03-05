import { User } from '@/features/auth/types';

export const mockUser: User = {
  email: 'admin@example.com',
  name: '관리자',
  profileImageUrl: 'https://picsum.photos/seed/user1001/200/200',
  roles: ['ADMIN'],
};
