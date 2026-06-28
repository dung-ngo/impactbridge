import { prisma } from "@/src/lib/prisma";
import type { DonationHistoryItem } from "@/src/types/donation";

export async function getUserDonations(
  userEmail: string,
): Promise<DonationHistoryItem[]> {
  const donor = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  });

  if (!donor) {
    return [];
  }

  const donations = await prisma.donation.findMany({
    where: {
      donorId: donor.id,
    },
    select: {
      id: true,
      amountCents: true,
      status: true,
      createdAt: true,
      campaign: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return donations.map((donation) => {
    return {
      id: donation.id,
      campaignTitle: donation.campaign.title,
      amountCents: donation.amountCents,
      status: donation.status,
      donatedAt: donation.createdAt.toISOString().slice(0, 10),
    };
  });
}
