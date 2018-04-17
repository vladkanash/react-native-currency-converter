import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import reducers from '../reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleWare();
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default store;

