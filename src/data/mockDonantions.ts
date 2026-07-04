import type { DonationHistoryItem } from "@/src/types/donation";

export const Donations: DonationHistoryItem[] = [
  {
    id: "donation-1",
    campaignTitle: "Animal shelter support",
    amountCents: 2000,
    status: "PENDING",
    donatedAt: "2026-06-20",
  },
  {
    id: "donation-2",
    campaignTitle: "Vegan outreach campaign",
    amountCents: 1500,
    status: "SUCCEEDED",
    donatedAt: "2026-06-22",
  },
  {
    id: "donation-3",
    campaignTitle: "Rescue food fund",
    amountCents: 3000,
    status: "FAILED",
    donatedAt: "2026-06-24",
  },
];
