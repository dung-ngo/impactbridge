export type DonationStatus = "PENDING" | "SUCCEEDED" | "FAILED";

export type DonationHistoryItem = {
  id: string;
  campaignTitle: string;
  amountCents: number;
  status: DonationStatus;
  donatedAt: string;
};
