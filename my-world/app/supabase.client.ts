import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.SUPABASE_URL
const SUPABASE_KEY = import.meta.env.SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables for Client based access')
}

export const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

export default supabaseClient;