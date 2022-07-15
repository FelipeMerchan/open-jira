import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
| { message: string }
| IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	/* Antes de llegar a la DB podemos preguntar si el ID es un ID
	valido de Mongo: */
	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ message: 'El id no es valido' + id })
	}
	
	switch (req.method) {
		case 'PUT':
				return updateEntry(req, res);

		default:
				return res.status(400).json({ message: 'Metodo no existe' })
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();

	const entryToUpdate = await Entry.findById(id);

	if (!entryToUpdate) {
		await db.disconnect();
		return res.status(400).json({ message: 'No hay una entrada con el ID: ' + id });
	}

	const {
		description = entryToUpdate.description,
		status = entryToUpdate.status,
	} = req.body;

	try {	
		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			/* Campos que queremos actualizar: */
			{ description, status },
			{
				/* Para que revise que el estado sea uno de los estados permitidos
				en nuestra enumeracion ('pending', 'in-progress', 'finished'): */
				runValidators: true,
				/* Para que nos regrese la informacion actualizada: */
				new: true
			}
		)
		await db.disconnect();
		res.status(200).json(updatedEntry!);
	} catch (error: any) {
		await db.disconnect();
		res.status(400).json({ message: error.errors.status.message })
	}
}
