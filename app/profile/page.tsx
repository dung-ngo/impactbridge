import { auth } from "@/auth";
import SettingForm from "@/components/userSettings/settingForm";
import { PROFILE_PICTURES } from "@/src/data/profilePictures";

export default async function UserSettings() {
  const session = await auth();

  const currentUserName = session?.user?.name || "";
  const currentUserEmail = session?.user?.email || "";
  const currentProfilePicture =
    session?.user?.profilePicture || PROFILE_PICTURES[0];
  console.log("profile ", session?.user);
  return (
    <main className="bg-black w-full pt-8 md:pt-15">
      <SettingForm
        name={currentUserName}
        email={currentUserEmail}
        profilePicture={currentProfilePicture}
      />
    </main>
  );
}
