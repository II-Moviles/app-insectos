import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://lstccccsatkotwxvzure.supabase.co";

const supabaseAnonKey = "sb_publishable_10bBJqQgGFKwhjxH4EgGyg_dd9kttMg";


export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);