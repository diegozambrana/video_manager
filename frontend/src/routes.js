import React from 'react';
import {Switch, Route, Redirect } from "react-router-dom";
import {
  MainPage,
  ShowDetail,
  EpisodeDetail,
  FAQ,
  About,
  Shows,
  Movies,
  Shorts,
  MovieDetail,
  Search,
  Collection,
} from './pages';

export default () => {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/shows" component={Shows} />
        <Route exact path="/show/:slug" component={ShowDetail} />
        <Route exact path="/show/:slug/:episodeSlug" component={EpisodeDetail} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movie/:slug" component={MovieDetail} />
        <Route exact path="/shorts" component={Shorts} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/acerca" component={About} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/collection/:slug" component={Collection} />
      </Switch>
    )
  }