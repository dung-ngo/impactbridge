import { mockCampaigns } from "@/src/data/mockCampaigns";
import { Campaign } from "@/src/types/campaign";

export async function getCampaignBySlug(
  slug: string,
): Promise<Campaign | null> {
  const campaign = mockCampaigns.find((item) => {
    return item.slug === slug;
  });
  return campaign ?? null;
}
