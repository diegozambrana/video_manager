import React from 'react';
import { Box, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {ENABLED_ADS} from '../config';

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
  linkContainer: {
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
  },
}));

export const Item = (props) => {
  const {item, type} = props
  const classes = useStyles();

  const LinkItem = (props) => ENABLED_ADS && item.ads_url ? (
    <a className={classes.linkContainer} href={item.ads_url}>
      {props.children}
    </a>
  ) : (
    <Link className={classes.linkContainer} to={`/${type}/${item.slug}`}>
      {props.children}
    </Link>
  );

  return (
    <Box className={classes.itemContainer}>

      <Box position="relative">
        <LinkItem>
          <img
            className={classes.image}
            alt={type === 'movie' ? item.title : item.name}
            src={item.image}
          />

          <Hidden smDown>
            <Box position="absolute" className={classes.boxHover}>
              <Box className={classes.boxHoverWraper}>
                <PlayCircleOutlineIcon style={{fontSize: '50px'}} />
                <Typography
                  align="center"
                  className={classes.text}
                  variant='h6' component='h6'
                >
                  {type === 'movie' ? item.title : item.name}
                </Typography>
              </Box>
            </Box>
          </Hidden>

        </LinkItem>
      </Box>

      <Hidden mdUp>
        <Box>
          <LinkItem className={classes.linkContainer} to={`/${type}/${item.slug}`}>
            <Typography
              align="center"
              className={classes.text}
              variant='h6' component='h6'
            >
              {type === 'movie' ? item.title : item.name}
            </Typography>
          </LinkItem>
        </Box>
      </Hidden>

    </Box>
  )
}