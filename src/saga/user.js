import { accessToken } from '../api/';
import { put, select, call, fork, race } from 'redux-saga/effects';
import { LOGIN_IN, LOGIN_OUT } from '../actions/user.type';

const loginIn = function* (accesstoken){
  try{
    yield put({
      type: LOGIN_IN.PENDING
    })
    const data = yield call(accessToken,accesstoken);
    if(data.success){
      yield put({
        type: LOGIN_IN.SUCCESS,
        payload:data,
      })
    }else{
      yield put({
        type: LOGIN_IN.ERROR,
        error: "token 有误"
      })
    }
  }catch(e){
    yield put({
      type: LOGIN_IN.ERROR,
      error: e
    })
  }
}

export const watchAuth = function* (){
  while(true){
    const result = yield take(LOGIN_IN.REQUEST);
     yield race([
       take(LOGIN_OUT.SUCCESS),call(loginIn,result.accesstoken);
     ])
  }
}
