import { CampaignStatus } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

export async function getPublishedCampaigns() {
  return prisma.campaign.findMany({
    where: {
      status: CampaignStatus.PUBLISHED,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
