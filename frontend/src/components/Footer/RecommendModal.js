import React from 'react';
import { Box, Typography, TextField, colors } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Dialog, TextArea } from '../index';
import { sendRecommend } from '../../apis'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    '& .MuiInput-underline::before': {borderBottomColor: 'rgba(255,255,255,0.45)'},
    '& input.MuiInputBase-input': {color: 'white'},
    '& .MuiInputLabel-formControl': {color: '#cccccc'}
  }
}))

export const RecommendModal = (props) => {
  const {onCloseDialog, open} = props;
  const [suscess, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const classes = useStyles();

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
        "message": description
      }
      sendRecommend(data).then(response => {
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
    }
    onCloseDialog()
  }

  return (
    <Dialog
      handleClose={onClose}
      open={open}
      title="Recomendar Series o Películas"
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
            Tienes alguna serie o película que quieras recomendar?
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

        <TextArea placeholder='Detalle' name='description'
            value={description} onChange={e => setDescription(e.target.value)}/>
      </Box>}
    </Dialog>
  )
}