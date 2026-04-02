import { createClient } from '@supabase/supabase-js';
 
// These variables are read from your .env file during local development,
// and from the GitHub Secrets during the Azure build process.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
 
// This check provides a helpful error message in the browser console
// if the environment variables are missing or misconfigured.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Fatal Error: Missing Supabase environment variables. ' +
    'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}
 
// Create and export the single, reusable Supabase client instance.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
