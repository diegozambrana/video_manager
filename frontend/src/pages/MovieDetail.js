import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {
  Button,
  Item,
  Loading,
  IFramePlayer,
  LinkShare
} from '../components';
import { getMovieDetail } from '../apis';
import { getOrderOptions } from '../utils';

export const MovieDetail = () => {
  const {slug} = useParams()
  const [movieDetail, setMovieDetail] = React.useState({})
  const [mounted, setMounted] = React.useState(false)
  const [currentSource, setCurrentSource] = React.useState('');
  const classes = useStyles();
  const shareLink = `${window.location.origin}/movie/${movieDetail.slug}`

  React.useEffect(() => {
    if(mounted) setMounted(false)
    getMovieDetail(slug).then(response => {
      const newSource = getOrderOptions(response.data.sources)
      setMovieDetail({...response.data, sources: newSource})
      setCurrentSource(response.data.sources[0])
      setMounted(true)
    });
  }, [slug])

  return ( mounted ? (
      <Box>
        <Grid container>
          <Grid item sm={5} md={4}>
            <Box p={1}>
              <img src={movieDetail.image} alt={movieDetail.name} width="100%"/>
            </Box>
          </Grid>
          <Grid item sm={7} md={8}>
            <Box p={1}>
              <Typography variant="h3" component="h3">{movieDetail.title}</Typography>
              <Typography variant="body1">{movieDetail.description}</Typography>
              <Box>
                <Box fontWeight="fontWeightBold" display="inline-block" >Genero:</Box>
                {movieDetail.genres && movieDetail.genres.map((genre, index) => (
                  <Box display="inline-block" ml={1} key={`genre_${index}`}>
                    <Link to={`/movies?genre=${genre.slug}`} className={classes.genre}>{genre.name}</Link>
                  </Box>
                ))}
                <Box mt={2} fontWeight="fontWeightBold" >Compartir:</Box>
                <LinkShare
                  value={shareLink}
                  title={movieDetail.title}
                  description={movieDetail.description}
                  image={movieDetail.image}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {currentSource ? (
            <Box mt={3} className={classes.playerContainer}>
            <IFramePlayer source={currentSource}/>
            </Box>
        ) : (
            <Box position="relative">
            <img src={movieDetail.image} alt="movie Image" width="100%"/>
            <Box position="absolute" className={classes.alertNoEpisode}>
                <Typography className={classes.alertNoEpisodeText}>
                <ErrorOutlineIcon fontSize="large" /> <span>El episodio actual no está disponible</span>
                </Typography>
            </Box>
            </Box>
        )}
        <Box display="flex" p={1} className={classes.controlBar}>
          {movieDetail.sources.length > 1 && movieDetail.sources.map((source, index) => (
            <Box mr={1} key={`option_${index}`}>
              <Button
                size="small"
                disabled={source.url_source === currentSource.url_source}
                label={source.label ||`Opción ${index + 1}`}
                onClickOrigin={() => setCurrentSource(source)}
              />
            </Box>
          ))}
        </Box>

        {movieDetail.related.length > 0 && (
          <>
            <Box mt={3}>
              <Typography variant="h5" component="h4">Películas Relacionadas</Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                {movieDetail.related.map((item, index) => (
                  <Grid item key={`index_related_${index}`} xs={6} sm={4} md={3}>
                    <Item item={item} type='movie' />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

      </Box>
    ) : <Loading />
  )
}

const useStyles = makeStyles(theme => ({
  link: {
    color: 'white',
    textDecoration: 'none',
    width: '100%',
    display: 'block',
    padding: '7px 3px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& span': {
      verticalAlign: 'top',
      lineHeight: '24px'
    }
  },
  list: {
    width: '100%'
  },
  listContainer: {
    background: '#121315',
    color: 'white !important',
    borderBottom: '1px solid #505258',
  },
  listDetail: {
    background: '#121315',
    
  },
  listElement: {
    display: 'block',
    borderBottom: '1px solid #505258',
    '&:last-child': {borderBottom: 'none'}
  },
  controlBar: {
    backgroundColor: 'black'
  },
  playerContainer: {
    width:'100%',
    paddingBottom: '56.25%',
    position: 'relative',
    backgroundColor: 'black'
  },
  genre: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 'bold'
  },
}));