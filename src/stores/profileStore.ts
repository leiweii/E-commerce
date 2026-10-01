import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { profileSchema } from '../features/account/profileSchema';
import { DEFAULT_CUSTOMER_PROFILE, type CustomerProfile } from '../types/customer';

const cloneDefault = (): CustomerProfile => ({
  ...DEFAULT_CUSTOMER_PROFILE,
  address: { ...DEFAULT_CUSTOMER_PROFILE.address },
  preferences: { ...DEFAULT_CUSTOMER_PROFILE.preferences },
});

export function sanitizeProfile(value: unknown): CustomerProfile {
  const result = profileSchema.safeParse(value);
  return result.success ? result.data : cloneDefault();
}

interface ProfileStore {
  profile: CustomerProfile;
  updateProfile: (profile: CustomerProfile) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(persist((set) => ({
  profile: cloneDefault(),
  updateProfile: (profile) => set({ profile: sanitizeProfile(profile) }),
  resetProfile: () => set({ profile: cloneDefault() }),
}), {
  name: 'marche-frais-profile-v1',
  partialize: ({ profile }) => ({ profile }),
  merge: (persistedState, currentState) => {
    const profile = typeof persistedState === 'object' && persistedState !== null && 'profile' in persistedState
      ? sanitizeProfile(persistedState.profile)
      : cloneDefault();
    return { ...currentState, profile };
  },
}));
