type Donation = {
  id: string;
  title: string;
  amount: number;
  status: "pending" | "completed";
};

export async function getUserDonations(userEmail: string): Promise<Donation[]> {
  return [
    {
      id: "1",
      title: "Animal shelter support",
      amount: 20,
      status: "completed",
    },
    {
      id: "2",
      title: "Vegan outreach campaign",
      amount: 15,
      status: "pending",
    },
  ];
}
