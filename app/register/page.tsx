import AuthCard from "@/src/features/auth/components/AuthCard";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="px-4 py-16">
      <AuthCard
        title="Create your account"
        description="Join as a donor or campaign creator"
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
