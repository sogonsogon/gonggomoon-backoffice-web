import { create } from 'zustand';

interface RecruitmentCreateStore {
  pendingSubmissionId: number | null;
  pendingPlatformId: number | null;
  pendingUrl: string | null;
  setPending: (submissionId: number, platformId: number | null, url: string) => void;
  clearPending: () => void;
}

export const useRecruitmentCreateStore = create<RecruitmentCreateStore>((set) => ({
  pendingSubmissionId: null,
  pendingPlatformId: null,
  pendingUrl: null,
  setPending: (pendingSubmissionId, pendingPlatformId, pendingUrl) =>
    set({ pendingSubmissionId, pendingPlatformId, pendingUrl }),
  clearPending: () => set({ pendingSubmissionId: null, pendingPlatformId: null, pendingUrl: null }),
}));
