import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

import reducers from '../reducers';

const middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default createStore(reducers, applyMiddleware(...middleware));

