import { z } from 'zod';

export const createLicenseTypeSchema = z.object({
  article: z.string().min(1, { message: 'Article is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export const updateLicenseTypeSchema = createLicenseTypeSchema.partial();

export type LicenseTypeCreateInput = z.infer<typeof createLicenseTypeSchema>;
export type LicenseTypeUpdateInput = z.infer<typeof updateLicenseTypeSchema>;
