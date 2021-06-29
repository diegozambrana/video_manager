import React from 'react';
import {withList} from '../HOC';
import {BaseList} from './BaseList';

const ShowsContain = (props) => {
    return (
        <BaseList {...props}/>
    )
}

export const Shows = withList(ShowsContain, {type: 'show'});