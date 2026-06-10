import bcrypt from "bcryptjs";
import { z } from "zod";
import { registerSchema } from "@/src/features/auth/schemas/authSchemas";
import { apiError, apiSuccess } from "@/src/lib/apiResponse";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return apiError({
        message: "Invalid registration data.",
        errors: z.flattenError(result.error).fieldErrors,
        status: 400,
      });
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return apiError({
        message: "Email is already registered.",
        errors: {
          email: ["Email is already registered."],
        },
        status: 409,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "DONOR",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return apiSuccess({
      message: "User created successfully.",
      data: user,
      status: 201,
    });
  } catch (error) {
    console.error("Register API error:", error);

    return apiError({
      message: "Something went wrong while creating your account.",
      status: 500,
    });
  }
}
