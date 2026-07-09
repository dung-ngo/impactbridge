import Link from "next/link";
import { auth } from "@/auth";
import { PROFILE_PICTURES } from "@/src/data/profilePictures";
import UserMenu from "./UserMenu";

export async function Navbar() {
  const session = await auth();
  const userLabel = session?.user?.name ?? session?.user?.email;
  const profileImage = session?.user?.profilePicture || PROFILE_PICTURES[0];

  return (
    //sticky top-0 z-2000
    <header className="border-b border-app-midgreen bg-app-midgreen text-app-salmon ">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-3 pb-2">
        <Link href="/" className="text-xl font-bold">
          ImpactBridge
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/campaigns"
            className="text-app-salmon pr-5 hover:font-bold"
          >
            Campaigns
          </Link>

          {session?.user ? (
            <UserMenu userLabel={userLabel} profilePicture={profileImage} />
          ) : (
            <>
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
