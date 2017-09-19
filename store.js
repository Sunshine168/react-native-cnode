import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import createSagaMiddlewar from 'redux-saga';
import './src/config/reactoron';
import { rootReducer } from './src/reducers';
const HANDLE = {
  TRON_ENABLED:true,
}
const tronEnabled = HANDLE ? HANDLE.TRON_ENABLED:process.env.TRON_ENABLED;
const getMiddleware = () => {
  const middlewares = [reduxThunk];

  if (__DEV__) {
    if (process.env.LOGGER_ENABLED) {
      middlewares.push(createLogger());
    }
  }

  return applyMiddleware(...middlewares);
};
const getEnhancers = () => {
  const enhancers = [];

  // enhancers.push(autoRehydrate());

  return enhancers;
};

let store;

if (__DEV__ && tronEnabled) {
  store = Reactotron.createStore(
    rootReducer,
    compose(getMiddleware(), ...getEnhancers())
  );
} else {
  store = createStore(rootReducer, compose(getMiddleware(), ...getEnhancers()));
}

export const configureStore = store;
