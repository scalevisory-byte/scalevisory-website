import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next 16 renamed the middleware file convention to `proxy`. The Supabase
 * session refresh helper it calls keeps its own name — that is an internal
 * module, not the framework convention.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = { matcher: ["/admin/:path*"] };
