import React from 'react';
import { useHistory } from 'react-router-dom';
import { InputBase, Box, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Dialog } from '../../components';
import clsx from  'clsx';

export const SearchBox = (props) => {
  const classes = useStyles();
  const [showDialog, setShowDialog] = React.useState(false);
  const [query, setQuery] = React.useState('')
  const history = useHistory();

  const goSearch = () => {
    if(query.length >= 2){
      history.push(`/search?q=${query}`);
      if(showDialog) setShowDialog(false);
    }
  }

  const onKeyPress = e => (e.charCode === 13) && goSearch();

  const renderDialog = () => {
    return(
      <Dialog
        title="Buscar"
        open={showDialog}
        handleClose={() => setShowDialog(false)}
      >
        <Box mb={2}>
        <Box position="relative">
          <InputBase
            className={classes.input}
            placeholder="Buscar"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={onKeyPress}
          />
          <SearchIcon className={classes.icon} onClick={() => goSearch()} />
        </Box>
        </Box>
      </Dialog>
    )
  }

  return (
    <Box className={classes.root}>
      <Box position="relative">
        <Hidden xsDown>
          <InputBase
            className={classes.input}
            placeholder="Buscar"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={onKeyPress}
          />
          <SearchIcon className={classes.icon} onClick={() => goSearch()} />
        </Hidden>
        <Hidden smUp>
          {renderDialog()}
          <SearchIcon
            className={clsx(classes.icon, classes.iconSM)}
            onClick={() => setShowDialog(true)}
          />
        </Hidden>
      </Box>
    </Box>
  )
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    width: '100%',
  },
  input: {
    flex: 1,
    border: '1px solid gray',
    width: '100%',
    '& input': {
      color: 'white',
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      height: theme.spacing(3),
    }
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'gray',
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
  },
  iconSM: {
    position: 'inherit !important',
    float: 'right !important',
  }
}));