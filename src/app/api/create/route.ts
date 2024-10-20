import { createDirect } from "@/app/server/actions";
import { insertDirectSchema } from "@/db/schema";

export async function POST(request: Request) {
  const parsed = await insertDirectSchema.safeParseAsync(request.json());

  if (!parsed.success) {
    return Response.json({ error: parsed.error.message }, { status: 400 });
  }

  const res = await createDirect(parsed.data);
  return Response.json(res);
}
