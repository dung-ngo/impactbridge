"use client";
import { useState } from "react";
import { TextInput } from "./TextInput";
import { loginSchema, type LoginFormValues } from "../schemas/authSchemas";

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export function LoginForm() {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  function updateField(field: keyof LoginFormValues, value: string) {
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

    const result = loginSchema.safeParse(formValues);

    if (!result.success) {
      const nextErrors: LoginFormErrors = {};

      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof LoginFormValues;
        nextErrors[fieldName] = issue.message;
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});

    console.log("Valid login data:", result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Enter your password"
        error={errors.password}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Log in
      </button>
    </form>
  );
}
