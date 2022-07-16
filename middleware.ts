// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	console.log({ req: req.nextUrl })
  return NextResponse.next();
}

// Indica en que rutas se va a ejecutar el middleware:
export const config = {
  matcher: [
		/* '/api/:path', */
		'/api/entries/:path'
	],
}