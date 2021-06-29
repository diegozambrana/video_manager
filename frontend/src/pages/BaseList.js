import React from 'react';
import { Loading, Item, SliderCustom as Slider } from '../components';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { paramsToObject } from '../utils';

const useStyles = makeStyles((theme) => ({
  pagination: {
    '& .MuiPaginationItem-page': {color: 'white'},
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

export const BaseList = ({
    list,
    title,
    type,
    totalElements,
    page,
    loadingList,
    isGenre,
    genre,
    ...props
  }) => {
  const classes = useStyles();
  const history = useHistory();

  const onChangePage = (event, page) => {
    const urlParams = new URLSearchParams(history.location.search);
    const entries = urlParams.entries();
    const params = paramsToObject(entries);
    params.page = page;
    history.push(`${history.location.pathname}?${new URLSearchParams(params).toString()}`);
  }

  const render_item = (item, index) => {
    return (
      <Grid item key={`index_${type}_${index}`}
        xs={ type === "show" ? 12 : 6}
        sm={ type === "show" ? 6 : 4}
        md={ type === "show" ? 4 : 3}
      >
        <Item item={item} type={type} />
      </Grid>
    )
  }

  return (
    <Box>
      {!isGenre && <Slider mode={type}/>}
      {isGenre && genre &&(
        <Box mb={2}>
          <Typography variant="h4" style={{fontWeight: 'bold !important'}}>
            Genero:{' '}
            <Typography component="span" variant="h4" color="primary">
              {genre.name}
            </Typography>
          </Typography>
        </Box>
      )}

      <Box mb={2} position="relative">
        <Typography variant="h5">{title}</Typography>
        {totalElements > 12 && (
          <Box position="absolute" style={{top: 0, right: 0}}>
            <Pagination
              className={classes.pagination}
              count={Math.ceil(totalElements/12)}
              onChange={onChangePage}
              size="small"
              page={page}
              siblingCount={0}
              boundaryCount={1}
            />
          </Box>
        )}
      </Box>

      {loadingList ?
        <Loading /> :
        <Grid container spacing={2}>
          {list.map(render_item)}
        </Grid>
      }

    </Box>
  )
}