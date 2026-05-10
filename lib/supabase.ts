import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// The SDK v2 sets `Authorization: Bearer <key>` as fallback when there is no
// user session. With legacy anon JWT keys that was valid. With the new
// sb_publishable_* format the key is not a JWT, so Supabase returns 401.
// We intercept after fetchWithAuth sets the header and remove it when the
// value is the publishable key — leaving only the `apikey` header, which is
// the correct channel for this key format.
const customFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);
  if (headers.get("Authorization") === `Bearer ${supabaseAnonKey}`) {
    headers.delete("Authorization");
  }
  return fetch(input, { ...init, headers });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: customFetch },
});
