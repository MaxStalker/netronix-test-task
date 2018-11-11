import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers';
import EventSourceConnection from './sse';
import { watcherSaga } from './redux/sagas/index';
import { NEW_SERVER_DATA } from 'redux/reducers/sensors/actions';

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const sagaMiddleware = createSagaMiddleware();
const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  ...enhancers,
);

// mount it on the Store
const store = createStore(rootReducer, initialState, composedEnhancers);

// then run the saga
sagaMiddleware.run(watcherSaga);

//const store = createStore(rootReducer, initialState, composedEnhancers);
const processor = event => {
  const { dispatch } = store;
  const { data } = event;
  const payload = JSON.parse(data);
  dispatch({
    type: NEW_SERVER_DATA,
    payload,
  });
};
new EventSourceConnection('https://jsdemo.envdev.io/sse', processor);

export default store;
