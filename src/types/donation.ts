export type DonationStatus = "PENDING" | "COMPLETED" | "FAILED";

export type Donation = {
  id: string;
  userEmail: string;
  campaignTitle: string;
  amount: number;
  status: DonationStatus;
  donatedAt: string;
};
