import { watchRequestTopics, watchRequestTopic,  postTopicWatcher } from './topic';
import { fork, takeEvery, all } from 'redux-saga/effects';
import { watchAuth, watchGetPersonalDetail } from './user';
import { watchRequestMessages } from './message';


function* watchAndLog(getState) {
  yield* takeEvery('*', function* logger(action) {
    console.log('action', action)
    console.log('state after', getState())
  })
}
const rootSaga = function* rootSaga(){
   yield all([
     fork(watchRequestTopic),
     fork(watchAndLog),
     fork(watchRequestTopics),
     fork(watchAuth),
     fork(watchRequestMessages),
     fork(watchGetPersonalDetail),
     fork(postTopicWatcher)
   ])
}

export default rootSaga;
