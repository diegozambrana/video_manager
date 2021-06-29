import React from 'react';
import {withList} from '../HOC';
import {BaseList} from './BaseList';

const MoviesContain = (props) => {
    return (
        <BaseList {...props}/>
    )
}

export const Movies = withList(MoviesContain, {type: 'movie'});