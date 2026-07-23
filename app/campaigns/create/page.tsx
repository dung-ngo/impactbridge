import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CreateCampaign() {
  const session = await auth();
  console.log(session);
  if (!session?.user) {
    redirect("/login");
  }

  const isRoleValid = session?.user.role === "DONOR" ? false : true;

  return (
    <div>
      <div className="mx-auto max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        {!isRoleValid ? (
          <p className="text-2xl font-bold">
            Only Campaign Creator can create campaign.
          </p>
        ) : (
          <div className="mt-20 flex justify-center">
            <p className="text-8xl font-bold">COMING SOON!</p>
          </div>
        )}
      </div>
    </div>
  );
}
