import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
