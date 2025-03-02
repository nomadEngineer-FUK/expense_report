import { createClient } from '@supabase/supabase-js';
import { useRuntimeConfig } from '#app';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const supabaseUrl: string = config.public.SUPABASE_URL ?? '';
    const supabaseAnonKey: string = config.public.SUPABASE_KEY ?? '';

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase URL または Key が設定されていません！");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    return {
        provide: {
            supabase
        }
    };
});
