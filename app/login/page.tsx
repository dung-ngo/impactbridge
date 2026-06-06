import AuthCard from "@/src/features/auth/components/AuthCard";
import { LoginForm } from "@/src/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="bg-gray-100 px-4 py-16">
      <AuthCard
        title="Welcome back!"
        description="Log in to manage campaigns, pledges, and donations"
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
