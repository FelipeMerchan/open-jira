// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith('/api/entries/')) {
		const id = req.nextUrl.pathname.replace('/api/entries/', '');
		/* Hace la evaluacion para saber si algun valor es un ID de Mongo: */
		const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
		if (!checkMongoIDRegExp.test(id)) {
			const url = req.nextUrl.clone();
			url.pathname = '/api/bad-request';
			/* Envia un mensaje que es leido por bad-request.ts: */
			url.search = `?message=${id} is not a valid MongoID`;

			/* Sobre estribe en base en el URL que le pasemos
			como parametro: */
			return NextResponse.rewrite(url);
		}
	}

	/* Este return se sugiere colocarlo porque
	cuando queremos continuar con el proceso debemos llamar los siguiente: */
  return NextResponse.next();
}

// Indica en que rutas se va a ejecutar el middleware:
export const config = {
  matcher: [
		/* '/api/:path', */
		'/api/entries/:path'
	],
}