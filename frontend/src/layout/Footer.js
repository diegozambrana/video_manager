import React from 'react';
import { Box, Typography, Divider, Link as LinkRef } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RecommendModal, ReportModal } from '../components';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
  footerLink: {
    color: 'white',
    textDecoration: 'none',
    transition: '.3s all',
    cursor: 'pointer',
    '&:hover': {color: theme.palette.primary.main}
  },
  listFooter: {
    textAlign: 'center',
    padding: 0,
    '& li': {
      display: 'inline-block',
      marginRight: theme.spacing(2),
      fontSize: theme.typography.body1.fontSize,
      '&:last-child': {marginRight: 0},
    }
  },
  linkMedia: {
    lineHeight: '1.4rem',
    textDecoration: 'none !important',
    fontWeight: 'bold',
    color: 'white',
    margin: `0 ${theme.spacing(1)}px`,
    '&:hover': {
      color: theme.palette.primary.main,
      '& $linkIconMedia': {color: theme.palette.primary.main}
    }
  },
  linkIconMedia: {
    // '& svg.MuiSvgIcon-root': {
      verticalAlign: 'bottom',
      fontSize: '1.4rem',
      color: 'white',
    //}
  },
}));

export const Footer = () => {
  const [showRecommend, setShowRecommend] = React.useState(false);
  const [showReport, setShowReport] = React.useState(false);
  
  const classes = useStyles();

  return (
    <Box m={1}>
      <RecommendModal open={showRecommend} onCloseDialog={() => setShowRecommend(false)} />
      <ReportModal open={showReport} onCloseDialog={() => setShowReport(false)}/>
      <Box mt={1}>
        <ul className={classes.listFooter}>
          <li>
            <Link className={classes.footerLink} to="/acerca">
              Quienes Somos?
            </Link>
          </li>
          <li>
            <Box className={classes.footerLink} onClick={() => setShowRecommend(true)}>
              Recomendar
            </Box>
          </li>
          <li>
            <Box className={classes.footerLink} to="#" onClick={() => setShowReport(true)}>
              Reportar videos caidos
            </Box>
          </li>
          <li>
            <Link className={classes.footerLink} to="/faq">
              Preguntas Frecuentes
            </Link>
          </li>
        </ul>
      </Box>

      <Box fontSize="1rem" textAlign="center" mb={2}>
        Redes Sociales: {' '}
        <LinkRef className={classes.linkMedia} href="https://www.facebook.com/rukos.tv" target="_blank">
          <FacebookIcon className={classes.linkIconMedia} /> facebook
        </LinkRef>
      </Box>

      <Box pb={2}>
        <Typography align="center">
          © {(new Date).getFullYear()} por Rukos.tv
        </Typography>
      </Box>
    </Box>
  )
}