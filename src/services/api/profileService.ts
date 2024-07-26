import { createServerClient } from "./serverClient";

export async function getProfile() {
  const supabase = createServerClient();
  const user = await supabase.auth.getUser();

  const {data: profiles} = await supabase.from('profiles')
    .select('*')
    .eq('id', user.data.user!.id);
  return profiles![0];
}
