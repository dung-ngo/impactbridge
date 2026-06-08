"use client";

import { useState } from "react";
import { TextInput } from "./TextInput";
import {
  type RegisterFormValues,
  registerSchema,
} from "../schemas/authSchemas";

type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;
export function RegisterForm() {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});

  function updateField(field: keyof RegisterFormValues, value: string) {
    setFormValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = registerSchema.safeParse(formValues);

    if (!result.success) {
      const nextErrors: RegisterFormErrors = {};

      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof RegisterFormValues;
        nextErrors[fieldName] = issue.message;
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});

    console.log("Valid register data:", result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        id="name"
        name="name"
        label="Name"
        value={formValues.name}
        onChange={(value) => updateField("name", value)}
        placeholder="Your name"
        error={errors.name}
      />

      <TextInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={(value) => updateField("email", value)}
        placeholder="you@example.com"
        error={errors.email}
      />

      <TextInput
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formValues.password}
        onChange={(value) => updateField("password", value)}
        placeholder="Create a password"
        error={errors.password}
      />

      <TextInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={formValues.confirmPassword}
        onChange={(value) => updateField("confirmPassword", value)}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Create account
      </button>
    </form>
  );
}
