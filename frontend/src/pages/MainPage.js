import React from 'react';
import { getShows, getMovies } from '../apis';
import { Loading, Item, CollectionCarousel, SliderCustom as Slider } from '../components';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  boxHover: {
    backgroundColor: 'rgba(0,0,0,0.50)',
    top: 0,
    paddingTop: theme.spacing(2),
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: '.3s all',
    lineHeight: "100%",
    opacity: 0,
  },
  boxHoverWraper: {
    marginTop: theme.spacing(3)
  },
  itemContainer: {
    '&:hover': {
      '& $boxHover': {opacity: 1}
    }
  },
  text: {
    color: 'white',
    transition: '.3s all'
  },
  image: {
    width: '100%',
    cursor: 'pointer',
  },
  linkTitle: {
    textDecoration: 'none',
    fontWeight: 'Bold',
    color: 'white',
    fontSize: theme.typography.h5.fontSize,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
}));

export const MainPage = (props) => {
  const [shows, setShow] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [mountedShow, setMountedShow] = React.useState(false);
  const [mountedMovie, setMountedMovie] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    getShows().then(response => {
      setShow(response.data.results.slice(0,6));
      setMountedShow(true);
    });
    getMovies().then(response => {
      setMovies(response.data.results.slice(0,8));
      setMountedMovie(true);
    })
  }, [])

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

  return (
    <Box m={1} mt={3}>
      <Slider mode='home'/>

      <Box>
        <CollectionCarousel />
      </Box>

      <Box mb={2}>
        <Link to="/shows" className={classes.linkTitle}>Series</Link>
      </Box>
      <Grid container spacing={2}>
        {mountedShow
          ? shows.map((item, index) => render_item(item, index, 'show'))
          : <Loading />
        }
      </Grid>

      <Box mb={2} mt={3}>
        <Link to="/movies" className={classes.linkTitle}>Peliculas</Link>
      </Box>
      <Grid container spacing={2}>
        {mountedMovie
          ? movies.map((item, index) => render_item(item, index, 'movie'))
          : <Loading />
        }
      </Grid>
    </Box>
  )
}