export function formatMoneyFromCents(amountCents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountCents / 100);
}

export function formatMoneyToCents(amount: number) {
  return amount * 100;
}
