import { requireSession } from "@/src/lib/auth/requireSession";
import Link from "next/link";
import LogoutButton from "@/src/features/auth/components/LogoutButton";
import { auth } from "@/auth";

export async function Navbar() {
  const session = await auth();
  const userLabel = session?.user?.name ?? session?.user?.email;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          ImpactBridge
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/campaigns" className="text-gray-700 hover:text-black">
            Campaigns
          </Link>

          {session?.user ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>

              <span className="hidden text-gray-600 sm:inline">
                {userLabel}
              </span>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-black">
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
