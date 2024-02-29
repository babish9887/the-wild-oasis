import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://lcaspgxdyoewtepevzjj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYXNwZ3hkeW9ld3RlcGV2empqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxMzU2MDMsImV4cCI6MjAyMzcxMTYwM30.TLBoe9B_tzfAwPWChdmH5iwhg_5REwe_iFEQFm-yJM8"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;