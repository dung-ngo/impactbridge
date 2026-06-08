export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(
    {
      success: true,
      message: "Register API is working.",
      data: body,
    },
    {
      status: 200,
    },
  );
}
