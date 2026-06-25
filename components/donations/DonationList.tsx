import type { Donation } from "@/src/types/donation";
import DonationCard from "./DonationCard";

type DonationListProps = {
  donations: Donation[];
};

export default function DonationList({ donations }: DonationListProps) {
  if (donations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
        <h2 className="text-lg font-semibold">No donations yet</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your donation history will appear here after you support a campaign.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold">Your donations</h2>

      <div className="mt-4 space-y-3">
        {donations.map((donation) => (
          <DonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </section>
  );
}
