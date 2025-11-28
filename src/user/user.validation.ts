import z from 'zod';

export class UserValidation {
  static readonly REGISTER = z.object({
    username: z.string().min(4).max(100),
    email: z.email(),
    password: z.string().min(8).max(255),
    confirm_password: z.string().min(8).max(255),
  });
}
