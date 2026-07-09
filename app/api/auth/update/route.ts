import { updateSchema } from "@/src/features/auth/schemas/authSchemas";
import { apiError, apiSuccess } from "@/src/lib/apiResponse";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

async function readJsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function PATCH(request: Request) {
  const body = await readJsonBody(request);

  if (!body) {
    return apiError({
      message: "Request body must be valid JSON.",
      status: 400,
    });
  }

  const result = updateSchema.safeParse(body);

  if (!result.success) {
    return apiError({
      message: "Invalid registration data.",
      errors: z.flattenError(result.error).fieldErrors,
      status: 400,
    });
  }

  try {
    const { name, email, currentPassword, newPassword, profilePicture } =
      result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return apiError({
        message: "User not found.",
        status: 404,
      });
    }

    const wantsToChangePassword = newPassword.trim() !== "";

    const updateData: {
      name: string;
      profilePicture: string | undefined;
      passwordHash?: string;
    } = {
      name,
      profilePicture,
    };

    if (wantsToChangePassword) {
      if (!currentPassword.trim()) {
        return apiError({
          message: "Please enter your current password.",
          errors: {
            currentPassword: ["Current password is required."],
          },
          status: 400,
        });
      }

      const currentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.passwordHash,
      );

      if (!currentPasswordValid) {
        return apiError({
          message: "Current password is incorrect.",
          errors: {
            currentPassword: ["Current password is incorrect."],
          },
          status: 400,
        });
      }

      // Only hash and update password when the user actually wants to change it.
      updateData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        updatedAt: true,
      },
    });

    return apiSuccess({
      message:
        "Profile updated successfully. You have to re-login to see the changes.",
      data: updatedUser,
      status: 200,
    });
  } catch (error) {
    console.error("Update API error: ", error);

    return apiError({
      message: "Something went wrong while creating your account.",
      status: 500,
    });
  }
}
