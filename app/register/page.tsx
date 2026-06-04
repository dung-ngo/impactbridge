import AuthCard from "@/src/features/auth/components/AuthCard";

export default function RegisterPage() {
  return (
    <main className="bg-gray-100 px-4 py-16">
      <AuthCard
        title="Create your account"
        description="Join as a donor or campaign creator"
      />
    </main>
  );
}
