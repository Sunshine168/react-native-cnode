import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate,persistStore } from 'redux-persist';
import Reactotron from 'reactotron-react-native'; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import './src/config/reactotron';
import { rootReducer } from './src/reducers';
import rootSaga from './src/saga/index'
import { AsyncStorage } from 'react-native';
let sagaMiddleware;
if(process.env.TRON_ENABLED){
  sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({sagaMonitor});
}else{
  sagaMiddleware = createSagaMiddleware();
}

const getMiddleware = () => {
  const middlewares = [sagaMiddleware];

  if (__DEV__) {
    if (process.env.LOGGER_ENABLED) {
      middlewares.push(createLogger());
    }
  }
 

  return applyMiddleware(...middlewares);
};
const getEnhancers = () => {
  const enhancers = [];

  enhancers.push(autoRehydrate());

  return enhancers;
};

let store;

if (__DEV__ && process.env.TRON_ENABLED) {

  store = Reactotron.createStore(
    rootReducer,
    compose(getMiddleware(), ...getEnhancers())
  );
} else {
  store = createStore(rootReducer, compose(getMiddleware(), ...getEnhancers()));
}
store.runSaga = sagaMiddleware.run;
export const configureStore = store;
