"use client";

import { useState } from "react";
import { TextInput } from "./TextInput";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        id="name"
        name="name"
        label="Name"
        value={name}
        onChange={setName}
        placeholder="Your name"
      />

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
        placeholder="Create a password"
      />

      <TextInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Confirm your password"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Create account
      </button>
    </form>
  );
}
