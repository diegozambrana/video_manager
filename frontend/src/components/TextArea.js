import React from 'react';
import {TextField, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textArea: {
    borderRadius: 0,
    border: 'none',
    outline: 'none',
    color: 'white',
    '& div': {outline: 'none', padding: 10},
    '& textarea': {
      textFillColor: `white !important`,
    },
    '& fieldset': {
      border: `1px solid white !important`,
      borderRadius: 0,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.palette.primary.main} !important`,
    },
  },
}));

export const TextArea = ({rowsMax=5, rows=5, ...props}) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      className={classes.textArea}
      multiline
      fullWidth
      rowsMax={rowsMax}
      rows={rows}
      {...props}
    />
  )
}