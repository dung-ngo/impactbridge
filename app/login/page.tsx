import AuthCard from "@/src/features/auth/components/AuthCard";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="px-4 py-16">
      <AuthCard
        title="Welcome back!"
        description="Log in to manage campaigns, pledges, and donations"
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
