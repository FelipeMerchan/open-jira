# Next.js OpenJira App

Para correr localmente, se requiere la base de datos.

```
docker-compose up -d
```

- El -d significa **detached**

- MongoDb URL local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**