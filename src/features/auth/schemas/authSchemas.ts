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
    name: z
      .string()
      .min(1, "User name is required.")
      .max(10, "User name must not exceed 10 characters.")
      .regex(
        /^[a-z0-9._-]+$/,
        'User name must be in lowercase, with numbers, and " . / - / _ " only, no spaces',
      ),
    email: emailSchema,
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
    profilePicture: z.string().optional(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const updateSchema = z.object({
  name: z
    .string()
    .min(1, "User name can not be blank.")
    .max(10, "User name is exceeded, maximum 10 characters."),
  email: emailSchema,
  currentPassword: z.string(),
  newPassword: z.string(),
  profilePicture: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type UpdateFormValues = z.infer<typeof updateSchema>;
