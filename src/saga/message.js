import { put, select, call, fork, race, take } from 'redux-saga/effects';
import { LOGIN_IN } from '../actions/user.type';
import { GET_MESSAGES } from '../actions/message.type';
import { fetchMessages } from '../api/index';
const getMessages = function* (params){
  try{ 
       console.log("enter")
    //    const user = yield take(LOGIN_IN.SUCCESS)
      //
      const accesstoken = yield select(state=>state.user.accesstoken);
      yield put({
        type:GET_MESSAGES.PENDING   
      })
     const result =  yield call(fetchMessages,accesstoken);
     //data process
     let process_has_read_messages = result.has_read_messages.map((item)=>{
        return {
            key:item.id,
            ...item,
        }
     })
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


export const watchRequestMessages = function* (){
    while(true){
            yield take(GET_MESSAGES.REQUEST)
            yield fork(getMessages);
        }
} 
