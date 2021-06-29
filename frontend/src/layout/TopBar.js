import React from 'react';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { SearchBox } from '../components';
import clsx from  'clsx';

export const TopBar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.container}>
      <Toolbar>
        <Box className={classes.containerWrapper} pb={2}>
          <Box className={classes.box}>
            <Link to='/' className={classes.link}>
              <img src="https://django-mrtrvideos.s3.us-east-2.amazonaws.com/logo.png" alt="Rukos.tv"/>
            </Link>
          </Box>
          <Box className={classes.box}>
            <nav className={classes.nav}>
              <li><Link to="/shows">Series</Link></li>
              <li><Link to="/movies">Películas</Link></li>
              <li><Link to="/">Cortos</Link></li>
            </nav>
          </Box>
          <Box className={clsx(classes.box, classes.searchBox)}>
            <SearchBox />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    marginTop: theme.spacing(1)
  },
  containerWrapper: {
    maxWidth: 1280,
    margin: '0 auto',
    width: '100%',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    '@media screen and (max-width: 500px)': {paddingBottom: '0 !important'}
  },
  link: {
    display: 'block',
    height: 40,
    '& img': {
      height: 40,
      '@media screen and (max-width: 500px)': { height: 25 }
    }
  },
  nav: {
    '& li': {
      display: 'inline-block',
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      '@media screen and (max-width: 500px)': {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
      '& a': {
        color: 'white',
        opacity: 0.8,
        textDecoration: 'none',
        fontWeight: 'bold',
        lineHeight: `${theme.spacing(5)}px`,
        fontSize: theme.typography.body1.fontSize,
        '@media screen and (max-width: 500px)': {
          fontSize: theme.typography.body2.fontSize,
        },
        '&:hover': {
          opacity: 1,
        }
      }
    }
  },
  box: {
    display: 'inline-block',
    verticalAlign: 'top'
  },
  searchBox: {
    width: 'calc(100% - 420px)',
    '@media screen and (max-width: 500px)': { width: 'calc(100% - 292px)' }
  },
}));