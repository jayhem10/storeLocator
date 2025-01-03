import { SupabaseClient } from "@supabase/supabase-js";

declare module "#supabase" {
  export const useSupabaseClient: () => SupabaseClient;
  export const useSupabaseUser: () => any;
  export const useSupabaseAuth: () => any;
}
