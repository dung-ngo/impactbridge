import type { Donation } from "@/src/types/donation";

export const Donations: Donation[] = [
  {
    id: "donation-1",
    userEmail: "june@test.test",
    campaignTitle: "Animal shelter support",
    amount: 20,
    status: "PENDING",
    donatedAt: "2026-06-20",
  },
  {
    id: "donation-2",
    userEmail: "june@test.test",
    campaignTitle: "Vegan outreach campaign",
    amount: 15,
    status: "COMPLETED",
    donatedAt: "2026-06-22",
  },
  {
    id: "donation-3",
    userEmail: "june@test.test",
    campaignTitle: "Rescue food fund",
    amount: 30,
    status: "FAILED",
    donatedAt: "2026-06-24",
  },
];
