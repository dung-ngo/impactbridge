export async function POST() {
  return Response.json(
    {
      success: true,
      message: "Register API is working.",
    },
    {
      status: 200,
    },
  );
}
