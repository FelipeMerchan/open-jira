import { isValidObjectId } from 'mongoose';

import { db } from '.';
import { Entry, IEntry } from '../models';

export const getEntryById = async (id: string): Promise<IEntry | null> => {
	if(!isValidObjectId(id)) return null;

	await db.connect();
	/* lean trae la informacion minima necesaria para poder trabajar.
	Por ejemplo, si no usamos lean en la variable entry de la linea 17
	vamos a tener objetos como el save, populate, etc. Por otro lado,
	si usamos lean solo tendremos las propiedades del objeto entry (_id,
	createdAt, status, etc).
	lean es utilizado cuando sabemos que vamos a trabajar
	con menos informacion: */
	const entry = await Entry.findById(id).lean()
	await db.disconnect();

	return entry;
}
