import { NextRequest } from "next/server";
import { forwardBackend } from "@/lib/server/backend-proxy";

export const runtime = "nodejs";

async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forwardBackend(request, (await context.params).path);
}

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as PUT,
  handler as DELETE,
};
