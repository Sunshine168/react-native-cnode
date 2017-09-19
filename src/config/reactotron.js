/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const HANDLE = {
  TRON_ENABLED:true,
}
const tronEnabled = HANDLE ? HANDLE.TRON_ENABLED:process.env.TRON_ENABLED;
if (__DEV__ && tronEnabled) {
  Reactotron
  .configure()
  .use(sagaPlugin())
  .useReactNative()
  .use(reactotronRedux())
  .connect();
}
