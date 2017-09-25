/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
// process.env.TRON_ENABLED = true;
if (__DEV__ && process.env.TRON_ENABLED) {
  Reactotron
  .configure()
  .use(sagaPlugin())
  .useReactNative()
  .use(reactotronRedux())
  .connect();
}
