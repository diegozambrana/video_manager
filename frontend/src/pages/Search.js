import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { getSearch } from '../apis';
import { Item, Loading } from '../components';

const useStyles = makeStyles((theme) => ({
  bold: {fontWeight: 'bold'}
}));

const AlertSearch = (props) => (
  <Box mt={3}>
    <Alert variant="outlined" severity="info">
      <Typography color="primary">
        No se ha encontrado {props.tag} para <Box fontWeight="fontWeightBold" component="span">{props.query}</Box>.
      </Typography>
    </Alert>
  </Box>
)

export const Search = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [query, setQuery] = React.useState('');
  const [shows, setShows] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const loadData = (q) => {
    setQuery(q)
    if(!loading){
      setLoading(true)
      getSearch(q).then(response => {
        setMovies(response.data.movies);
        setShows(response.data.shows);
        setLoading(false)
      })
    }
  }

  React.useEffect(() => {
    const q = (new URLSearchParams(history.location.search)).get('q')
    loadData(q)
  }, [])

  React.useEffect(() => {
    let unlisten = history.listen((location, action) => {
      if(action === 'PUSH'){
        const q = (new URLSearchParams(history.location.search)).get('q')
        loadData(q)
      }
    });
    return () => unlisten()
  }, [history]);

  const render_item = (item, index, type) => {
    return (
      <Grid item key={`index_${type}_${index}`}
        xs={ type === "show" ? 12 : 6}
        sm={ type === "show" ? 6 : 4}
        md={ type === "show" ? 4 : 3}
      >
        <Item item={item} type={type} />
      </Grid>
    )
  }

  return ( loading ?
      <Loading />
    :
      <Box>
        <Box>
          <Typography
            variant="h5"
            component="h5"
            style={{color: 'white'}}
            className={classes.bold}
          >
            {shows.length} Resultados para "
            <Typography
              variant="h5"
              color="primary"
              component="span"
              className={classes.bold}
            >{query}</Typography>
            " en Series:
          </Typography>
        </Box>
        { shows.length > 0 ? (
          <Box mt={3}>
            <Grid container spacing={2}>
              {shows.map((item, index) => render_item(item, index, 'show'))}
            </Grid>
          </Box>
        ) : <AlertSearch tag="series" query={query} /> }

        <Box mt={3}>
          <Typography
            variant="h5"
            component="h5"
            style={{color: 'white'}}
            className={classes.bold}
          >
            {movies.length} Resultados para "
            <Typography
              variant="h5"
              color="primary"
              component="span"
              className={classes.bold}
            >{query}</Typography>
            " en Peliculas:
          </Typography>
        </Box>
        { movies.length > 0 ? (
          <Box mt={3}>
            <Grid container spacing={2}>
              {movies.map((item, index) => render_item(item, index, 'movie'))}
            </Grid>
          </Box>
        ) : <AlertSearch tag="películas" query={query} /> }
      </Box>
  )
}