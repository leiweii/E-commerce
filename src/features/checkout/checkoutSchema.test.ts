import { describe, expect, it } from 'vitest';
import { CHECKOUT_DEFAULT_VALUES, checkoutSchema } from './checkoutSchema';

const validValues = {
  ...CHECKOUT_DEFAULT_VALUES,
  firstName: 'Élodie',
  lastName: 'Martin-Dupré',
  email: 'elodie@example.fr',
  phone: '06 12 34 56 78',
  address: '12 rue des Lilas',
  postalCode: '75011',
  city: 'Paris',
  cardNumber: '4242 4242 4242 4242',
  cardExpiry: '12/30',
  cardCvc: '123',
} as const;

describe('checkoutSchema', () => {
  it('accepts realistic French contact, address, delivery and demo card data', () => {
    expect(checkoutSchema.safeParse(validValues).success).toBe(true);
  });

  it.each([
    ['firstName', 'A'],
    ['lastName', '1'],
    ['email', 'adresse-invalide'],
    ['phone', '12345'],
    ['address', 'Rue'],
    ['postalCode', '7501'],
    ['city', '1'],
  ] as const)('rejects an invalid %s', (field, value) => {
    expect(checkoutSchema.safeParse({ ...validValues, [field]: value }).success).toBe(false);
  });

  it('requires the exact demonstration credentials for card payment', () => {
    const result = checkoutSchema.safeParse({ ...validValues, cardNumber: '4111 1111 1111 1111', cardExpiry: '10/29', cardCvc: '999' });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.map((issue) => issue.path[0])).toEqual(expect.arrayContaining(['cardNumber', 'cardExpiry', 'cardCvc']));
  });

  it('does not require card fields for the simulated PayPal option', () => {
    expect(checkoutSchema.safeParse({
      ...validValues,
      paymentMethod: 'paypal',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    }).success).toBe(true);
  });
});
