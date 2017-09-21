import { put, select, call, fork, race, take } from 'redux-saga/effects';
import { LOGIN_IN } from '../actions/user.type';
import { GET_MESSAGES } from '../actions/message.type';
import { fetchMessages } from '../api/index';
export const getMessages = function* (params){
  try{
      const user = yield take(LOGIN_IN.SUCCESS)
      //
      const accesstoken = yield select(state=>state.user.accesstoken);
      yield put({
        type:GET_MESSAGES.PENDING   
      })
     const result =  yield call(fetchMessages,accesstoken);
     yield put({
         type:GET_MESSAGES.SUCCESS,
         payload:result,
     })     
  }catch(e){
       yield put({
           type: GET_MESSAGES.ERROR,
           error:e,
       })
  }    
}
