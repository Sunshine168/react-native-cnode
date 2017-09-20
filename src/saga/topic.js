import { fetchTopics, fetchTopicDetail } from '../api/index';
import { put, select, call, take, fork, takeLatest } from 'redux-saga/effects';
import { GET_HOME_TOPICS, GET_TOPIC_DETAIL } from '../actions/topic.type'
export const getTopics =  function* (params){
   try{
     const page = yield select(state=>state.topic.page)
     yield put({
       type:GET_HOME_TOPICS.PENDING
     })
     const processParams = {
       ...params,
       page,
     };
     const data = yield call(fetchTopics,processParams);
     if(data.success != 1){
       yield put({
         type: GET_HOME_TOPICS.ERROR,
         error:"数据源错误"
       })
     }else{
       let processData = data.data.map((item)=>{
         return {
           ...item,
           key:item.id
         }
       })
       yield put({
         type: GET_HOME_TOPICS.SUCCESS,
         payload: processData
       })
     }
   }catch(e){
     yield put({
       type: GET_HOME_TOPICS.ERROR,
       error:"内部错误"
     })
   }
}

export const getTopicDetail = function* (){
  try{
    yield put({
      type:GET_TOPIC_DETAIL.PENDING
    });
    const { currentTopicDetailId, isPendingTopics } = yield select(state=>state.topic);
    const data = yield call(fetchTopicDetail,currentTopicDetailId);
    if(data.success == 1){
       yield put({
         type: GET_TOPIC_DETAIL.SUCCESS,
         payload:data.data,
       })
    }else{
      yield put({
        type: GET_TOPIC_DETAIL.ERROR,
        error:"数据源错误"
      })
    }
  }
  catch(e){
    yield put({
      type: GET_TOPIC_DETAIL.ERROR,
      error:e
    })
  }
}

export const watchRequestTopics = function* (){
  while(true){
     const result = yield take(GET_HOME_TOPICS.REQUEST);
     console.log("debug")
     yield fork(getTopics,result)
  }

}

/*
  尝试使用takeEvery的写法
  其实没有很大必要,在state中保存当前浏览的 currentTopicDetailId
  感觉最好还是使用上面的写法
 */
export const watchRequestTopic = function* (){
  //  yield* takeEvery(GET_TOPIC_DETAIL.REQUEST,getTopicDetail);
  while(true){
    const result = yield take(GET_TOPIC_DETAIL.REQUEST)
    yield fork(getTopicDetail,result.id)
  }
}
