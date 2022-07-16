import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	ok: boolean;
	message: string | string[];
}

/* Este endpoint va a ser utilizado para todos los bad request
de la app: */
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { message = 'Bad request' } = req.query;	

	res.status(400).json({
		ok: false,
		message,
	})
}