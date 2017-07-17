import fs from 'fs';
import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import routes from '../route/';
import { applyMiddleware, createStore } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

// import promiseMiddleware from '../common/middlewares/PromiseMiddleware';
import rootReducer from '../reducers/index';
import fetchComponentData from '../common/utils/fetchComponentData';


const finalCreateStore = applyMiddleware(ReduxPromise)( createStore );

const app = express();
const PORT = 3000;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.config');
const compiler = webpack(config);

app.route(webpackDevMiddleware(compiler), { noInfo: true, publicPath: config.output.publicPath });
// app.use(app.router);
// routes.initialize(app);
app.route(webpackHotHotMiddleware(compiler));

//server rendering

app.use( (req, res, next) => {
  const store = finalCreateStore(rootReducer);

  //react-router
  match( {routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if(error) {
      console.info('============ ', req.url);
      return res.status(500).send(error.message);
    }

    if(redirectLocation) {
      return res.redirect(302, redirectLocation.pathName + redirectLocation.search);
    }

    if(!renderProps) {
      return res.status(404).send( 'Not found' );
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
    .then( () => {
      const initView = renderToString((
        <Provider store = {store}>
          <RouterContext {...renderProps} />
        </Provider>
      ));

      let state = JSON.stringify(store.getState);
      let page = renderFullPage(initView, state);

      return page;

    }).then(page => res.status(200).send(page))
    .catch(err => res.end(err.message));

  });

});

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="utf-8">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">
        <title>Isomorphic React Redux</title>
        <link rel="stylesheet" href="/src/assets/css/style.css">
      </head>
      <body>
        <div id="root"><div>${html}</div></div>
        <script>window.$REDUX_STATE = ${initialState}</script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}

//Handling 404
app.get('*', (req, res) => {
  es.status(404).send('Server.js > 404 - Page Not Found');
});

//Global Error
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtxception', evt => {
  console.error('uncaughtException: ', evt );
});

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
