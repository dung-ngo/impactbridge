"use client";
import { useState } from "react";
import { TextInput } from "./TextInput";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      email,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
      />
      <TextInput
        id="password"
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Log in
      </button>
    </form>
  );
}
