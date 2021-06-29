import React from 'react';
import Slider from "react-slick";
import { Box, Grid, Typography } from '@material-ui/core';
import { getSlider } from '../apis';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderCustom = ({mode}) => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector(s => s.page[`${mode}Slider`]);


  React.useEffect(() => {
    if(!loading && items.length === 0){
      setLoading(true)
      dispatch(getSlider(mode))
    }
  }, [mode]);

  React.useEffect(() => setLoading(false) , [items])

  const renderElement = (item, index) => {
    return (
      <Box key={`slider_item_${index}`} className={classes.item}>
        <Grid container>
          <Grid item sm={6}>
            <Box
              className={classes.itemImg}
              style={{backgroundImage: `url("${item.image}")`}}
            />
          </Grid>
          <Grid item sm={6} className={classes.itemDescription}>
            <Box p={2}>
              <Box pb={2}>
                <Typography className={classes.text} variant="h5">{item.name}</Typography>
              </Box>
              <Typography variant='body1'>
                { item.information.length > 150
                  ? item.information.slice(0, 150) + '...'
                  : item.information
                }
              </Typography>
              {item.button_text_action && item.type_slider_action === 'R' && (
                <Box mt={2}>
                  <LinkButton label={item.button_text_action}  to={item.url_action}/>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    dots: false,
  };

  return (
    <Box mb={3}>
      {items.length > 0 && (
        <Slider {...settings}>
          {items.map(renderElement)}
        </Slider>
      )}
    </Box>
  );
}

const useStyles = makeStyles(theme => ({
  item: {
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
    }
  },
  itemImg: {
    width: '100%',
    height: 300,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('xs')]: {
      height: 250,
      minHeight: `250px !important`,
      minWidth: `calc(100vw - 32px)`,
    },
  },
  itemDescription: {
    backgroundColor: 'black',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      top: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: 250,
    },
  },
  text: {color: 'white', fontWeight: 'bold'},
}));