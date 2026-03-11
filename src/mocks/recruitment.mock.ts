import type { Recruitment, RecruitmentRequest } from '@/features/recruitment/types';

export const mockRecruitments: Recruitment[] = [
  {
    postId: 3001,
    postTitle: '프론트엔드 엔지니어 (커머스)',
    companyName: '커머스 플랫폼 주식회사',
    experienceLevel: 2,
    companyId: 11,
    jobType: 'FRONTEND',
    industryId: 1,
    industryName: 'COMMERCE',
    status: 'ANALYSIS_DONE',
    recruitmentUrl: 'https://example.com/jobs/3001',
    startDate: '2026-03-01',
    dueDate: '2026-03-31',
    createdAt: '2026-03-01T00:00:00.000Z',
    description:
      '커머스 플랫폼 사용자 경험 개선을 담당할 프론트엔드 엔지니어를 찾습니다. 경력 2년 이상의 경력자를 원합니다.', // 공고 원문

    analysis: {
      summary: '커머스 플랫폼 사용자 경험 개선을 담당할 프론트엔드 엔지니어를 찾습니다.',
      companySummary:
        '대규모 트래픽을 처리하는 커머스 플랫폼을 운영하며 데이터 기반 서비스 개선을 진행하는 기업입니다.',

      rolesResponsibilities: [
        '커머스 웹 서비스 프론트엔드 개발',
        '사용자 경험 개선을 위한 UI/UX 구현',
        '백엔드 API 연동 및 데이터 처리',
        '성능 최적화 및 코드 품질 개선',
      ],

      requiredSkills: [
        'React 또는 Next.js 경험',
        'TypeScript 사용 경험',
        'REST API 연동 경험',
        '웹 성능 최적화 경험',
      ],

      highlightPoints: ['대규모 트래픽 서비스 경험', '빠른 실험 및 기능 개선 사이클'],

      hiddenKeywords: ['커머스', '대규모트래픽', 'React', 'Next.js'],

      recommendedActions: [
        '대규모 트래픽 처리 경험 포트폴리오 정리',
        'React 성능 최적화 사례 준비',
      ],
    },
  },

  {
    postId: 3002,
    postTitle: '프론트엔드 인턴 (핀테크)',
    companyName: '핀테크 스타트업',
    experienceLevel: 0,
    companyId: 12,
    jobType: 'FRONTEND',
    industryId: 2,
    industryName: 'FINTECH_FINANCIAL',
    status: 'POSTED',
    recruitmentUrl: 'https://example.com/jobs/3002',
    startDate: '2026-06-01',
    dueDate: null,
    createdAt: '2026-03-02T00:00:00.000Z',
    description:
      '핀테크 서비스 UI 개발을 지원할 프론트엔드 인턴을 모집합니다. 신입 개발자를 찾습니다.',

    analysis: {
      summary: '핀테크 서비스 UI 개발을 지원할 프론트엔드 인턴을 모집합니다.',
      companySummary:
        '간편 결제와 금융 데이터를 기반으로 새로운 금융 경험을 제공하는 핀테크 스타트업입니다.',

      rolesResponsibilities: [
        '금융 서비스 웹 UI 개발 지원',
        '디자인 시스템 기반 컴포넌트 개발',
        '프론트엔드 코드 유지보수',
      ],

      requiredSkills: ['HTML / CSS / JavaScript 기본 이해', 'React 기초 경험', 'Git 사용 경험'],

      highlightPoints: ['핀테크 서비스 실무 경험', '주니어 개발자 멘토링 제공'],

      hiddenKeywords: ['핀테크', '결제서비스', 'React', '금융UX'],

      recommendedActions: ['React 프로젝트 포트폴리오 준비', '핀테크 서비스 UX 분석 정리'],
    },
  },

  {
    postId: 3003,
    postTitle: '백엔드 엔지니어 (AI)',
    companyName: 'AI 스타트업',
    experienceLevel: 3,
    companyId: 13,
    jobType: 'BACKEND',
    industryId: 3,
    industryName: 'AI',
    status: 'POSTED',
    recruitmentUrl: 'https://example.com/jobs/3003',
    startDate: '2026-04-01',
    dueDate: '2026-04-30',
    createdAt: '2026-03-03T00:00:00.000Z',
    description:
      'AI 기반 서비스의 백엔드 시스템을 개발할 엔지니어를 찾습니다. 경력 3년 이상의 경력자를 찾습니다.',

    analysis: {
      summary: 'AI 기반 서비스의 백엔드 시스템을 개발할 엔지니어를 찾습니다.',
      companySummary: 'AI 모델을 활용한 데이터 분석 플랫폼을 개발하는 기술 중심 스타트업입니다.',

      rolesResponsibilities: [
        'AI 서비스 백엔드 API 개발',
        '데이터 처리 및 모델 서빙 시스템 구축',
        '클라우드 인프라 운영',
      ],

      requiredSkills: [
        'Node.js 또는 Python 백엔드 개발 경험',
        'REST API 설계 경험',
        'Docker 또는 클라우드 환경 경험',
      ],

      highlightPoints: ['AI 서비스 백엔드 경험', '데이터 파이프라인 구축 경험'],

      hiddenKeywords: ['AI', 'ML', '데이터파이프라인', 'API'],

      recommendedActions: ['AI 서비스 아키텍처 이해 정리', '데이터 처리 프로젝트 경험 정리'],
    },
  },
];

export const mockRecruitmentRequests: RecruitmentRequest[] = [
  {
    requestId: 1,
    requestUserId: 1,
    platformId: 1,
    platformName: 'WANTED',
    url: 'https://www.wanted.co.kr/?utm_source=google&utm_medium=sa&utm_campaign=kr_recruit_web_sa_signup&utm_term=원티드&utm_content=brand_new&airbridge_referrer=airbridge%3Dtrue%26channel%3Dgoogle.adwords%26campaign%3D1732347827%26campaign_id%3D1732347827%26ad_group%3D148879638611%26ad_group_id%3D148879638611%26ad_creative%3D696367802555%26ad_creative_id%3D696367802555%26term%3D원티드%26sub_id%3Dg%26sub_id_1%3D%26sub_id_2%3D%26sub_id_3%3Db%26click_id%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26gclid%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26ad_type%3Dclick&gad_source=1&gad_campaignid=1732347827&gbraid=0AAAAAC_c5SIWU8udoQ4GnhCB-TxzuQw8w&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE',
    status: 'PENDING',
    createdAt: '2026-03-10T00:00:00.000Z',
  },
  {
    requestId: 2,
    requestUserId: 2,
    platformId: 2,
    platformName: 'SARAMIN',
    url: 'https://www.wanted.co.kr/?utm_source=google&utm_medium=sa&utm_campaign=kr_recruit_web_sa_signup&utm_term=원티드&utm_content=brand_new&airbridge_referrer=airbridge%3Dtrue%26channel%3Dgoogle.adwords%26campaign%3D1732347827%26campaign_id%3D1732347827%26ad_group%3D148879638611%26ad_group_id%3D148879638611%26ad_creative%3D696367802555%26ad_creative_id%3D696367802555%26term%3D원티드%26sub_id%3Dg%26sub_id_1%3D%26sub_id_2%3D%26sub_id_3%3Db%26click_id%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26gclid%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26ad_type%3Dclick&gad_source=1&gad_campaignid=1732347827&gbraid=0AAAAAC_c5SIWU8udoQ4GnhCB-TxzuQw8w&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE',
    status: 'REJECTED',
    createdAt: '2026-03-11T00:00:00.000Z',
  },
];
