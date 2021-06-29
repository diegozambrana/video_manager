import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getEpisodeDetail } from '../apis';
import {
  Button,
  LinkButton,
  Loading,
  IFramePlayer,
  Item,
  LinkShare
} from '../components';
import { getOrderOptions } from '../utils';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


export const EpisodeDetail = (props) => {
  const {slug, episodeSlug} = useParams();
  const [episode, setEpisode] = React.useState({});
  const [mounted, setMounted] = React.useState(false);
  const [currentSource, setCurrentSource] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const shareLink = `${window.location.origin}/show/${slug}/${episodeSlug}`

  const loadData = (slug, episodeSlug) => {
    if(slug && episodeSlug && !loading){
      setLoading(true);
      getEpisodeDetail(slug, episodeSlug).then(
        response => {
          const newSource = getOrderOptions(response.data.sources)
          setEpisode({...response.data, sources: newSource})
          setMounted(true);
          setCurrentSource(newSource[0])
          setLoading(false);
        },
        () => {
          setLoading(false);
          history.push('/')
        }
      )
    }
  }

  React.useEffect(() => {
    loadData(slug, episodeSlug)
    let unlisten = history.listen((location, action) => {
      if(action === 'PUSH'){
        const l = location.pathname.split('/')
        setMounted(false);
        loadData(l[2], l[3])
      }
    });
    return () => {
      unlisten()
    }
  }, [slug, episodeSlug, history]);

  return (
    <Box>
      {mounted ? (
        <Box>
          {currentSource ? (
            <Box mt={3} className={classes.playerContainer}>
              <IFramePlayer source={currentSource}/>
            </Box>
          ) : (
            <Box position="relative">
              <img src={episode.show.image} alt="Episode Image" width="100%"/>
              <Box position="absolute" className={classes.alertNoEpisode}>
                <Typography className={classes.alertNoEpisodeText}>
                  <ErrorOutlineIcon fontSize="large" /> <span>El episodio actual no está disponible</span>
                </Typography>
              </Box>
            </Box>
          )}
          <Box display="flex" p={1} className={classes.controlBar}>
            {episode.sources.length > 1 && episode.sources.map((source, index) => (
              <Box mr={1} key={`option_${index}`}>
                <Button
                  size="small"
                  disabled={source.url_source === currentSource.url_source}
                  label={source.label || `Opción ${index + 1}`}
                  onClickOrigin={() => setCurrentSource(source)}
                />
              </Box>
            ))}
          </Box>
          <Box display="flex" mb={2} p={1} className={classes.controlBar}>
            <Box mr={1}>
              <LinkButton
                size="small"
                to={`/show/${episode.show.slug}`}
                label="Volver"
                icon={<ArrowBackIcon />}
              />
            </Box>
            <Box mr={1}>
              <LinkButton
                size="small"
                disabled={!episode.back}
                label='Anterior'
                icon={<SkipPreviousIcon />}
                to={`/show/${episode.show.slug}/${episode.back?.slug}`}
                adsLink={episode.back?.ads_url}
              />
            </Box>
            <Box mr={1}>
              <LinkButton
                size="small"
                label='Siguiente'
                disabled={!episode.next}
                icon={<SkipNextIcon />}
                to={`/show/${episode.show.slug}/${episode.next?.slug}`}
                adsLink={episode.next?.ads_url}
              />
            </Box>
          </Box>

          <Typography style={{color: 'white'}} variant="h6" component="h6">
            [{episode.season}x{episode.number_chapter}] {episode.show.name} - {episode.name}
          </Typography>

          <Box pt={2}>{episode.description}</Box>

          <LinkShare
            value={shareLink}
            title={`[${episode.season}x${episode.number_chapter}] ${episode.show.name} - ${episode.name}`}
            description={episode.description}
            image={episode.show.image}
          />

          {episode.related.length > 0 && (
            <>
              <Box mt={3}>
                <Typography style={{color: 'white'}}  variant="h6" component="h6">
                  Series Relacionadas
                </Typography>
              </Box>
              <Box mt={3}>
                <Grid container spacing={2}>
                  {episode.related.map((item, index) => (
                    <Grid item key={`index_related_${index}`} xs={12} sm={6} md={3}>
                      <Item item={item} type='show' />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}

        </Box>
      ) : <Loading />}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  alertNoEpisode: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    top: 0,
  },
  alertNoEpisodeText: {
    textAlign: 'center',
    marginTop: '25%',
    '& span': {
      fontSize: theme.typography.h6.fontSize,
      verticalAlign: 'top',
      lineHeight: `${theme.spacing(4.5)}px`,
    }
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '& span': {
      verticalAlign: 'top',
      lineHeight: '24px'
    }
  },
  controlBar: {
    backgroundColor: 'black'
  },
  playerContainer: {
    width:'100%',
    paddingBottom: '56.25%',
    position: 'relative',
    backgroundColor: 'black'
  }
}));