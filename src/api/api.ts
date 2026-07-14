import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://deskly-back-api-deskly.xqmbls.easypanel.host',
  timeout: 10000,
});
