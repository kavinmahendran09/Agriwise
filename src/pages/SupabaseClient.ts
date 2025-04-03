// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fcltxrscktutnfxqdisc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjbHR4cnNja3R1dG5meHFkaXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjA4NjgsImV4cCI6MjA1ODAzNjg2OH0.orJNO1J5pc0UsNIJR6rbAWGlhM8Me8z2ueCM0B6Lp1s";

export const supabase = createClient(supabaseUrl, supabaseKey);