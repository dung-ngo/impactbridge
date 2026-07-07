"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { TextInput } from "./TextInput";
import { loginSchema, type LoginFormValues } from "../schemas/authSchemas";

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;

export function LoginForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClassName =
    "mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-black";

  function updateField(field: keyof LoginFormValues, value: string) {
    setFormValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));

    setFormMessage("");
  }

  function mapClientValidationErrors(
    issues: { path: PropertyKey[]; message: string }[],
  ) {
    const nextErrors: LoginFormErrors = {};

    for (const issue of issues) {
      const fieldName = issue.path[0] as keyof LoginFormValues;
      nextErrors[fieldName] = issue.message;
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormMessage("");

    const result = loginSchema.safeParse(formValues);

    if (!result.success) {
      setErrors(mapClientValidationErrors(result.error.issues));
      return;
    }

    try {
      setIsSubmitting(true);

      const signInResult = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setFormMessage("Invalid email or password.");
        return;
      }

      setErrors({});

      // Move user away from /login after successful login.
      router.replace("/dashboard");

      // Ask Server Components to read the newest session cookie again.
      router.refresh();
    } catch (error) {
      console.error("Login form error:", error);
      setFormMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formMessage ? (
        <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
          {formMessage}
        </p>
      ) : null}

      <TextInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formValues.email}
        onChange={(value) => updateField("email", value)}
        placeholder="you@example.com"
        error={errors.email}
        className={inputClassName}
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
        className={inputClassName}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
