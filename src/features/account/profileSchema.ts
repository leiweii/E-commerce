import { z } from 'zod';

const personName = /^[A-Za-zÀ-ÖØ-öø-ÿŒœÆæÇç' -]+$/;
const frenchPhone = /^(?:(?:\+33|0033)[ .-]?[1-9]|0[1-9])(?:[ .-]?\d{2}){4}$/;

export const profileSchema = z.object({
  firstName: z.string().trim().min(2, 'Saisissez un prénom d’au moins 2 caractères.').max(60).regex(personName, 'Saisissez un prénom valide.'),
  lastName: z.string().trim().min(2, 'Saisissez un nom d’au moins 2 caractères.').max(80).regex(personName, 'Saisissez un nom valide.'),
  email: z.string().trim().email('Saisissez une adresse email valide.'),
  phone: z.string().trim().regex(frenchPhone, 'Saisissez un numéro de téléphone français valide.'),
  address: z.object({
    street: z.string().trim().min(5, 'L’adresse doit contenir au moins 5 caractères.').max(120),
    complement: z.string().trim().max(100),
    postalCode: z.string().trim().regex(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres.'),
    city: z.string().trim().min(2, 'La ville doit contenir au moins 2 caractères.').max(80).regex(personName, 'Saisissez une ville valide.'),
  }).strict(),
  preferences: z.object({ newsletter: z.boolean(), promotionalOffers: z.boolean(), deliverySms: z.boolean() }).strict(),
}).strict();

export type ProfileFormValues = z.infer<typeof profileSchema>;
