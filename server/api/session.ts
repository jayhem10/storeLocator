import { serverSupabaseSession } from "#supabase/server";

export default defineEventHandler(async (event) => {
  return await serverSupabaseSession(event);
});
