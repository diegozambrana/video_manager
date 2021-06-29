import React from 'react';
import { Box, Button, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";


export const LinkShare = ({value, title, description, image}) => {
  const classes = useStyles();
  const [copied, setCopied] = React.useState(false)
  const settingsShare = {
    url: value,
    className: classes.network,

  }

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  }

  const onClick = (e) => e.target.select();

  return (
    <Box mt={2} mb={2}>
      <Box mt={2} fontWeight="fontWeightBold" >Compartir:</Box>
      <Box mt={1} mb={1}>
        <Box className={classes.social}>
          <FacebookShareButton
            quote={title}
            {...settingsShare}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </Box>
        <Box className={classes.social}>
          <FacebookMessengerShareButton
            appId="269939871512605"
            {...settingsShare}
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </Box>
        <Box className={classes.social}>
          <TwitterShareButton
            title={title}
            {...settingsShare}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Box>
        <Box className={classes.social}>
          <WhatsappShareButton
            title={title}
            separator=":: "
            {...settingsShare}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Box>
        <Box className={classes.social}>
          <TelegramShareButton
            title={title}
            {...settingsShare}
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </Box>
        <Box className={classes.social}>
          <RedditShareButton
            title={title}
            windowWidth={660}
            windowHeight={460}
            {...settingsShare}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </Box>
      </Box>
      <Box className={classes.root} mb={1}>
        <InputBase
          className={classes.input}
          value={value}
          onClick={onClick}
        />
        <Button
          onClick={copy}
          className={classes.button}
          variant="contained"
          color="primary"
        >Copiar</Button>
      </Box>
      {copied && <Box className={classes.label}>Copiado!</Box>}
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  input: {
    flex: 1,
    border: `1px solid ${theme.palette.primary.main}`,
    width: `calc(100% - 90px)`,
    maxWidth: 300,
    verticalAlign: 'top',
    borderBottomLeftRadius: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(1),
    borderRight: 'none',
    '& input': {
      color: 'white',
      padding: `${theme.spacing(0.6125)}px ${theme.spacing(1)}px`,
      height: theme.spacing(3),
      verticalAlign: 'top',
    }
  },
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    verticalAlign: 'top',
    color: 'white',
  },
  label: {
    color: theme.palette.primary.main
  },
  social: {
    display: 'inline-block',
    marginRight: theme.spacing(1)
  },
}));