
const hostname = window.location.hostname;
const BASE_API_URL = `http://${hostname}:8081`;
// const BASE_API_URL = 'http://localhost:8081';

const BASE_BACKEND_CLIENTS = `${BASE_API_URL}/backendAlianza/clients`;

export const CLIENTS_API = {
  BASE_BACKEND_CLIENTS: `${BASE_API_URL}/backendAlianza/clients`,
  GET_ALL_CLIENTS: `${BASE_BACKEND_CLIENTS}/getAllClients`,
  GET_CLIENTS_BY_SHARED_KEY: `${BASE_BACKEND_CLIENTS}/getClientsBySharedKey`,
  POST_CREATE_CLIENT: `${BASE_BACKEND_CLIENTS}/create`,
};
