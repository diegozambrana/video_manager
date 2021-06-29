import axios from 'axios';
import {API_DOMAIN} from '../config';

export const getMovies = (params) => {
    let url = `${API_DOMAIN}/api/movies`;
    const queryParams = new URLSearchParams(params).toString();
    if(queryParams) url = url + '?' + queryParams
    return axios.get(url)
}

export const getMovieDetail = (slug)  => {
    return axios.get(`${API_DOMAIN}/api/movie/${slug}`)
}