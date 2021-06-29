import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const FAQ = (props) => {
  return (
    <Box>
      <Box>
        <Typography variant="h2" component="h2">Preguntas Frecuentes</Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h4" component="h4">¿Como ver los videos?</Typography>
      </Box>
      <Box>
        <ul>
          <li>Puede navegar y seleccionar la Peliculas o Serie de su interes.</li>
          <li>
            Los videos estan alojadon en distintos servidores. En caso de que el 
            servicor actual este fallando puede seleccionar otro servidor haciendo
            click en uno de los botones debajo del reproductor de video
            (opcion 1, opcion 2, etc).</li>
        </ul>
      </Box>
      <Box mt={3}>
        <Typography variant="h4" component="h4">¿Como reportar un error o videos caídos?</Typography>
      </Box>
      <Box>
        Si un video esta caido o exista algún error en la página nos ayudaria mucho
        reportar el video o la falla encontrada. Para eso debe dirigirse al pie de página
        y debe hacer click en el enlace "Reportar videos caidos", este abrirá un modal
        en el cual se debe describir el error o el video caido.
      </Box>
      <Box mt={3}>
        <Typography variant="h4" component="h4">¿Como recomendar una serie o película?</Typography>
      </Box>
      <Box>
        Si quieres recomendar una serie o pelicula solo debes dirigirte al pie de
        página y detallar la serie o película que quieras recomendar, nosotros nos encargaremos
        de tenerla en la plataforma lo mas antes posible y notificarte cuando ya la tengamos.
      </Box>
    </Box>
  )
}