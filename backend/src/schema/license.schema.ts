/* model License{
  id Int @id @default(autoincrement())
  profesorId Int @map("profesor_id")
  subjectId Int @map("subject_id")
  articleCode String @map("article_code")

  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  profesor Profesor @relation(fields: [profesorId], references: [id], onDelete: Cascade)
  subject Subject @relation(fields: [subjectId], references: [CUPOF], onDelete: Cascade)
  licenseType LicenseType @relation(fields: [articleCode], references: [article], onDelete: Restrict)

  @@map("license")
} */

import { z } from 'zod';

export const createLicenseSchema = z.object({
  profesorId: z.number().int().positive('El id del profesor debe ser positivo'),
  subjectId: z.number().int().positive('El id del subject debe ser positivo'),
  articleCode: z.string().min(1, 'articleCode es obligatorio'),
});

export const updateLicenseSchema = createLicenseSchema.partial();

export type LicenseCreateInput = z.infer<typeof createLicenseSchema>;
export type LicenseUpdateInput = z.infer<typeof updateLicenseSchema>;
