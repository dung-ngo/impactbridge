import Link from "next/link";
import type { Campaign } from "@prisma/client";
import { formatMoneyFromCents } from "@/src/lib/formatMoney";

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress =
    (campaign.currentAmountCents / campaign.goalAmountCents) * 100;

  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {campaign.imageUrl ? (
        <div className="h-48 bg-gray-100">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-lg font-semibold">{campaign.title}</h2>
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">
            {campaign.description}
          </p>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>
              {formatMoneyFromCents(campaign.currentAmountCents)} raised
            </span>

            <span className="text-gray-500">
              Goal {formatMoneyFromCents(campaign.goalAmountCents)}
            </span>
          </div>

          <div className="h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-black"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {campaign.impactSummary ? (
          <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
            {campaign.impactSummary}
          </p>
        ) : null}

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          View Campaign
        </Link>
      </div>
    </article>
  );
}
