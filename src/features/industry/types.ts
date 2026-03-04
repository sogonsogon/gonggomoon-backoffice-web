export type IndustryType = 'MEDIA/CONTENT' | 'COMMERCE' | 'FINTECH' | 'MOBILITY' | 'AI' | 'HEALTHCARE/BIO' | 'MANUFACTURING' | 'OTHER'

export type Industry = {
  industryId: number
  name: string
}

export type IndustryVersionStatus = 'PUBLISHED' | 'SAVED'

export type IndustryVersion = {
  versionId: number
  industryId: number
  analyzedYear: number
  keyword: string[]
  marketSize: string
  industryTrends: string[]
  risk: string[]
  rival: string[]
  hiringTrends: string[]
  investmentStrategy: string[]
  status?: IndustryVersionStatus
  createdAt?: string
  editedAt?: string
}
