// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufckjkdqoygveopqbkai.supabase.co'; // Replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmY2tqa2Rxb3lndmVvcHFia2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODYzMjYsImV4cCI6MjA2NzU2MjMyNn0.SJNXTy_bkqMkh_5ncNDG1wAiwR42K9Dk_oLB1905pKQ'; // Replace with your anon key

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
