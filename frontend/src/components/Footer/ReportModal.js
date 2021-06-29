import React from 'react';
import { Box, Typography, TextField, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Dialog, TextArea } from '../index';
import { sendReport } from '../../apis'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    '& .MuiInput-underline::before': {borderBottomColor: 'rgba(255,255,255,0.45)'},
    '& input.MuiInputBase-input': {color: 'white'},
    '& .MuiInputLabel-formControl': {color: '#cccccc'}
  }
}))

export const ReportModal = (props) => {
  const {onCloseDialog, open} = props;
  const [suscess, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [link, setLink] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    if(open){
      setLink(window.location.pathname)
    }
  }, [open])

  const onSubmit = () => {
    if(suscess){
      onClose();
      return
    }
    const is_valid = fullName.length > 0 && mail.length > 0 && description.length > 0;
    if(!loading && is_valid){
      setLoading(true);
      const data = {
        "fullname": fullName,
        "email": mail,
        "link": link,
        "message": description
      }
      sendReport(data).then(response => {
        setSuccess(true);
        setLoading(false);
      }, error => {
        console.log(error)
      })
    }
  }

  const onClose = () => {
    if(suscess) {
      setTimeout(() => setSuccess(false), 300);
      setDescription('');
      setFullName('');
      setMail('');
      setLink('')
    }
    onCloseDialog()
  }

  return (
    <Dialog
      handleClose={onClose}
      open={open}
      title="Reportar Videos Caidos o Errores"
      onClickButton={onSubmit}
      buttonText={suscess ? 'Cerrar' : loading ? '...Enviando' : 'Enviar'}
    >
      {suscess && (
        <Box>
          <Typography align="center">
            <CheckCircleOutlineIcon style={{ color: colors.green[500], fontSize: 50 }}  />
          </Typography>
          <Typography align="center">
            Mensaje enviado correctamente.
          </Typography>
        </Box>
      )}
      {!suscess && <Box pl={3} pr={3}>
        <Box pb={3}>
          <Typography align="center">
          Aún estamos mejorando la plataforma, si existe un video o tuvieste algun error dejanos saberlo para arreglarlo lo más antes posible.
          </Typography>
        </Box>
        <Box mb={3}>
          <TextField
            required
            label="Nombre Completo"
            className={classes.input}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <TextField
            required
            type="email"
            label="Correo Electrónico"
            className={classes.input}
            value={mail}
            onChange={e => setMail(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <TextField
            required
            label="Path URL"
            className={classes.input}
            value={link}
            onChange={e => setLink(e.target.value)}
          />
        </Box>

        <TextArea placeholder='Detalle' name='description'
            value={description} onChange={e => setDescription(e.target.value)}/>
      </Box>}
    </Dialog>
  )
}