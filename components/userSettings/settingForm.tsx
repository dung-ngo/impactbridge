"use client";

import { useState } from "react";
import Image from "next/image";
import { PROFILE_PICTURES } from "@/src/data/profilePictures";
import {
  UpdateFormValues,
  updateSchema,
} from "@/src/features/auth/schemas/authSchemas";
import { TextInput } from "@/src/features/auth/components/TextInput";
import { useRouter } from "next/navigation";

type SettingFormProps = {
  name: string;
  email: string;
  profilePicture: string;
};

type UpdateFormErrors = Partial<Record<keyof UpdateFormValues, string>>;

type UpdateApiErrorResponse = {
  success: false;
  message: string;
  error?: Partial<Record<keyof UpdateFormValues, string[]>>;
};

type UpdateApiSuccessResponse = {
  success: true;
  message: string;
  data?: {
    id: string;
    name: string;
    // password: string;
    profilePicture: string;
    updatedAt: string;
  };
};

type UpdateApiResponse = UpdateApiErrorResponse | UpdateApiSuccessResponse;

export default function SettingForm({
  name,
  email,
  profilePicture,
}: SettingFormProps) {
  const initialUserInfo = {
    name,
    email,
    profilePicture,
    currentPassword: "",
    newPassword: "",
  };
  const className = {
    email:
      "rounded-md w-full md:w-[100%] p-0 py-1 px-3 border border-gray-400 text-gray-400",
    input: "rounded-md w-full md:w-[100%] py-1 px-3 border border-gray-400",
  };
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [errors, setErrors] = useState<UpdateFormErrors>({});

  const pictureChange = () => {
    const tempPictures: string[] = PROFILE_PICTURES.filter(
      (pic) => pic !== userInfo.profilePicture,
    );

    const imageIndexes = tempPictures.length - 1;
    const randomImgIndex = Math.floor(Math.random() * imageIndexes);
    const pictureUrl = tempPictures[randomImgIndex];

    setUserInfo((prev) => ({ ...prev, profilePicture: pictureUrl }));
  };

  // Maps Zod validation issues to form error messages (array to object)
  function mapClientValidationErrors(
    issues: {
      path: PropertyKey[];
      message: string;
    }[],
  ) {
    const nextErrors: UpdateFormErrors = {};

    for (const issue of issues) {
      const fieldName = issue.path[0] as keyof UpdateFormValues;
      nextErrors[fieldName] = issue.message;
    }

    return nextErrors;
  }

  function mapServerErrors(
    serverErrors?: Partial<Record<keyof UpdateFormValues, string[]>>,
  ) {
    const nextErrors: UpdateFormErrors = {};

    if (!serverErrors) {
      return nextErrors;
    }

    for (const field of Object.keys(serverErrors) as Array<
      keyof UpdateFormValues
    >) {
      nextErrors[field] = serverErrors[field]?.[0];
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormMessage("");

    const result = updateSchema.safeParse(userInfo);
    console.log("result ", result);

    if (!result.success) {
      setErrors(mapClientValidationErrors(result.error.issues));
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/auth/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const responseData = (await response.json()) as UpdateApiResponse;

      // const rawResponse = await response.text();

      // console.log("PATCH response debug:", {
      //   status: response.status,
      //   ok: response.ok,
      //   contentType: response.headers.get("content-type"),
      //   bodyPreview: rawResponse.slice(0, 300),
      // });

      // let responseData: UpdateApiResponse;

      // try {
      //   responseData = JSON.parse(rawResponse) as UpdateApiResponse;
      // } catch (error) {
      //   console.error("Response was not valid JSON:", error);

      //   setFormMessage("Server did not return JSON. Check terminal logs.");
      //   return;
      // }

      // HTTP status code in the 200-299 range indicates success
      if (!responseData.success) {
        setErrors(mapServerErrors(responseData.error));
        setFormMessage(responseData.message);
        return;
      }

      setErrors({});
      setFormMessage(responseData.message);
      const resData = responseData.data;

      if (resData) {
        setUserInfo((prev) => ({
          ...prev,
          name: resData?.name,
          profilePicture: resData?.profilePicture,
        }));
      }
    } catch (error) {
      console.error("Update form error: ", error);
      setFormMessage("Something went wrong. Please try again!");
    } finally {
      router.refresh();
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white max-w-[90%] md:max-w-[20%] mx-auto border border-gray-300 py-8 px-5 m-2 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-8 md:my-10">
          <div className="flex justify-center">
            <Image
              src={userInfo.profilePicture}
              width={100}
              height={100}
              alt="profile-picture"
              className="w-1/2 md:w-2/5 rounded-full"
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="button"
              className="border rounded-md py-2 px-4 text-xs bg-black text-white hover:bg-gray-500"
              onClick={pictureChange}
            >
              Change Picture
            </button>
          </div>
        </div>
        <div className="flex mb-2 justify-between items-center">
          <div className="w-1/2">
            <label className="text-xs">Username</label>
          </div>
          <TextInput
            id="name"
            name="name"
            value={userInfo.name}
            onChange={(value) =>
              setUserInfo((prev) => ({ ...prev, name: value }))
            }
            placeholder="Your username"
            error={errors.name}
            className={className.input}
          />
        </div>
        <div className="flex mb-2 justify-between items-center">
          <div className="w-1/2">
            <label className="text-xs">Email</label>
          </div>
          <TextInput
            type="email"
            id="email"
            name="email"
            isDisabled={true}
            value={userInfo.email}
            placeholder="Your username"
            error={errors.name}
            className={className.email}
          />
        </div>
        <div className="flex mb-2 justify-between items-center">
          <div className="w-1/2">
            <label className="text-xs">Current Password</label>
          </div>
          <TextInput
            id="curr-password"
            name="curr-password"
            type="password"
            value={userInfo.currentPassword}
            onChange={(value) =>
              setUserInfo((prev) => ({
                ...prev,
                currentPassword: value,
              }))
            }
            error={errors.currentPassword}
            className={className.input}
          />
        </div>
        <div className="flex mb-2 justify-between items-center">
          <div className="w-1/2">
            <label className="text-xs">New Password</label>
          </div>
          <TextInput
            id="new-password"
            name="new-password"
            type="password"
            value={userInfo.newPassword}
            onChange={(value) =>
              setUserInfo((prev) => ({
                ...prev,
                newPassword: value,
              }))
            }
            error={errors.newPassword}
            className={className.input}
          />
        </div>
        {formMessage ? (
          <p className="rounded-lg my-2 bg-gray-50 p-3 text-sm text-red-500">
            {formMessage}
          </p>
        ) : null}
        <div className="mt-10 flex justify-center gap-2">
          <button
            type="submit"
            className="border rounded-xl py-2 px-5 bg-black text-white hover:scale-105"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border rounded-xl py-2 px-5 hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
