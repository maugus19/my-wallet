import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
let supabase: any = null;

/**
 * @name init
 * @desc Initialize the supabase client with binding event to handle the cookies
 */
export function init() {
  supabase = createClientComponentClient<any>();
  supabase.auth.onAuthStateChange((event: any, session: any) => {
    if (typeof window !== 'undefined') { //verifies that the call is from web
      if (event === 'SIGNED_OUT') {
        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      }
      else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `my-access-token=${session!.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${session!.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      }
    }
  });
};

/**
 * @name handleSignInWithGoogle
 * @desc Handles the sign in with googleo
 * @returns {Promise}
 */
export async function handleSignInWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });
}

export async function verifySession() {
  return await supabase.auth.getSession();
}

export async function getUser() {
  const {data: data} = await supabase.auth.getUser();

  return data.user?.email;
}

export async function handleSignOut() {
  return await supabase.auth.signOut();
}