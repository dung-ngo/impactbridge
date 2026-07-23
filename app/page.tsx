import Link from "next/link";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { getPublishedCampaigns } from "@/src/lib/campaigns/getPublishedCampaigns";
import { AppButton } from "@/src/features/auth/components/AppButton";

export default async function HomePage() {
  const campaigns = await getPublishedCampaigns();
  const featuredCampaigns = campaigns.slice(0, 3);

  return (
    <main>
      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">
              Donation platform for meaningful campaigns
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Help good causes raise support with clarity and trust.
            </h1>

            <p className="mt-6 text-lg ">
              ImpactBridge helps campaign creators publish fundraising
              campaigns, receive support, and show donors how their
              contributions create impact.
            </p>

            <div className="mt-8">
              {/* <Link
                href="/campaigns"
                className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
              >
                Explore Campaigns
              </Link>

              <Link
                href="/register"
                className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-white"
                >
                Start a Campaign
              </Link> */}
              <AppButton
                pathName="/campaigns/create"
                label="Start a Campaign"
              />
              <p className="text-xs mt-5">
                <span>*</span> Only campaign creator can create new campaign
              </p>
            </div>
          </div>

          {/* <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Platform MVP</h2>

            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li>✅ Campaign creation and publishing</li>
              <li>✅ Pledges and one-time donations</li>
              <li>✅ Donor, creator, and admin dashboards</li>
              <li>✅ Hall of Fame leaderboard</li>
            </ul>
          </div> */}
        </div>
      </section>

      <section className="bg-app-midgreen text-app-salmon ">
        <div className="mx-auto max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div className="pb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured Campaigns</h2>
              <p className="mt-2">
                Browse active campaigns and support causes that matter.
              </p>
            </div>
            <div>
              <Link
                href="/campaigns"
                className="text-lg font-medium hover:underline"
              >
                View more...
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
