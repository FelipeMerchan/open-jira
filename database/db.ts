/* Este archivo realiza la conexión a la base de datos */
/* mongoose es un object data modeling (ODM) que ayuda a
  trabajar con la base de datos Mongo de una manera muy sencilla */
import mongoose from 'mongoose';

/*
  Estados de las conexiones propias de Mongoose
  0 = disconnected
  1 = connected
  2 = connecting
  3 = disconnecting
*/

/* Esta configuración está pensada para reutilizar la misma conexión
con el fin de no estar creando nuevas conexiones */

const mongooConnection = {
  isConnected: 0
}

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log('Ya estábamos conectados');
    return;
  }

  /* Si ya hay alguna conexión queremos usarla: */
  if (mongoose.connections.length > 0) {
    /* readyState es el estado de la conexión: */
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    /* Si es 1 significa que vamos a utilizar esa conexión: */
    if (mongooConnection.isConnected === 1) {
      console.log('Usando conexión anterior');
      return;
    }

    /* Si tenemos otro estado que no sea el 1
    vamos a desconectarnos para evitar tener muchas
    conexiones en la base de datos: */
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongooConnection.isConnected = 1;
  console.log('Conectado a MongoDB: ', process.env.MONGO_URL);
}

export const disconnect = async () => {
  /* Si estamos en desarrollo no tiene sentido que nos
  desconectemos: */
  if (process.env.NODE_ENV === 'development') return;
  /* Si el estado es 0 quiere decir que ya estamos
  desconectados por lo cual no es necesario realizar el procedimiendo
  await mongoose.disconnect: */
  if (mongooConnection.isConnected === 0) return;

  await mongoose.disconnect();
  console.log('Desconectado de MongoDB');
}