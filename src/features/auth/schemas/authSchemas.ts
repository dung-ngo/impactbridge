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
    name: z.string().min(1, "User name is required."),
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
    .max(12, "User name is exceeded, maximum 12 characters."),
  email: emailSchema,
  currentPassword: z.string(),
  newPassword: z.string(),
  profilePicture: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type UpdateFormValues = z.infer<typeof updateSchema>;
