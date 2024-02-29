import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/chatroom')) {
    redirect('/login')
  }
  if (request.nextUrl.pathname.startsWith('/about')) {
    redirect('/login')
  }
}
export const config = {
  matcher: ['/chatroom', '/about'],
}