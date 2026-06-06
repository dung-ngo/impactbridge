"use client";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>
      <p className="text-sm text-gray-600">Current email: {email}</p>
    </form>
  );
}
