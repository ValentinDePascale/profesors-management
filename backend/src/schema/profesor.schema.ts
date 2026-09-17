import { z } from 'zod';

export const createProfesorSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  surname: z.string().min(1, 'El apellido es obligatorio'),
  dni: z.string().min(1, 'El DNI es obligatorio'),
  cuil: z.string().min(1, 'El CUIL es obligatorio'),
  phone: z
    .string()
    .min(1, 'El numero de telefono es obligatorio')
    .max(12)
    .optional(),
  address: z.string().min(1, 'La direccion es obligatorio'),
  maritalStatus: z.enum(['SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO']),
  birthdate: z.coerce.date(),
  email: z.email().optional(),
});

export const updateProfesorSchema = createProfesorSchema.partial();

export type ProfesorCreateInput = z.infer<typeof createProfesorSchema>;
export type ProfesorUpdateInput = z.infer<typeof updateProfesorSchema>;
