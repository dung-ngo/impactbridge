"use server";

import { PledgeStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

type CreatePledgeInput = {
  campaignId: string;
  amountCents: number;
  message?: string;
};

type CreatePledgeResult = {
  success: boolean;
  message: string;
};

export async function createPledge(
  input: CreatePledgeInput,
): Promise<CreatePledgeResult> {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Please log in before making a pledge.",
    };
  }

  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) {
    return {
      success: false,
      message: "Please enter a valid pledge amount.",
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
    },
  });

  await prisma.pledge.create({
    data: {
      campaignId: campaign.id,
      donorId: donor.id,
      amountCents: input.amountCents,
      currency: "usd",
      status: PledgeStatus.ACTIVE,
      message: input.message?.trim() || null,
    },
  });

  revalidatePath(`/campaigns/${campaign.slug}`);
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Your pledge has been saved. Thank you!",
  };
}
