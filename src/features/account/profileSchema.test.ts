import { describe, expect, it } from 'vitest';
import { DEFAULT_CUSTOMER_PROFILE } from '../../types/customer';
import { profileSchema } from './profileSchema';

describe('profileSchema', () => {
  it('accepts the complete fictitious French profile', () => {
    expect(profileSchema.safeParse(DEFAULT_CUSTOMER_PROFILE).success).toBe(true);
  });

  it.each([
    ['email', { email: 'adresse-invalide' }],
    ['phone', { phone: '123' }],
    ['postal code', { address: { ...DEFAULT_CUSTOMER_PROFILE.address, postalCode: '7501' } }],
    ['city', { address: { ...DEFAULT_CUSTOMER_PROFILE.address, city: '1' } }],
  ])('rejects an invalid %s', (_label, override) => {
    const value = { ...DEFAULT_CUSTOMER_PROFILE, ...override };
    expect(profileSchema.safeParse(value).success).toBe(false);
  });
});
