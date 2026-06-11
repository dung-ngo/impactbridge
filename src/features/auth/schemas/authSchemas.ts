import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Please enter a valid email."));

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    email: emailSchema,
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
