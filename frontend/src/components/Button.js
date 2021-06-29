import {Button as ButtonBase} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {ENABLED_ADS} from '../config';

export const Button = (props) => {
    const {label, onClickOrigin, disabled, size, icon} = props;
    return (
        <ButtonBase
            variant="contained"
            color="primary"
            style={{color: 'white'}}
            onClick={onClickOrigin}
            disabled={disabled}
            size={size}
            startIcon={icon}
        >{label}</ButtonBase>
    )
}

export const LinkButton = (props) => {
    const {label, to, disabled, size, icon, adsLink} = props;
    return ( ENABLED_ADS && adsLink ? (
      <ButtonBase
        variant="contained"
        onClick={() => window.location.replace(adsLink)}
        color="primary"
        style={{color: 'white'}}
        disabled={disabled}
        size={size}
        startIcon={icon}
      >{label}</ButtonBase>
    ) : (
      <ButtonBase
        variant="contained"
        component={Link}
        to={to}
        color="primary"
        style={{color: 'white'}}
        disabled={disabled}
        size={size}
        startIcon={icon}
      >{label}</ButtonBase>
    )
  )
}