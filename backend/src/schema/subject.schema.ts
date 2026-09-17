/*
model Subject{
  CUPOF Int @id @default(autoincrement())
  name String
  year Int
  module String
  grade String

  License License[]
  profesorSubject Profesor_Subject[]


  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@map("subjects")
}
*/

import { z } from 'zod';

export const createSubjectSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  year: z.number().int().positive('El año debe ser positivo'),
  module: z.string().min(1, 'El modulo es obligatorio'),
  grade: z.string().min(1, 'El grado es obligatorio'),
});

export const updateSubjectSchema = createSubjectSchema.partial();

export type SubjectCreateInput = z.infer<typeof createSubjectSchema>;
export type SubjectUpdateInput = z.infer<typeof updateSubjectSchema>;
