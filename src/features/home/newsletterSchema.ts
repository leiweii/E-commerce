import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().trim().email('Saisissez une adresse email valide.'),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
