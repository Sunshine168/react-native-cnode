import { watchRequestTopics, watchRequestTopic } from './topic';
import { fork, takeEvery, all } from 'redux-saga/effects';
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

   ])
}

export default rootSaga;
