import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Slider from "react-slick";
import { getCollections } from '../apis';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const CollectionCarousel = () => {
  const dispatch = useDispatch();
  const collections = useSelector(s => s.page.collections);
  const classes = useStyles();

  React.useEffect(() => {
    if(collections.length === 0) dispatch(getCollections());
  }, [collections])

  const renderElement = (item, index) => {
    return (
      <Box pl={0.5} pr={0.5} key={`collection_${index}`}>
        <Box
          component={Link}
          to={`/collection/${item.slug}`}
          className={classes.item}
        >
          <img alt={item.name} src={item.image}/>
        </Box>
      </Box>
    )
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    responsive: [
      {breakpoint: 1024, settings: {slidesToShow: 8}},
      {breakpoint: 760, settings: {slidesToShow: 6}},
      {breakpoint: 540, settings: {slidesToShow: 4}},
    ],
    prevArrow: <ChevronLeftIcon className={classes.arrow} />,
    nextArrow: <ChevronRightIcon className={classes.arrow} />,
  };

  return (
    <Box p={3} pt={1}>
      {collections.length > 0 && (
        <Slider {...settings} className={classes.slider}>
          {collections.map(renderElement)}
        </Slider>
      )}
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  item: {
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    '& img': {
      maxWidth: '100%',
    }
  },
  slider: {
    '& .slick-arrow': {
      color: 'white',
    }
  }
}));