import { createClient } from '@supabase/supabase-js'
import type { Database } from 'database.types'


// Create a single supabase client for interacting with your database
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase environment variables for server based access')
}
// Initialize the supabase client
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

export default supabase