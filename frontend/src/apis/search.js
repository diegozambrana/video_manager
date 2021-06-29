import axios from 'axios';
import {API_DOMAIN} from '../config';

export const getSearch = (q) => {
    return axios.get(`${API_DOMAIN}/api/search/?q=${q}`);
}