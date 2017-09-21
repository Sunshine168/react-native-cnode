import { accessToken, fetchUserInfoDetail } from '../api/';
import { put, select, call, fork, race, take } from 'redux-saga/effects';
import { LOGIN_IN, LOGIN_OUT, GET_PERSONAL_USERINFO } from '../actions/user.type';

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

const getPersoanlUserInfoDetail = function* (){
   try {
     yield put({
       type:GET_PERSONAL_USERINFO.PENDING,
     })
     const { userInfo  } = yield select(state => state.user);
     const data = yield call(fetchUserInfoDetail,userInfo.loginname);
     yield put({
       type:GET_PERSONAL_USERINFO.SUCCESS,
       payload:data,
     })
   } catch (error) {
      yield put({
        type:GET_PERSONAL_USERINFO.ERROR,
        error
      })
   }
}

export const watchAuth = function* (){
  while(true){
    const result = yield take(LOGIN_IN.REQUEST);
     yield race([
       take(LOGIN_OUT.SUCCESS),call(loginIn,result.accesstoken)
     ])
  }
}

export const watchGetPersonalDetail = function* (){
  while(true){
      yield take(GET_PERSONAL_USERINFO.REQUEST);
      yield fork(getPersoanlUserInfoDetail)
  }
}