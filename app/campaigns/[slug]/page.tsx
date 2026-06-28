import Link from "next/link";
import { notFound } from "next/navigation";
import DonationForm from "@/components/donations/DonationForm";
import { formatMoneyFromCents } from "@/src/lib/formatMoney";
import { getCampaignBySlug } from "@/src/lib/campaigns/getCampaignBySlug";

type CampaignDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  const { slug } = await params;

  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const progress =
    (campaign.currentAmountCents / campaign.goalAmountCents) * 100;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/campaigns" className="text-sm underline">
        ← Back to campaigns
      </Link>

      <section className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm">
        {campaign.imageUrl ? (
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="h-72 w-full object-cover"
          />
        ) : null}

        <div className="space-y-6 p-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Campaign
            </p>
            <h1 className="mt-2 text-3xl font-bold">{campaign.title}</h1>
          </div>

          <p className="text-gray-700">{campaign.description}</p>

          {campaign.impactSummary ? (
            <div className="rounded-2xl bg-gray-50 p-4">
              <h2 className="font-semibold">Estimated Impact</h2>
              <p className="mt-2 text-sm text-gray-700">
                {campaign.impactSummary}
              </p>
            </div>
          ) : null}

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>
                {formatMoneyFromCents(campaign.currentAmountCents)} raised
              </span>
              <span className="text-gray-500">
                Goal {formatMoneyFromCents(campaign.goalAmountCents)}
              </span>
            </div>

            <div className="h-3 rounded-full bg-gray-100">
              <div
                className="h-3 rounded-full bg-black"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* <div className="flex gap-3">
            <button className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white">
              Donate
            </button>
            <button className="rounded-lg border px-5 py-3 text-sm font-medium">
              Make a Pledge
            </button>
          </div> */}
          <DonationForm
            campaignId={campaign.id}
            campaignTitle={campaign.title}
          />
        </div>
      </section>
    </main>
  );
}
