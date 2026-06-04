export type CampaignStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type Campaign = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  impactSummary?: string;
  goalAmountCents: number;
  currentAmountCents: number;
  status: CampaignStatus;
};
