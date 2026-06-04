import Link from "next/link";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { mockCampaigns } from "@/src/data/mockCampaigns";

export default function HomePage() {
  const featuredCampaigns = mockCampaigns.slice(0, 3);

  return (
    <main>
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Donation platform for meaningful campaigns
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Help good causes raise support with clarity and trust.
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              ImpactBridge helps campaign creators publish fundraising
              campaigns, receive support, and show donors how their
              contributions create impact.
            </p>

            <div className="mt-8 flex gap-3">
              <Link
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
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Platform MVP</h2>

            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li>✅ Campaign creation and publishing</li>
              <li>✅ Pledges and one-time donations</li>
              <li>✅ Donor, creator, and admin dashboards</li>
              <li>✅ Hall of Fame leaderboard</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Campaigns</h2>
            <p className="mt-2 text-gray-600">
              Browse active campaigns and support causes that matter.
            </p>
          </div>

          <Link href="/campaigns" className="text-sm font-medium underline">
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
    </main>
  );
}
