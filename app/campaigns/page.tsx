import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { mockCampaigns } from "@/src/data/mockCampaigns";

export default function CampaignsPage() {
  const publishedCampaigns = mockCampaigns.filter(
    (campaign) => campaign.status === "PUBLISHED",
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="mt-2 text-gray-600">
          Discover campaigns and support meaningful work.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {publishedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </main>
  );
}
