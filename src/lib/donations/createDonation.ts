"use server";

import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { Role, DonationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isValidAmountCents } from "./validation";

type CreateDonationInput = {
  campaignId: string;
  amountCents: number;
};

type CreateDonationResult = {
  success: boolean;
  message: string;
};

export async function createDonation(
  input: CreateDonationInput,
): Promise<CreateDonationResult> {
  const session = await auth();

  // A donation must belong to a logged-in user.
  if (!session?.user?.email) {
    return {
      success: false,
      message: "Please log in before donating.",
    };
  }

  // Server-side validation protects the database even if client validation is bypassed.
  if (!isValidAmountCents(input.amountCents)) {
    return {
      success: false,
      message: "Please enter a valid donation amount.",
    };
  }

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: input.campaignId,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!campaign) {
    return {
      success: false,
      message: "Campaign not found.",
    };
  }

  const donor = await prisma.user.upsert({
    where: {
      email: session.user.email,
    },
    update: {
      name: session.user.name ?? session.user.email,
    },
    create: {
      email: session.user.email,
      name: session.user.name ?? session.user.email,
      passwordHash: "created-from-auth-session",
      role: Role.DONOR,
      profilePicture: session.user.profilePicture,
    },
  });

  await prisma.$transaction([
    prisma.donation.create({
      data: {
        campaignId: campaign.id,
        donorId: donor.id,
        amountCents: input.amountCents,
        currency: "usd",
        status: DonationStatus.SUCCEEDED,
      },
    }),

    prisma.campaign.update({
      where: {
        id: campaign.id,
      },
      data: {
        currentAmountCents: {
          increment: input.amountCents,
        },
      },
    }),
  ]);

  revalidatePath(`/campaign/${campaign.slug}`);
  revalidatePath("dashboard");

  return {
    success: true,
    message: "Thank you for you donation!",
  };
}
