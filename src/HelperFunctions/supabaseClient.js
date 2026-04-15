import { createClient } from "@supabase/supabase-js";
const projectUrl = import.meta.env.VITE_PROJECT_URL;
const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;

export const supabase = createClient(projectUrl, publishableKey);
