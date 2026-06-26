import DonationList from "@/components/donations/DonationList";
import LogoutButton from "@/src/features/auth/components/LogoutButton";
import { requireSession } from "@/src/lib/auth/requireSession";
import { getUserDonations } from "@/src/lib/donations/getUserDonations";

export default async function DashboardPage() {
  const session = await requireSession();
  const userEmail = session.user.email;

  if (!userEmail) {
    throw new Error("User email is required to show donations");
  }

  const donations = await getUserDonations(userEmail);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="mt-4">
              Welcome back,{" "}
              <strong>{session.user.name ?? session.user.email}</strong>
            </p>
          </div>

          <LogoutButton />
        </div>
        <DonationList donations={donations} />
      </div>
    </main>
  );
}
