import React from "react";
import {getShows, getMovies} from '../apis';
import {useHistory} from 'react-router-dom';

export const withList = (BaseComp, hocParams) => (props) => {
  const {type} = hocParams;
  const [list, setList] = React.useState([])
  const [loadingList, setLoadingList] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isGenre, setIsGenre] = React.useState(false);
  const history = useHistory();
  const [genre, setGenre] = React.useState(null)

  const updateValues = (response) => {
    // set data with response
    setLoadingList(false);
    if(response.data.genre) setGenre(response.data.genre);
    setList(response.data.results);
    setTotal(response.data.count);
  }

  const getParams = () => {
    // get query string and set params
    const pageNumber = (new URLSearchParams(history.location.search)).get('page')
    const genreParam = (new URLSearchParams(history.location.search)).get('genre')
    let params = {}
    if(pageNumber) {
      setPage(parseInt(pageNumber) || 1);
      params['page'] = pageNumber;
    }
    if(genreParam){
      params['genre'] = genreParam;
      if(!isGenre) setIsGenre(true);
    }else{
      setIsGenre(false);
      setGenre(null)
    }
    return params;
  }

  React.useEffect(() => {
    // get params
    const params = getParams()

    // get data
    if(type === 'show'){
      setLoadingList(true);
      getShows(params).then(updateValues);
    }
    if(type === 'movie'){
      setLoadingList(true);
      getMovies(params).then(updateValues);
    }
  }, [type])

  React.useEffect(() => {
    // listen when path url change
    let unlisten = history.listen((location, action) => {
      if(action === 'PUSH'){
        const params = getParams();
        setLoadingList(true);
        if(type === 'show') getShows(params).then(updateValues);
        if(type === 'movie') getMovies(params).then(updateValues);
      }
    });
    return () => unlisten()
  }, [history]);

  return (
    <BaseComp
      type={type}
      title={type === 'show' ? 'Series' : type === 'movie' ? 'Películas' : 'Cortos'}
      list={list}
      totalElements={total}
      page={page}
      isGenre={isGenre}
      genre={genre}
      loadingList={loadingList}
    />
  )
}