import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";

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
  /* Desconectarse de la DB: */
  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' });
}