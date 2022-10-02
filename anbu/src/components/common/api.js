const LIVE_URL = '/http:/localhost:3001/';
const BASE_URL = 'api/v1/';
const ROOT_URL = LIVE_URL+BASE_URL;
const API = {
Login : ROOT_URL+'account/login',
Register : ROOT_URL+'account/register'
}

export default API;