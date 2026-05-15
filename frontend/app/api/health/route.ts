export async function GET() {
  return Response.json({
    status: "ok",
    service: "impactbridge-next-api",
    version: "1.0.0",
  });
}
