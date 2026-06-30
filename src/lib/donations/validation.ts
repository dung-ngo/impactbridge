type ParseDonationAmountResult =
  | {
      success: true;
      amountCents: number;
    }
  | {
      success: false;
      message: string;
    };

export function parseDonationAmountToCents(
  amount: string,
): ParseDonationAmountResult {
  // Trim removes accidental spaces like " 20 ".
  const trimmedAmount = amount.trim();

  if (!trimmedAmount) {
    return {
      success: false,
      message: "Please enter a donation amount.",
    };
  }

  const amountNumber = Number(trimmedAmount);

  // Number.isFinite protects against invalid numbers like NaN and Infinity.
  if (!Number.isFinite(amountNumber)) {
    return {
      success: false,
      message: "Please enter a valid donation amount.",
    };
  }

  if (amountNumber <= 0) {
    return {
      success: false,
      message: "Donation amount must be greater than 0.",
    };
  }

  const amountCents = Math.round(amountNumber * 100);

  return {
    success: true,
    amountCents,
  };
}

export function isValidAmountCents(amountCents: number): boolean {
  // Server-side values should already be cents, so they must be a positive integer.
  return Number.isInteger(amountCents) && amountCents > 0;
}
