import {
  CampaignStatus,
  DonationStatus,
  PledgeStatus,
  PrismaClient,
  Role,
} from "@prisma/client";

import { mockCampaigns } from "../src/data/mockCampaigns";

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
      passwordHash: "demo-password-hash",
      role: Role.CREATOR,
    },
  });

  const donor = await prisma.user.create({
    data: {
      name: "Demo Donor",
      email: "demo@example.com",
      passwordHash: "demo-password-hash",
      role: Role.DONOR,
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

    await prisma.pledge.create({
      data: {
        campaignId: firstCampaign.id,
        donorId: donor.id,
        amountCents: 5000,
        currency: "usd",
        status: PledgeStatus.ACTIVE,
        message: "I would love to support this campaign soon.",
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
