import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_CUSTOMER_PROFILE } from '../types/customer';
import { sanitizeProfile, useProfileStore } from './profileStore';

describe('profileStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useProfileStore.setState({ profile: DEFAULT_CUSTOMER_PROFILE });
  });

  it('updates and resets the whole profile', () => {
    const changed = { ...DEFAULT_CUSTOMER_PROFILE, firstName: 'Camille', preferences: { ...DEFAULT_CUSTOMER_PROFILE.preferences, deliverySms: false } };
    useProfileStore.getState().updateProfile(changed);
    expect(useProfileStore.getState().profile).toEqual(changed);
    useProfileStore.getState().resetProfile();
    expect(useProfileStore.getState().profile).toEqual(DEFAULT_CUSTOMER_PROFILE);
  });

  it('falls back completely when nested persisted data is malformed', () => {
    expect(sanitizeProfile({ ...DEFAULT_CUSTOMER_PROFILE, address: { postalCode: 'x' } })).toEqual(DEFAULT_CUSTOMER_PROFILE);
  });
});
