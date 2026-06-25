import { Donations } from "@/src/data/mockDonantions";
import type { Donation } from "@/src/types/donation";

export async function getUserDonations(userEmail: string): Promise<Donation[]> {
  return Donations.filter((donation) => {
    return donation.userEmail === userEmail;
  });
}
