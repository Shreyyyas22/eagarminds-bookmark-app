import { createClient } from "@/lib/supabase/server";
import { handleSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = handleSchema.safeParse(searchParams.get("handle") ?? "");

  if (!parsed.success) {
    return Response.json({
      available: false,
      message: parsed.error.issues[0]?.message,
    });
  }

  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("handle")
    .eq("handle", parsed.data)
    .maybeSingle();

  return Response.json({ available: !data });
}
