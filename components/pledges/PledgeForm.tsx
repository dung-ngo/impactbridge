"use client";

import { formatMoneyToCents } from "@/src/lib/formatMoney";
import { createPledge } from "@/src/lib/pledges/createPledge";
import { useState, SubmitEvent } from "react";

type PledgeFormProps = {
  campaignId: string;
  campaignTitle: string;
};

export default function PledgeForm({
  campaignId,
  campaignTitle,
}: PledgeFormProps) {
  const [amount, setAmount] = useState("");
  const [pledgeMessage, setPledgeMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setFeedbackMessage("");

    const amountNumber = Number(amount);

    if (!amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setFeedbackMessage("Please enter a valid pledge amount.");
      return;
    }

    const amountCents = formatMoneyToCents(amountNumber);

    try {
      setIsSubmitting(true);

      const result = await createPledge({
        campaignId,
        amountCents,
        message: pledgeMessage,
      });

      if (result.success) {
        setAmount("");
        setPledgeMessage("");
      }
    } catch (error) {
      console.error("Failed to create pledge:", error);
      setFeedbackMessage("Something went wrong.Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border p-4">
      <h2 className="text-xl font-semibold">Make a pledge</h2>

      <p className="mt-2 text-sm text-gray-600">
        Promise future support for <strong>{campaignTitle}</strong>.
      </p>

      <label htmlFor="pledgeAmount" className="mt-6 block text-sm font-medium">
        Pledge amount
      </label>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-gray-500">$</span>

        <input
          id="pledgeAmount"
          name="pledgeAmount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="50"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <label htmlFor="pledgeMessage" className="mt-4 block text-sm font-medium">
        Message optional
      </label>

      <textarea
        id="pledgeMessage"
        name="pledgeMessage"
        value={pledgeMessage}
        onChange={(event) => setPledgeMessage(event.target.value)}
        placeholder="I would like to support this campaign soon."
        className="mt-2 min-h-24 w-full rounded-md border px-3 py-2 text-sm"
      />

      {feedbackMessage ? (
        <p className="mt-3 text-sm text-gray-700">{feedbackMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? "Saving pledge..." : "Save pledge"}
      </button>
    </form>
  );
}
