import axios from 'axios';
import {API_DOMAIN} from '../config';

export const getShows = (params) => {
    let url = `${API_DOMAIN}/api/shows`;
    const queryParams = new URLSearchParams(params).toString();
    if(queryParams) url = url + '?' + queryParams
    return axios.get(url);
}

export const getShowDetail = (slug)  => {
    return axios.get(`${API_DOMAIN}/api/show/${slug}`);
}

export const getEpisodeDetail = (slug, slugEpisode) => {
    return axios.get(`${API_DOMAIN}/api/show/${slug}/${slugEpisode}`);
}