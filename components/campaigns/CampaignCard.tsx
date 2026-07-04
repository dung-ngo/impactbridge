import Link from "next/link";
import Image from "next/image";
import type { Campaign } from "@prisma/client";
import { formatMoneyFromCents } from "@/src/lib/formatMoney";

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress =
    (campaign.currentAmountCents / campaign.goalAmountCents) * 100;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      {campaign.imageUrl ? (
        // Give the image area a fixed height so it does not take over the whole card.
        <div className="h-48 w-full bg-gray-100">
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            width={600}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      {/* flex-1 lets this content area fill the remaining height of the card. */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold">{campaign.title}</h2>

        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
          {campaign.description}
        </p>

        <div className="mt-5">
          <div className="flex justify-between gap-4 text-sm">
            <span className="font-medium">
              {formatMoneyFromCents(campaign.currentAmountCents)} raised
            </span>

            <span className="text-gray-500">
              Goal {formatMoneyFromCents(campaign.goalAmountCents)}
            </span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-black"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {campaign.impactSummary ? (
          <p className="mt-5 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
            {campaign.impactSummary}
          </p>
        ) : null}

        {/* mt-auto pushes the button to the bottom of the card. */}
        <div className="mt-auto pt-4">
          <Link
            href={`/campaigns/${campaign.slug}`}
            className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            View Campaign
          </Link>
        </div>
      </div>
    </article>
  );
}
