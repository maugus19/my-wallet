import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server';

import type {NextRequest} from 'next/server';

export async function middleware(req: NextRequest) {

  const res = NextResponse.next();
  const supabase = createMiddlewareClient<any>({req, res});
  /*const session = await supabase.auth.getSession();

  if (session.data.session === null && req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.json({success: false, message: 'User not authenticated.'},
      {status: 401});
  }

  if (session.data.session === null && (req.nextUrl.pathname.startsWith('/pages'))) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
*/
  return res;
}

export const config = {
  matcher: ['/api/:path*', '/pages/:path*']
};