import { z } from 'zod';

const personName = /^[A-Za-zÀ-ÖØ-öø-ÿŒœÆæÇç' -]+$/;
const cityName = /^[A-Za-zÀ-ÖØ-öø-ÿŒœÆæÇç' -]+$/;
const frenchPhone = /^(?:(?:\+33|0033)[ .-]?[1-9]|0[1-9])(?:[ .-]?\d{2}){4}$/;

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, 'Saisissez un prénom d’au moins 2 caractères.').max(60).regex(personName, 'Saisissez un prénom valide.'),
  lastName: z.string().trim().min(2, 'Saisissez un nom d’au moins 2 caractères.').max(80).regex(personName, 'Saisissez un nom valide.'),
  email: z.string().trim().email('Saisissez une adresse email valide.'),
  phone: z.string().trim().regex(frenchPhone, 'Saisissez un numéro de téléphone français valide.'),
  address: z.string().trim().min(5, 'L’adresse doit contenir au moins 5 caractères.').max(120),
  addressComplement: z.string().trim().max(100),
  postalCode: z.string().trim().regex(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres.'),
  city: z.string().trim().min(2, 'La ville doit contenir au moins 2 caractères.').max(80).regex(cityName, 'Saisissez une ville valide.'),
  deliveryMethod: z.enum(['standard', 'express', 'relay']),
  paymentMethod: z.enum(['card', 'paypal']),
  cardNumber: z.string(),
  cardExpiry: z.string(),
  cardCvc: z.string(),
}).superRefine((values, context) => {
  if (values.paymentMethod !== 'card') return;
  if (values.cardNumber.replace(/\s/g, '') !== '4242424242424242') {
    context.addIssue({ code: 'custom', path: ['cardNumber'], message: 'Utilisez le numéro de démonstration 4242 4242 4242 4242.' });
  }
  if (values.cardExpiry !== '12/30') {
    context.addIssue({ code: 'custom', path: ['cardExpiry'], message: 'Utilisez l’expiration de démonstration 12/30.' });
  }
  if (values.cardCvc !== '123') {
    context.addIssue({ code: 'custom', path: ['cardCvc'], message: 'Utilisez le cryptogramme de démonstration 123.' });
  }
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const CHECKOUT_DEFAULT_VALUES: CheckoutFormValues = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', addressComplement: '', postalCode: '', city: '',
  deliveryMethod: 'standard', paymentMethod: 'card',
  cardNumber: '', cardExpiry: '', cardCvc: '',
};

export const CHECKOUT_STEP_FIELDS = [
  ['firstName', 'lastName', 'email', 'phone'],
  ['address', 'addressComplement', 'postalCode', 'city'],
  ['deliveryMethod'],
  ['paymentMethod', 'cardNumber', 'cardExpiry', 'cardCvc'],
] as const satisfies readonly (readonly (keyof CheckoutFormValues)[])[];
