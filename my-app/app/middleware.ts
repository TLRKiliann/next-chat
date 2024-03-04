import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/')) {
    redirect('/login')
  }
  if (request.nextUrl.pathname.startsWith('/email')) {
    redirect('/login')
  }
};
export const config = {
  matcher: ['/', '/email'],
};