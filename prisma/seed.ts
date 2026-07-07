import {
  CampaignStatus,
  DonationStatus,
  PrismaClient,
  Role,
} from "@prisma/client";

import { mockCampaigns } from "../src/data/mockCampaigns";
import { PROFILE_PICTURES } from "@/src/data/profilePictures";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  await prisma.pledge.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.user.deleteMany();

  const creator = await prisma.user.create({
    data: {
      name: "Campaign Creator",
      email: "creator@example.com",
      passwordHash: "creator",
      role: Role.CREATOR,
      profilePicture: PROFILE_PICTURES[0],
    },
  });

  const donor = await prisma.user.create({
    data: {
      name: "Demo Donor",
      email: "donor@example.com",
      passwordHash: "donor",
      role: Role.DONOR,
      profilePicture: PROFILE_PICTURES[0],
    },
  });

  const createdCampaigns = [];

  for (const campaign of mockCampaigns) {
    const createdCampaign = await prisma.campaign.create({
      data: {
        creatorId: creator.id,
        title: campaign.title,
        slug: campaign.slug,
        description: campaign.description,
        imageUrl: campaign.imageUrl,
        impactSummary: campaign.impactSummary,
        goalAmountCents: campaign.goalAmountCents,
        currentAmountCents: campaign.currentAmountCents,
        status: CampaignStatus.PUBLISHED,
      },
    });

    createdCampaigns.push(createdCampaign);
  }

  const firstCampaign = createdCampaigns[0];

  if (firstCampaign) {
    await prisma.donation.create({
      data: {
        campaignId: firstCampaign.id,
        donorId: donor.id,
        amountCents: 2000,
        currency: "usd",
        status: DonationStatus.SUCCEEDED,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
