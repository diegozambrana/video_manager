import React from 'react';
import is from 'is_js';
import Pagination from '@material-ui/lab/Pagination';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getShows, getCollection } from '../apis'; // TODO check if will contain getMovies
import { Loading, Item } from '../components';


export const Collection = (props) => {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const collection = useSelector(s => s.page.collection)
  const classes = useStyles();
  const [total, setTotal] = React.useState(0);
  const [type, setType] = React.useState("show"); // TODO: check if will contain movies
  const [currentList, setCurrentList] = React.useState([]);
  const [params, setParams] = React.useState({collection: slug, page: 1})

  const updateValues = (response) => {
    setCurrentList(response.data.results);
    setTotal(response.data.count);
  }

  const onChangePage = (_, page) => setParams({...params, page: page})

  React.useEffect(() => {
    dispatch(getCollection(slug))
  }, [slug])
  
  React.useEffect(() => {
    // TODO: check if will contain movies
    if(type === 'show') getShows(params).then(updateValues);
  }, [params, type])

  const render_item = (item, index) => {
    // TODO: check if will contain movies
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

  return ( is.not.empty(collection) ?
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <img
              className={classes.logo}
              alt={collection.name}
              src={collection.image}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h3">{collection.name}</Typography>
            <Box>{collection.description}</Box>
          </Grid>
        </Grid>
      </Box>

      {total > 12 && (
        <Box mb={2} pb={3} pt={2} position="relative">
          <Box position="absolute" style={{top: 0, right: 0}}>
            <Pagination
              className={classes.pagination}
              count={Math.ceil(total/12)}
              onChange={onChangePage}
              size="small"
              page={params.page}
              siblingCount={0}
              boundaryCount={1}
            />
          </Box>
        </Box>
      )}

      <Box>
        <Grid container spacing={2}>
          {currentList.map(render_item)}
        </Grid>
      </Box>
    </>
    : <Loading />
  );
}

const useStyles = makeStyles(theme => ({
  logo: {
    width: '100%',
    borderRadius: theme.spacing(1),
  },
  pagination: {
    '& .MuiPaginationItem-page': {color: 'white'},
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));