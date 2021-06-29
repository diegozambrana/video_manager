import axios from 'axios';
import {API_DOMAIN} from '../config';

export const sendRecommend = (data) => {
    return axios.post(`${API_DOMAIN}/api/manager/recommend`, data);
}

export const sendReport = (data) => {
    return axios.post(`${API_DOMAIN}/api/manager/report`, data);
}