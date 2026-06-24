import LogoutButton from "@/src/features/auth/components/LogoutButton";
import { requireSession } from "@/src/lib/auth/requireSession";
import { getUserDonations } from "@/src/lib/donations/getUserDonations";

export default async function DashboardPage() {
  const session = await requireSession();
  const donations = await getUserDonations(session.user.email!);

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

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Your donations</h2>

          <div className="mt-4 space-y-3">
            {donations.map((donation) => (
              <div key={donation.id} className="rounded-md border p-4">
                <p className="font-medium">{donation.title}</p>
                <p className="text-sm">Amount: ${donation.amount}</p>
                <p className="text-sm">Status: {donation.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
