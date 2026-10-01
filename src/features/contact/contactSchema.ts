import { z } from 'zod';

export const contactSchema = z.object({
  subject: z.string().min(1, 'Sélectionnez un sujet.'),
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères.').max(80, 'Le nom est trop long.'),
  email: z.string().trim().email('Saisissez une adresse email valide.'),
  message: z.string().trim().min(10, 'Le message doit contenir au moins 10 caractères.').max(1000, 'Le message ne peut pas dépasser 1 000 caractères.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
