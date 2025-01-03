import { serverSupabaseClient } from "#supabase/server";

// Définition du type Store
interface Store {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default eventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);

    const { data, error } = await client.from("stores").select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw createError({
        statusCode: 500,
        message: error.message,
      });
    }

    return data || [];
  } catch (err: any) {
    console.error("Store fetch error:", err);
    throw createError({
      statusCode: 500,
      message: err.message || "Failed to fetch stores",
    });
  }
});
