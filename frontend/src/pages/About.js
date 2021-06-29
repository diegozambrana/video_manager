import React from 'react';
import {Box, Typography} from '@material-ui/core';

export const About = (props) => {
  return (
    <Box>
      <Box textAlign="center">
        <img src="https://django-mrtrvideos.s3.us-east-2.amazonaws.com/logo.png" alt="Rukos.tv" width="100%" style={{maxWidth: 250}}/>
      </Box>
      <Box mt={3}>
        <Typography variant="h4">Quienes Somos?</Typography>
      </Box>
      <Box mt={2}>
        Rukos.tv es una plataforma gratuita de series y peliculas para Jovenes y adultos, en su mayoria Series animadas y de studios independientes.
      </Box>
    </Box>
  )
}