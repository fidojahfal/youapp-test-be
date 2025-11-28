import z from 'zod';

export class ProfileValidation {
  static readonly CREATE = z.object({
    name: z.string().min(1).max(100),
    gender: z.string(),
    birthday: z.iso.datetime(),
    height: z.coerce.number().int().positive(),
    weight: z.coerce.number().int().positive(),
  });
}
