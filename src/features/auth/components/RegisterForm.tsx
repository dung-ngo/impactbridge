"use client";

import { useState } from "react";
import { TextInput } from "./TextInput";
import {
  type RegisterFormValues,
  registerSchema,
} from "../schemas/authSchemas";
import { PROFILE_PICTURES } from "@/src/data/profilePictures";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

type RegisterApiErrorResponse = {
  success: false;
  message: string;
  errors?: Partial<Record<keyof RegisterFormValues, string[]>>;
};

type RegisterApiSuccessResponse = {
  success: true;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
};

type RegisterApiResponse =
  | RegisterApiSuccessResponse
  | RegisterApiErrorResponse;

export function RegisterForm() {
  const router = useRouter();
  const inputClassName =
    "mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-black";
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: PROFILE_PICTURES[0],
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getRandomProfilePictureUrl(imageUrls: string[]) {
    const imageIndexes = imageUrls.length - 1;
    const randomImgIndex = Math.floor(Math.random() * imageIndexes);
    return imageUrls[randomImgIndex];
  }

  function updateField(field: keyof RegisterFormValues, value: string) {
    const defaultProfilePicture = getRandomProfilePictureUrl(PROFILE_PICTURES);
    setFormValues((previousValues) => ({
      ...previousValues,
      [field]: value,
      // If the user is updating the profile picture field, assign a random profile picture URL
      profilePicture: defaultProfilePicture,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));

    setFormMessage("");
  }

  // Maps Zod validation issues to form error messages (array to object)
  function mapClientValidationErrors(
    issues: { path: PropertyKey[]; message: string }[],
  ) {
    const nextErrors: RegisterFormErrors = {};

    for (const issue of issues) {
      const fieldName = issue.path[0] as keyof RegisterFormValues;
      nextErrors[fieldName] = issue.message;
    }

    return nextErrors;
  }

  function mapServerErrors(
    serverErrors?: Partial<Record<keyof RegisterFormValues, string[]>>,
  ) {
    const nextErrors: RegisterFormErrors = {};

    if (!serverErrors) {
      return nextErrors;
    }

    for (const field of Object.keys(serverErrors) as Array<
      keyof RegisterFormValues
    >) {
      nextErrors[field] = serverErrors[field]?.[0];
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormMessage("");

    const result = registerSchema.safeParse(formValues);

    if (!result.success) {
      setErrors(mapClientValidationErrors(result.error.issues));
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const responseData = (await response.json()) as RegisterApiResponse;

      // HTTP status code in the 200-299 range indicates success
      if (!responseData.success) {
        setErrors(mapServerErrors(responseData.errors));
        setFormMessage(responseData.message);
        return;
      }

      setErrors({});
      setFormMessage(responseData.message);

      // setFormValues({
      //   name: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      //   profilePicture: PROFILE_PICTURES[0],
      // });

      setTimeout(() => router.replace("/login"), 3000);
    } catch (error) {
      console.error("Register form error:", error);
      setFormMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formMessage ? (
        <p className="rounded-lg bg-gray-50 p-3 text-sm text-red-500">
          {formMessage}
        </p>
      ) : null}

      <TextInput
        id="name"
        name="name"
        label="Name"
        value={formValues.name}
        onChange={(value) => updateField("name", value)}
        placeholder="Your name"
        error={errors.name}
        className={inputClassName}
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
        className={inputClassName}
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
        className={inputClassName}
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
        className={inputClassName}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
      <div className="text-center">
        <p>
          Already had an account?{" "}
          <Link
            href="/login"
            className="cursor-pointer font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}
