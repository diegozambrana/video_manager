import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Alert from '@material-ui/lab/Alert';
import { getShowDetail } from '../apis';
import { Loading, Item, LinkShare } from '../components';
import { ENABLED_ADS } from '../config';


export const ShowDetail = (props) => {
  const {slug} = useParams()
  const [showDetail, setShowDetail] = React.useState({})
  const [mounted, setMounted] = React.useState(false)
  const classes = useStyles();
  const shareLink = `${window.location.origin}/show/${showDetail.slug}`

  React.useEffect(() => {
    if(mounted) setMounted(false)
    getShowDetail(slug).then(response => {
      setShowDetail(response.data)
      setMounted(true)
    });
  }, [slug])

  return ( mounted ? (
      <Box>
        <Grid container>
          <Grid item sm={5} md={4}>
            <Box p={1}>
              <img src={showDetail.image} alt={showDetail.name} width="100%"/>
            </Box>
          </Grid>
          <Grid item sm={7} md={8}>
            <Box p={1}>
              <Typography variant="h3" component="h3">{showDetail.name}</Typography>
              <Typography variant="body1">{showDetail.description}</Typography>
              <Box>
                <Box fontWeight="fontWeightBold" display="inline-block" >Genero:</Box>
                {showDetail.genres && showDetail.genres.map((genre, index) => (
                  <Box display="inline-block" ml={1} key={`genre_${index}`}>
                    <Link to={`/shows?genre=${genre.slug}`} className={classes.genre}>{genre.name}</Link>
                  </Box>
                ))}
                <LinkShare
                  value={shareLink}
                  title={showDetail.name}
                  description={showDetail.description}
                  image={showDetail.image}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={2} mb={2}>
          <Typography variant="h5">
            {Object.keys(showDetail.data).length} Temporadas Disponibles
          </Typography>
        </Box>
        <Box mt={3} className={classes.seasons}>
          {Object.keys(showDetail.data).length > 0 ?
            Object.keys(showDetail.data).map((key, s_index) => ( showDetail.data[key].length > 0 && 
              <Accordion key={`season_${s_index}`}>
                <AccordionSummary
                  className={classes.listContainer}
                  expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
                  aria-controls="panel1a-content"
                  id={`season_${s_index}`}
                >Season {key}</AccordionSummary>
                <AccordionDetails className={classes.listDetail}>
                  <Box className={classes.list}>
                    {showDetail.data[key].map((chapter, c_index) => (
                      <Box className={classes.listElement} textAlign="left" key={`chapter_${c_index}`}>
                        {ENABLED_ADS && chapter.ads_url ? (
                          <a href={chapter.ads_url} className={classes.link}>
                            <PlayCircleFilledIcon />{' '}
                            <span>{chapter.season}x{chapter.number_chapter} - {chapter.name}</span>
                          </a>
                        ) : (
                          <Link to={`/show/${slug}/${chapter.slug}`} className={classes.link}>
                            <PlayCircleFilledIcon />{' '}
                            <span>{chapter.season}x{chapter.number_chapter} - {chapter.name}</span>
                          </Link>
                        )}
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            )) : 
            <Alert variant="outlined" severity="info">
              <Typography color="primary">
                No esta diponible esta serie en este momento.
              </Typography>
            </Alert>
          }
        </Box>

        {showDetail.related.length > 0 && (
          <>
            <Box mt={3}>
              <Typography style={{color: 'white'}} variant="h5" component="h4">
                Series Relacionadas
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                {showDetail.related.map((item, index) => (
                  <Grid item key={`index_related_${index}`} xs={12} sm={6} md={3}>
                    <Item item={item} type='show' />
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
    borderBottom: '1px solid #505258',
  },
  listElement: {
    display: 'block',
    borderBottom: '1px solid #505258',
    '&:last-child': {borderBottom: 'none'}
  },
  genre: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  seasons: {
    '& .MuiAccordion-root.Mui-expanded': {
      margin: '0 !important',
    }
  }
}));