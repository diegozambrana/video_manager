import React from 'react';
import { Box } from '@material-ui/core';

export const Container = (props) => {
  return (
    <Box p={1} style={{maxWidth: 1280, margin: '8px auto 8px', borderBottom: '1px solid rgba(255,255,255,0.3)'}}>
      {props.children}
    </Box>
  )
}