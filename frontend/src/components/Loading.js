import React from 'react';
import {Box, CircularProgress} from '@material-ui/core';

export const Loading = (props) => {
    return (
        <Box style={{margin: '24px auto', textAlign: 'center'}}>
            <CircularProgress />
        </Box>
    )
}
