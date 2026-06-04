import type { Campaign } from "@/src/types/campaign";

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Help Fund Emergency Animal Care",
    slug: "emergency-animal-care",
    description:
      "Support urgent medical care, food, and shelter for rescued animals in need.",
    imageUrl: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8",
    impactSummary:
      "$10 can help provide food and basic care for one rescued animal.",
    goalAmountCents: 500000,
    currentAmountCents: 185000,
    status: "PUBLISHED",
  },
  {
    id: "2",
    title: "Support Community Vegan Education",
    slug: "community-vegan-education",
    description:
      "Help create accessible educational materials and workshops about plant-based living.",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
    impactSummary: "$25 can help fund one local workshop participant.",
    goalAmountCents: 300000,
    currentAmountCents: 90000,
    status: "PUBLISHED",
  },
  {
    id: "3",
    title: "Build a Small Sanctuary Support Fund",
    slug: "sanctuary-support-fund",
    description:
      "Contribute to daily care, maintenance, and enrichment for rescued farmed animals.",
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a",
    impactSummary: "$50 can support sanctuary food and bedding supplies.",
    goalAmountCents: 800000,
    currentAmountCents: 240000,
    status: "PUBLISHED",
  },
];
