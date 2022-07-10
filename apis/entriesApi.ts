import axios from 'axios';

const entriesApi = axios.create({
	/* No es necesario usar una URL absoluta porque
	como la peticion va a salir del mismo dominio del sitio,
	no hace falta agregar toda la ruta sino una relativa: */
	baseURL: '/api'
});

export default entriesApi;
