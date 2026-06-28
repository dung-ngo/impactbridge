"use client";

import { useState } from "react";
import { createDonation } from "@/src/lib/donations/createDonation";
import { formatMoneyToCents } from "@/src/lib/formatMoney";

type DonationFormProps = {
  campaignId: string;
  campaignTitle: string;
};

export default function DonationForm({
  campaignId,
  campaignTitle,
}: DonationFormProps) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    const amountNumber = Number(amount);

    if (!amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setMessage("Please enter a valid donation amount.");
      return;
    }

    const amountCents = formatMoneyToCents(amountNumber);

    try {
      setIsSubmitting(true);

      const result = await createDonation({
        campaignId,
        amountCents,
      });

      setMessage(result.message);
      if (result.success) {
        setAmount("");
      }
    } catch (error) {
      console.error("Failed to submit donation:", error);
      setMessage("Something went wrong. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Support this campaign</h2>

      <p className="mt-2 text-sm text-gray-600">
        You are donating to <strong>{campaignTitle}</strong>.
      </p>

      <label htmlFor="amount" className="mt-6 block text-sm font-medium">
        Donation amount
      </label>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-gray-500">$</span>

        <input
          id="amount"
          name="amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="20"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? "Submitting..." : "Donate now"}
      </button>
      {/* <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={true}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Make a Pledge (comming soon)
        </button>
      </div> */}
    </form>
  );
}
