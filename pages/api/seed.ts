/* En producción no enviamos este archivo seed.ts al servidor.
Lo podemos ignorar, pero creamos una copia temporal para que otros
desarrolladores lo puedan obtener con el fin de que lo puedan usar
en desarrollo. Este archivo seed es solo usado en desarrollo, en producción
debemos tener mucho cuidado porque deleteMany borraría todo de la DB. */
import { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";

type Data = {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  /* No debemos realizar este procedimiento si estamos en producción
  porque no debemos purgar la base de datos en producción: */
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este servicio' });
  }

  /* Conectarse a la base de datos: */
  await db.connect();
  /* En este espacio, entre el método connect y disconect, podemos
  hacer cualquier petición a la base de datos (lecturas, inserciones, etc)*/

  /* deleteMany va a borrar de la DB todo lo que se encuentre en
    la colección Entry: */
  await Entry.deleteMany();

  /* Inserta datos a la DB: */
  await Entry.insertMany(seedData.entries);
  /* Desconectarse de la DB: */
  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' });
}