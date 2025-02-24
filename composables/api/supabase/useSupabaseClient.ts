import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
    return createClient(
        useRuntimeConfig().public.SUPABASE_URL,
        useRuntimeConfig().public.SUPABASE_KEY
    );
};
