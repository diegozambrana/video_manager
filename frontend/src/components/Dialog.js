import React from 'react';
import {
  Box,
  Dialog as BaseDialog,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from './Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialog: {},
  title: {color: 'white', textAlign: 'center'},
  content: {color: 'white'}
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const Dialog = (props) => {
  const {title, children, onClickButton, open, handleClose, buttonText} = props;
  const classes = useStyles();

  return (
    <BaseDialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className={classes.title} onClose={handleClose}>{title}</DialogTitle>
      <DialogContent className={classes.content}>
        {children}
      </DialogContent>
      {onClickButton && <DialogActions>
        <Box display="flex" justifyContent="center" width="100%" mb={3}>
            <Button onClickOrigin={onClickButton} label={buttonText || 'Enviar'} />
        </Box>
      </DialogActions>}
    </BaseDialog>
  )
}