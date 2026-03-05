import { Industry, IndustryVersion } from '@/features/industry/types';

export const mockIndustries: Industry[] = [
  { industryId: 1, name: '커머스' },
  { industryId: 2, name: '핀테크' },
  { industryId: 3, name: '미디어/콘텐츠' },
  { industryId: 4, name: '모빌리티' },
  { industryId: 5, name: 'AI' },
  { industryId: 6, name: '헬스케어/바이오' },
  { industryId: 7, name: '제조' },
  { industryId: 999, name: '기타' },
];

export const mockIndustriesVersion: IndustryVersion[] = [
  {
    versionId: 1,
    industryId: 1,
    analyzedYear: 2024,
    createdAt: '2024-01-01T00:00:00Z',
    editedAt: '2024-03-01T00:00:00Z',
    status: 'PUBLISHED',

    keyword: ['클라우드', '데이터 플랫폼'],

    marketSize: '450억 규모',

    industryTrends: [
      '클라우드 네이티브 전환 가속',
      '데이터 기반 의사결정 시스템 확산',
      'DevOps 기반 개발 문화 확대',
    ],

    risk: ['클라우드 벤더 종속성 문제', '데이터 보안 규제 강화'],

    rival: ['AWS', 'Microsoft Azure', 'Google Cloud', '네이버클라우드'],

    hiringTrends: [
      '백엔드 개발자 채용 확대',
      '데이터 엔지니어 수요 증가',
      '클라우드 인프라 엔지니어 채용 확대',
    ],

    investmentStrategy: [
      '클라우드 인프라 확장 투자',
      '데이터 플랫폼 구축 투자',
      'SaaS 서비스 확대',
    ],
  },

  {
    versionId: 2,
    industryId: 1,
    analyzedYear: 2025,
    createdAt: '2025-01-01T00:00:00Z',
    editedAt: '2025-12-01T00:00:00Z',
    status: 'SAVED',
    keyword: ['생성형 AI', 'MLOps', 'AI 플랫폼'],

    marketSize: '520억 규모',

    industryTrends: [
      '생성형 AI 기반 서비스 확대',
      'MLOps 도입으로 AI 운영 자동화 증가',
      'AI 기반 개발 생산성 도구 확산',
    ],

    risk: ['AI 윤리 규제 확대', 'AI 모델 데이터 저작권 문제'],

    rival: ['OpenAI', 'Anthropic', 'AWS', 'Microsoft Azure', '네이버클라우드'],

    hiringTrends: [
      'AI 엔지니어 채용 증가',
      'MLOps 엔지니어 수요 확대',
      '데이터 사이언티스트 채용 증가',
    ],

    investmentStrategy: [
      '생성형 AI 모델 개발 투자',
      'AI 플랫폼 구축 투자',
      'AI 데이터 인프라 투자',
    ],
  },

  {
    versionId: 3,
    industryId: 1,
    analyzedYear: 2026,
    createdAt: '2026-01-01T00:00:00Z',
    editedAt: '2026-03-01T00:00:00Z',
    status: 'PUBLISHED',
    keyword: ['AI 인프라', '엣지컴퓨팅', '데이터 플랫폼'],

    marketSize: '600억 규모',

    industryTrends: [
      '생성형 AI 도입 가속으로 개발 생산성 혁신',
      '멀티클라우드 전략 확산',
      'AI 인프라 및 데이터 플랫폼 경쟁 심화',
    ],

    risk: ['EU AI Act 규제 확대', '개인정보보호법 강화', 'AI 모델 책임성 규제 증가'],

    rival: ['네이버클라우드', '카카오엔터프라이즈', 'AWS', 'Microsoft Azure'],

    hiringTrends: [
      'AI 엔지니어 수요 급증',
      'MLOps 엔지니어 채용 확대',
      'AI 인프라 엔지니어 채용 증가',
    ],

    investmentStrategy: [
      '생성형 AI 인프라 투자 확대',
      '엣지 컴퓨팅 기술 투자',
      '양자컴퓨팅 연구 투자',
    ],
  },
];
