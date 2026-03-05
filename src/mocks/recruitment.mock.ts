import type { Recruitment, RecruitmentRequest } from '@/features/recruitment/types';

export const mockRecruitments: Recruitment[] = [
  {
    recruitmentId: 3001,
    title: '프론트엔드 엔지니어 (커머스)',
    companyId: 11,
    jobType: 'FRONTEND',
    industryType: 'COMMERCE',
    status: 'POSTED',
    url: 'https://example.com/jobs/3001',
    startDate: '2026-03-01',
    dueDate: '2026-03-31',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
  {
    recruitmentId: 3002,
    title: '프론트엔드 인턴 (핀테크)',
    companyId: 12,
    jobType: 'FRONTEND',
    industryType: 'FINTECH_FINANCIAL',
    status: 'POSTED',
    url: 'https://example.com/jobs/3002',
    startDate: '2026-06-01',
    dueDate: null,
    createdAt: '2026-03-02T00:00:00.000Z',
  },
  {
    recruitmentId: 3003,
    title: '백엔드 엔지니어 (AI)',
    companyId: 13,
    jobType: 'BACKEND',
    industryType: 'AI',
    status: 'POSTED',
    url: 'https://example.com/jobs/3003',
    startDate: '2026-04-01',
    dueDate: '2026-04-30',
    createdAt: '2026-03-03T00:00:00.000Z',
  },
];

export const mockRecruitmentRequests: RecruitmentRequest[] = [
  {
    requestId: 1,
    requestUserId: 1,
    platformType: '원티드',
    requestUrl:
      'https://www.wanted.co.kr/?utm_source=google&utm_medium=sa&utm_campaign=kr_recruit_web_sa_signup&utm_term=원티드&utm_content=brand_new&airbridge_referrer=airbridge%3Dtrue%26channel%3Dgoogle.adwords%26campaign%3D1732347827%26campaign_id%3D1732347827%26ad_group%3D148879638611%26ad_group_id%3D148879638611%26ad_creative%3D696367802555%26ad_creative_id%3D696367802555%26term%3D원티드%26sub_id%3Dg%26sub_id_1%3D%26sub_id_2%3D%26sub_id_3%3Db%26click_id%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26gclid%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26ad_type%3Dclick&gad_source=1&gad_campaignid=1732347827&gbraid=0AAAAAC_c5SIWU8udoQ4GnhCB-TxzuQw8w&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE',
    status: 'PENDING',
  },
  {
    requestId: 2,
    requestUserId: 2,
    platformType: '원티드',
    requestUrl:
      'https://www.wanted.co.kr/?utm_source=google&utm_medium=sa&utm_campaign=kr_recruit_web_sa_signup&utm_term=원티드&utm_content=brand_new&airbridge_referrer=airbridge%3Dtrue%26channel%3Dgoogle.adwords%26campaign%3D1732347827%26campaign_id%3D1732347827%26ad_group%3D148879638611%26ad_group_id%3D148879638611%26ad_creative%3D696367802555%26ad_creative_id%3D696367802555%26term%3D원티드%26sub_id%3Dg%26sub_id_1%3D%26sub_id_2%3D%26sub_id_3%3Db%26click_id%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26gclid%3DCjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE%26ad_type%3Dclick&gad_source=1&gad_campaignid=1732347827&gbraid=0AAAAAC_c5SIWU8udoQ4GnhCB-TxzuQw8w&gclid=CjwKCAiAzZ_NBhAEEiwAMtqKy13uvJubEMbrw7XRBVJkujMlJzFgG8hGgbiQNPiMw_HfyH_dQqhOQxoCNDMQAvD_BwE',
    status: 'REJECTED',
  },
];
