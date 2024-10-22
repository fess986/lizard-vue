//DB pass  8V5#hm5EkjTS$Gn
import { createClient } from '@supabase/supabase-js'

const SUPER_BASE_URL = 'https://ptnrbyuxpfwajjspvmcd.supabase.co'
const SUPER_BASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bnJieXV4cGZ3YWpqc3B2bWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNTczNzAsImV4cCI6MjA0NDkzMzM3MH0.CY6Q0Blj9qKX_4UAjP-mkXzpDm2Fb0lAuq0anT-t8GE'

const supabase = createClient(SUPER_BASE_URL, SUPER_BASE_API_KEY)

export default supabase