import type { Donation, DonationStatus } from "@/src/types/donation";
import { formatMoneyFromCents } from "@/src/lib/formatMoney";

type DonationCardProps = {
  donation: Donation;
};

function getStatusBadgeClass(status: DonationStatus): string {
  switch (status) {
    case "COMPLETED":
      return "bg-green-600 text-white";
    case "PENDING":
      return "bg-yellow-300 text-gray-900";
    case "FAILED":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function DonationCard({ donation }: DonationCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-gray-900">
            {donation.campaignTitle}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Donated on {donation.donatedAt}
          </p>
        </div>

        <span
          className={`rounded-full ${getStatusBadgeClass(donation.status)} px-3 py-1 text-xs font-medium text-gray-700`}
        >
          {donation.status}
        </span>
      </div>

      <p className="mt-4 text-lg font-semibold">
        {formatMoneyFromCents(donation.amount)}
      </p>
    </article>
  );
}
