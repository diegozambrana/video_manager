import axios from 'axios';
import {API_DOMAIN} from '../config';
import {setPage} from '../features/page/pageSlice';

export const getSlider = (slug) => (dispatch) => {
  return axios.get(`${API_DOMAIN}/api/slider/${slug}`).then(
    response => {
      const field = slug === 'movie' ? 'movieSlider' : slug === 'show' ? 'showSlider' : 'homeSlider';
      dispatch(
        setPage({field: field, value: response.data.items})
      )
    },
  );
}

export const getCollections = () => (dispatch) => {
  return axios.get(`${API_DOMAIN}/api/collections/`).then(
    response => (
      dispatch(
        setPage({field: 'collections', value: response.data})
      )
    )
  )
}

export const getCollection = (slug) => (dispatch) => {
  return axios.get(`${API_DOMAIN}/api/collections/${slug}`).then(response => (
    dispatch(
      setPage({field: 'collection', value: response.data})
    )
  ));
}