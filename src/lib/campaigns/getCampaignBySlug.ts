import { Campaign } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";

export async function getCampaignBySlug(
  slug: string,
): Promise<Campaign | null> {
  return prisma.campaign.findUnique({
    where: {
      slug,
    },
  });
}
