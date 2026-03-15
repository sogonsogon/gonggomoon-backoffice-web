import { create } from 'zustand';

interface RecruitmentCreateStore {
  pendingSubmissionId: number | null;
  pendingUrl: string | null;
  setPending: (submissionId: number, url: string) => void;
  clearPending: () => void;
}

export const useRecruitmentCreateStore = create<RecruitmentCreateStore>((set) => ({
  pendingSubmissionId: null,
  pendingUrl: null,
  setPending: (submissionId, url) => set({ pendingSubmissionId: submissionId, pendingUrl: url }),
  clearPending: () => set({ pendingSubmissionId: null, pendingUrl: null }),
}));
