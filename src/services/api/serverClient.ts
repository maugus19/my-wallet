import {cache} from 'react';
import {cookies} from 'next/headers';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';

/**
 * @name createServerClient
 * @desc Returns a server client based on the cookies to interact with the database
 * @returns {ServerClient}
 */
export const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<any>({
    cookies: () => cookieStore
  });
});